// FeedContext.tsx
"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { trpc } from "~/server/client";
import { useDebounce } from "~/hooks/useDebounce";
import { useClerk } from "@clerk/nextjs";
import { toast } from "react-toastify";

type LikePayload = Record<string, { liked: boolean }>;

interface FeedContextValue {
  addLikeToBatch: (payload: LikePayload) => void;
  bulkLikeState: LikePayload | null;
  rolledBackLikes: Record<string, boolean>;
}

const FeedContext = createContext<FeedContextValue | null>(null);

export const FeedProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bulkLikeState, setBulkLikeState] = useState<LikePayload>({});
  const [pendingLikes, setPendingLikes] = useState<LikePayload>({});
  const [rolledBackLikes, setRolledBackLikes] = useState<Record<string, boolean>>({});
  
  const bulkLikeMutation = trpc.likes.bulkLikePost.useMutation({
    onSuccess: () => {
      setPendingLikes({});
      setBulkLikeState({});
      setRolledBackLikes({});
      console.log("Bulk like operations completed successfully.");
    },
    onError: () => {
      const newRolledBackState: Record<string, boolean> = {};
      Object.entries(pendingLikes).forEach(([postId, { liked }]) => {
        newRolledBackState[postId] = !liked;
      });
      setRolledBackLikes(newRolledBackState);
      
      setPendingLikes({});
      setBulkLikeState({});
      
      setTimeout(() => {
        setRolledBackLikes({});
      }, 100);

      toast.error("Like operations failed. Please try again.");
    },
  });

  const { user } = useClerk();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

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
  }, 5000);

  const addLikeToBatch = useCallback(
    (payload: LikePayload) => {
      setPendingLikes(prev => ({ ...prev, ...payload }));
      const likedState = { ...bulkLikeState, ...payload };
      setBulkLikeState(likedState);
      debouncedSendLikes(likedState);
    },
    [bulkLikeState, debouncedSendLikes],
  );

  return (
    <FeedContext.Provider 
      value={{ 
        addLikeToBatch, 
        bulkLikeState, 
        rolledBackLikes
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
