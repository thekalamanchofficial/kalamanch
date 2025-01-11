import { useState, useCallback, useEffect } from 'react';
import { trpc } from '~/server/client';
import { type Comment } from '~/app/(with-sidebar)/myfeed/types/types';

interface UseCommentsProps {
  initialComments: Comment[];
  postId: string;
  userEmail?: string;
  userName?: string;
  userProfileImageUrl?: string;
}

interface OptimisticUpdate {
  tempId: string;
  parentId: string | null;
}

export function useComments({ 
  initialComments, 
  postId, 
  userEmail,
  userName,
  userProfileImageUrl
}: UseCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [pendingUpdates, setPendingUpdates] = useState<OptimisticUpdate[]>([]);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const commentMutation = trpc.comments.addComment.useMutation();

  const createTempComment = useCallback((
    content: string, 
    parentId: string | undefined
  ): Comment => ({
    id: `temp-${new Date().getTime()}-${Math.random().toString(36).slice(2)}`,
    postId,
    userId: userEmail!,
    userName: userName ?? userEmail!,
    userProfileImageUrl: userProfileImageUrl ?? "",
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    parentId: parentId ?? null,
    replies: [],
  }), [userEmail, userName, userProfileImageUrl, postId]);

  const updateCommentsTree = useCallback((
    comments: Comment[], 
    parentId: string | null, 
    newComment: Comment, 
    isRollback = false
  ): Comment[] => {
    if (!parentId) {
      return isRollback 
        ? comments.filter(comment => comment.id !== newComment.id)
        : [...comments, newComment];
    }

    return comments.map(comment => {
      if (comment.id === parentId) {
        const updatedReplies = isRollback
          ? (comment.replies ?? []).filter(reply => reply.id !== newComment.id)
          : [...(comment.replies ?? []), newComment];
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      return comment;
    });
  }, []);

  const replaceTemporaryComment = useCallback((
    comments: Comment[],
    tempId: string,
    parentId: string | null,
    serverComment: Comment
  ): Comment[] => {
    if (!parentId) {
      return comments.map(comment => 
        comment.id === tempId ? { ...comment, ...serverComment } : comment
      );
    }

    return comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies?.map(reply =>
            reply.id === tempId ? { ...reply, ...serverComment } : reply
          ) ?? []
        };
      }
      return comment;
    });
  }, []);

  const handleAddComment = useCallback(async (content: string, parentId?: string) => {
    if (!userEmail) {
      throw new Error('User must be logged in to comment');
    }

    const tempComment = createTempComment(content, parentId);
    const optimisticUpdate: OptimisticUpdate = {
      tempId: tempComment.id,
      parentId: parentId ?? null
    };

    // Optimistically update state
    setComments(prev => updateCommentsTree(prev, parentId ?? null, tempComment));
    setPendingUpdates(prev => [...prev, optimisticUpdate]);

    try {
      const response = await commentMutation.mutateAsync({
        postId,
        content,
        parentId,
        userEmail,
        userName: userName ?? userEmail,
        userProfileImageUrl: userProfileImageUrl ?? "",
      });

      // Update with server response
      setComments(prev => replaceTemporaryComment(
        prev,
        tempComment.id,
        parentId ?? null,
        response
      ));
      setPendingUpdates(prev => 
        prev.filter(update => update.tempId !== tempComment.id)
      );

    } catch (error) {
      // Rollback on error
      setComments(prev => updateCommentsTree(
        prev,
        parentId ?? null,
        tempComment,
        true
      ));
      setPendingUpdates(prev => 
        prev.filter(update => update.tempId !== tempComment.id)
      );

      console.error("Error adding comment:", error);
      throw error; // Re-throw to allow parent components to handle the error
    }
  }, [
    postId,
    userEmail,
    userName,
    userProfileImageUrl,
    commentMutation,
    updateCommentsTree,
    replaceTemporaryComment,
    createTempComment
  ]);

  return {
    comments,
    handleAddComment,
    isPending: pendingUpdates.length > 0,
    pendingCount: pendingUpdates.length
  };
}