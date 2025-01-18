"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { trpc } from "~/server/client";
import { useDebounce } from "~/hooks/useDebounce";
import { useClerk } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { BULK_COMMENT_DEBOUNCE_DELAY, BULK_LIKE_DEBOUNCE_DELAY } from "../_config/config";
import type { CommentPayload } from "../types/types";

type LikePayload = Record<string, { liked: boolean }>;

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

  const { user } = useClerk();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const bulkLikeMutation = trpc.likes.bulkLikePost.useMutation({
    onSuccess: () => {
      setBulkLikeState({});
      setRolledBackLikes({});
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
    onSuccess: () => {
      setBulkCommentsState([]);
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
    BULK_COMMENT_DEBOUNCE_DELAY,
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
