"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { trpc } from "~/server/client";
import { useDebounce } from "~/hooks/useDebounce";

type LikePayload = Record<string, { userId: string; liked: boolean }>;

interface FeedContextValue {
  addLikeToBatch: (payload: LikePayload) => void;
  bulkLikeState: LikePayload | null;
}

const FeedContext = createContext<FeedContextValue | null>(null);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bulkLikeState, setBulkLikeState] = useState<LikePayload>({});
  // const likeMutation = trpc.likes.bulkLike.useMutation();

  const debouncedSendLikes = useDebounce(
    (likedState: LikePayload) => {
      if (bulkLikeState) {
        // api call

        setBulkLikeState({});
        console.log("bulkLikeState called api", likedState);
      }
    },
    10000,
  ); // 1-minute debounce

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
