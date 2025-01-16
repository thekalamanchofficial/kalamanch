import { useState, useCallback, useEffect } from "react";
import {
  useFeedContext,
} from "~/app/(with-sidebar)/myfeed/context/FeedContext";
import { type CommentPayload, type Comment } from "~/app/(with-sidebar)/myfeed/types/types";

type UseCommentsProps = {
  initialComments: Comment[];
  postId: string;
  userEmail?: string;
  userName?: string;
  userProfileImageUrl?: string;
};

export function useComments({
  initialComments,
  postId,
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
    processedComments,
    setProcessedComments,
  } = useFeedContext();

  const createTempComment = useCallback(
    (content: string, parentId: string | undefined): Comment => ({
      id: `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      postId,
      userId: userEmail!,
      userName: userName ?? userEmail!,
      parentId: parentId ? parentId : null,
      userProfileImageUrl: userProfileImageUrl ?? "",
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      replies: [],
    }),
    [userEmail, userName, userProfileImageUrl, postId],
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
          ? currentComments.filter(
              (comment) => comment.id !== newComment.tempId,
            )
          : ([...currentComments, newComment] as Comment[]);
      }

      return currentComments.map((comment) => {
        if (comment.id === parentId) {
          const updatedReplies = isRollback
            ? (comment.replies ?? []).filter(
                (reply) => reply.id !== newComment.tempId,
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

  const replaceTemporaryComment = useCallback(
    (
      currentComments: Comment[],
      tempId: string,
      parentId: string | null,
      serverComment: Comment,
    ): Comment[] => {
      if (!parentId) {
        return currentComments.map((comment) =>
          comment.id === tempId ? serverComment : comment,
        );
      }

      return currentComments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies:
              comment.replies?.map((reply) =>
                reply.id === tempId ? serverComment : reply,
              ) ?? [],
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
        tempId: tempComment.id,
        postId,
        content,
        parentId: parentId ?? null,
        userEmail,
        userName: userName ?? userEmail,
        userProfileImageUrl: userProfileImageUrl ?? "",
      });
    },
    [
      postId,
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
      if (failedComment.postId !== postId) {
        return;
      }
      const parentId = failedComment.parentId ?? null;
      setComments((currentComments) =>
        updateCommentsTree(
          currentComments,
          parentId,
          failedComment,
          true,
        ),
      );
    });

    // Todo: only remove failed comment from batch
    if (failedComments.length > 0) {
      setFailedComments((prev) =>
        prev.filter((comment) => comment.postId !== postId),
      );
    }
  }, [failedComments, comments, updateCommentsTree, setFailedComments, postId]);

  useEffect(() => {
    const processedIdMapings: string[] = [];
    processedComments.comments.forEach((comment) => {
      if (comment.postId !== postId) {
        return;
      }

      const parentId = comment.parentId ?? null;
      const idMappings = processedComments.idMappings.find(
        (idMapping) => idMapping.realId === comment.id,
      );
      if (!idMappings) {
        return;
      }
      processedIdMapings.push(idMappings.realId);
      setComments((currentComments) =>
        replaceTemporaryComment(
          currentComments,
          idMappings.tempId,
          parentId,
          comment,
        ),
      );
    });

    if (processedComments.comments.length > 0) {
      setProcessedComments((prev) => {
        return {
          ...prev,
          comments: prev.comments.filter(
            (comment) => !processedIdMapings.includes(comment.id),
          ),
          idMappings: prev.idMappings.filter(
            (idMapping) => !processedIdMapings.includes(idMapping.realId),
          ),
        };
      });
    }
  }, [
    processedComments,
    comments,
    replaceTemporaryComment,
    setProcessedComments,
    postId,
  ]);

  return {
    comments,
    handleAddComment,
    isPending: bulkCommentsState.some((comment) => comment.postId === postId),
    pendingCount: bulkCommentsState.filter((comment) => comment.postId === postId)
      .length,
  };
}
