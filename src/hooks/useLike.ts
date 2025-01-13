import { useState, useRef, useCallback, useEffect } from "react";
import { useFeedContext } from "~/app/(with-sidebar)/myfeed/context/FeedContext";

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
  const { addLikeToBatch, rolledBackLikes } = useFeedContext();
  const isLikeInProgress = useRef(false);

  useEffect(() => {
    setHasLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [initialIsLiked, initialLikeCount]);

  useEffect(() => {
    if (postId in rolledBackLikes) {
      isLikeInProgress.current = false;
      setHasLiked(rolledBackLikes[postId] ?? false);
    }
  }, [rolledBackLikes, postId]);

  const handleLike = useCallback(async () => {
    if (!userEmail || isLikeInProgress.current) return;

    const newLikedState = !hasLiked;
    isLikeInProgress.current = true;

    setHasLiked(newLikedState);
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));
    addLikeToBatch({
      [postId]: {
        liked: newLikedState,
      },
    });
  }, [hasLiked, postId, userEmail, addLikeToBatch]);

  return {
    hasLiked,
    likeCount,
    handleLike,
  };
}
