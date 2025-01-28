import { useState, useCallback, useEffect } from "react";
import { useFeedContext } from "~/app/(with-sidebar)/myfeed/_context/FeedContext";
import {
  type CommentPayload,
  type Comment,
} from "~/app/(with-sidebar)/myfeed/types/types";
import { PostStatus } from "~/app/editor/types/types";
import ObjectId from "bson-objectid";

type UseCommentsProps = {
  initialComments: Comment[];
  postId?: string | null | undefined;
  iterationId?: string | null | undefined;
  postStatus: string;
  userEmail?: string;
  userName?: string;
  userProfileImageUrl?: string;
};

export function useComments({
  initialComments,
  postId,
  iterationId,
  postStatus,
  userEmail,
  userName,
  userProfileImageUrl,
}: UseCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const {
    addCommentToBatch,
    bulkCommentsState,
    failedComments,
    setFailedComments,
  } = useFeedContext();
  const isPending = postStatus == PostStatus.PUBLISHED.toString().toUpperCase()
    ? bulkCommentsState.some((comment) => comment.postId === postId)
    : bulkCommentsState.some((comment) => comment.iterationId === iterationId);

  const pendingCount = postStatus == PostStatus.PUBLISHED.toString().toUpperCase()
    ? bulkCommentsState.filter((comment) => comment.postId === postId).length
    : bulkCommentsState.filter((comment) => comment.iterationId === iterationId).length;

  const createTempComment = useCallback(
    (content: string, parentId: string | undefined): Comment => {
      return {
        id: new ObjectId().toHexString(),
        postId,
        iterationId,
        postStatus,
        userId: userEmail!,
        userName: userName ?? userEmail!,
        parentId: parentId ? parentId : null,
        userProfileImageUrl: userProfileImageUrl ?? "",
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        replies: [],
      };
    },
    [userEmail, userName, userProfileImageUrl, postId, iterationId, postStatus],
  );

  const updateCommentsTree = useCallback(
    (
      currentComments: Comment[],
      parentId: string | null,
      newComment: Comment | CommentPayload,
      isRollback = false,
    ): Comment[] => {
      if (!parentId) {
        return isRollback
          ? currentComments.filter((comment) => comment.id !== newComment.id)
          : ([...currentComments, newComment] as Comment[]);
      }

      return currentComments.map((comment) => {
        if (comment.id === parentId) {
          const updatedReplies = isRollback
            ? (comment.replies ?? []).filter(
                (reply) => reply.id !== newComment.id,
              )
            : ([...(comment.replies ?? []), newComment] as Comment[]);

          return {
            ...comment,
            replies: updatedReplies,
          };
        }
        return comment;
      });
    },
    [],
  );

  const handleAddComment = useCallback(
    async (content: string, parentId?: string) => {
      if (!userEmail) {
        throw new Error("User must be logged in to comment");
      }

      const tempComment = createTempComment(content, parentId);

      setComments((currentComments) =>
        updateCommentsTree(currentComments, parentId ?? null, tempComment),
      );

      addCommentToBatch({
        id: tempComment.id,
        postId,
        iterationId,
        postStatus,
        content,
        parentId: parentId ?? null,
        userEmail,
        userName: userName ?? userEmail,
        userProfileImageUrl: userProfileImageUrl ?? "",
      });
    },
    [
      postId,
      iterationId,
      postStatus,
      userEmail,
      userName,
      userProfileImageUrl,
      addCommentToBatch,
      updateCommentsTree,
      createTempComment,
    ],
  );

  useEffect(() => {
    failedComments.forEach((failedComment) => {
    
      if (postStatus == PostStatus.PUBLISHED.toString().toUpperCase() && failedComment.postId !== postId) {
        return;
      }
      if (postStatus == PostStatus.DRAFT.toString().toUpperCase() && failedComment.iterationId !== iterationId) {
        return;
      }
      const parentId = failedComment.parentId ?? null;
      setComments((currentComments) =>
        updateCommentsTree(currentComments, parentId, failedComment, true),
      );
    });

    if (failedComments.length > 0) {
      if(postStatus == PostStatus.PUBLISHED.toString().toUpperCase()){
        setFailedComments((prev) =>
          prev.filter((comment) => comment.postId !== postId),
        );
      }
      if(postStatus == PostStatus.DRAFT.toString().toUpperCase()){
        setFailedComments((prev) =>
          prev.filter((comment) => comment.iterationId !== iterationId),
        );
      }
    }
    
  }, [failedComments, comments, updateCommentsTree, setFailedComments, postId, iterationId, postStatus]);

  return {
    comments,
    handleAddComment,
    isPending,
    pendingCount,
  };
}
