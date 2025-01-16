"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { trpc } from "~/server/client";
import { useDebounce } from "~/hooks/useDebounce";
import { useClerk } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { BULK_LIKE_DEBOUNCE_DELAY } from "../_config/config";
import type { Comment, CommentPayload } from "../types/types";

type LikePayload = Record<string, { liked: boolean }>;

type ProcessedComments = {
  comments: Comment[];
  idMappings: { tempId: string; realId: string }[];
};

type FeedContextValue = {
  addLikeToBatch: (payload: LikePayload) => void;
  addCommentToBatch: (payload: CommentPayload) => void;
  bulkLikeState: LikePayload | null;
  rolledBackLikes: Record<string, boolean>;
  setRolledBackLikes: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  bulkCommentsState: CommentPayload[];
  failedComments: CommentPayload[];
  setFailedComments: React.Dispatch<React.SetStateAction<CommentPayload[]>>;
  processedComments: ProcessedComments;
  setProcessedComments: React.Dispatch<React.SetStateAction<ProcessedComments>>;
};

const FeedContext = createContext<FeedContextValue | null>(null);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bulkLikeState, setBulkLikeState] = useState<LikePayload>({});
  const [rolledBackLikes, setRolledBackLikes] = useState<
    Record<string, boolean>
  >({});
  const [bulkCommentsState, setBulkCommentsState] = useState<CommentPayload[]>(
    [],
  );
  const [failedComments, setFailedComments] = useState<CommentPayload[]>([]);
  const [processedComments, setProcessedComments] = useState<ProcessedComments>(
    {
      comments: [],
      idMappings: [],
    },
  );

  const { user } = useClerk();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const bulkLikeMutation = trpc.likes.bulkLikePost.useMutation({
    onSuccess: () => {
      setBulkLikeState({});
      setRolledBackLikes({});
      console.log("Bulk like operations completed successfully.");
    },
    onError: () => {
      const newRolledBackState: Record<string, boolean> = {};
      Object.entries(bulkLikeState).forEach(([postId, { liked }]) => {
        newRolledBackState[postId] = !liked;
      });
      setRolledBackLikes(newRolledBackState);
      setBulkLikeState({});

      toast.error("Like operations failed. Please try again.");
    },
  });

  const bulkCommentMutation = trpc.comments.bulkAddComments.useMutation({
    onSuccess: (response) => {
      console.log("BULK COMMENT RESPONSE", response);

      const { idMappings, comments } = response;

      const processedTempIds = idMappings.map(({ tempId }) => tempId);

      setBulkCommentsState((prev) =>
        prev.filter((comment) => !processedTempIds.includes(comment.tempId)),
      );

      setProcessedComments((prev) => ({
        comments: [...prev.comments, ...comments],
        idMappings: [...prev.idMappings, ...idMappings],
      }));
    },
    onError: (error, variables) => {
      setFailedComments((prev) => [...prev, ...variables.comments]);

      toast.error("Some comments failed to post. Please try again.");
    },
  });

  const debouncedSendLikes = useDebounce(async (likedState: LikePayload) => {
    if (!userEmail || Object.keys(likedState).length === 0) return;

    const bulkLikePayload = Object.entries(likedState).map(
      ([postId, { liked }]) => ({
        postId,
        liked,
      }),
    );

    const input = { userEmail, likes: bulkLikePayload };
    await bulkLikeMutation.mutateAsync(input);
  }, BULK_LIKE_DEBOUNCE_DELAY);

  const debouncedSendComments = useDebounce(
    async (comments: CommentPayload[]) => {
      if (!userEmail || comments.length === 0) return;

      const input = {
        comments,
        userEmail,
      };

      await bulkCommentMutation.mutateAsync(input);
    },
    5000,
  );

  const addLikeToBatch = useCallback(
    (payload: LikePayload) => {
      setBulkLikeState((prev) => ({ ...prev, ...payload }));
      const likedState = { ...bulkLikeState, ...payload };
      debouncedSendLikes(likedState);
    },
    [bulkLikeState, debouncedSendLikes],
  );

  const addCommentToBatch = useCallback(
    (payload: CommentPayload) => {
      setBulkCommentsState((prev) => {
        const updatedComments = [...prev, payload];
        debouncedSendComments(updatedComments);
        return updatedComments;
      });
    },
    [debouncedSendComments],
  );

  return (
    <FeedContext.Provider
      value={{
        addLikeToBatch,
        addCommentToBatch,
        bulkLikeState,
        rolledBackLikes,
        setRolledBackLikes,
        bulkCommentsState,
        failedComments,
        setFailedComments,
        processedComments,
        setProcessedComments,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeedContext = (): FeedContextValue => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error("useFeed must be used within a FeedProvider");
  }
  return context;
};
