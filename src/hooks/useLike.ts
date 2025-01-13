import { useState, useRef, useCallback, useEffect } from "react";
import { useFeedContext } from "~/app/(with-sidebar)/myfeed/context/FeedContext";
import { handleError } from "~/app/_utils/handleError";
import { trpc } from "~/server/client";

interface UseLikeProps {
  initialLikeCount: number;
  initialIsLiked: boolean;
  postId: string;
  userEmail?: string;
}

export function useLike({
  initialLikeCount,
  initialIsLiked,
  postId,
  userEmail,
}: UseLikeProps) {
  const [hasLiked, setHasLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const { addLikeToBatch } = useFeedContext();
  const isLikeInProgress = useRef(false);

  const likeMutation = trpc.likes.likePost.useMutation();

  useEffect(() => {
    setHasLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [initialIsLiked, initialLikeCount]);

  const handleLike = useCallback(async () => {
    if (!userEmail || isLikeInProgress.current) return;

    const newLikedState = !hasLiked;
    isLikeInProgress.current = true;

    // Optimistically update the state
    setHasLiked(newLikedState);
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));
    addLikeToBatch({
      [postId]: {
        liked: newLikedState,
      },
    });

    try {
      // const response = await likeMutation.mutateAsync({
      //   postId,
      //   userEmail,
      // });
      // Update with the actual server state if different
      // if (response.liked !== newLikedState) {
      //   setHasLiked(response.liked);
      //   setLikeCount(prev => newLikedState ? prev - 1 : prev + 1);
      // }
    } catch (error) {
      // Revert to original state if the API call fails
      setHasLiked(!newLikedState);
      setLikeCount((prev) => (newLikedState ? prev - 1 : prev + 1));
      console.error("Error liking post:", error);
      handleError(error);
    } finally {
      isLikeInProgress.current = false;
    }
  }, [hasLiked, postId, userEmail, likeMutation, addLikeToBatch]);

  return {
    hasLiked,
    likeCount,
    handleLike,
  };
}
