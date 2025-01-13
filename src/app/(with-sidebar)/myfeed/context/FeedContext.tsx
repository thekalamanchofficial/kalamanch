"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { trpc } from "~/server/client";
import { useDebounce } from "~/hooks/useDebounce";
import { useClerk } from "@clerk/nextjs";

type LikePayload = Record<string, { liked: boolean }>;

interface FeedContextValue {
  addLikeToBatch: (payload: LikePayload) => void;
  bulkLikeState: LikePayload | null;
}

const FeedContext = createContext<FeedContextValue | null>(null);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bulkLikeState, setBulkLikeState] = useState<LikePayload>({});
  const bulkLikeMutation = trpc.likes.bulkLikePost.useMutation();

  const { user } = useClerk();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const debouncedSendLikes = useDebounce(async (likedState: LikePayload) => {
    if (!userEmail) return;
    if (Object.keys(likedState).length > 0) {
      // api call
      const bulkLikePayload = Object.entries(likedState).map(
        ([postId, { liked }]) => ({
          postId,
          liked,
        }),
      );

      const input = { userEmail, likes: bulkLikePayload };

      await bulkLikeMutation.mutateAsync(input);

      setBulkLikeState({});
      console.log("bulkLikeState called api", bulkLikePayload);
    }
  }, 5000); // 5 seconds debounce

  const addLikeToBatch = useCallback(
    (payload: LikePayload) => {
      const likedState = { ...bulkLikeState, ...payload };
      setBulkLikeState(likedState);
      debouncedSendLikes(likedState);
    },
    [bulkLikeState, debouncedSendLikes],
  );

  return (
    <FeedContext.Provider value={{ addLikeToBatch, bulkLikeState }}>
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
