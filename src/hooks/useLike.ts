import { useState, useRef, useCallback, useEffect } from "react";
import { useFeedContext } from "~/app/(with-sidebar)/myfeed/context/FeedContext";

type UseLikeProps = {
  initialLikeCount: number;
  initialIsLiked: boolean;
  postId: string;
  userEmail?: string;
};

export function useLike({
  initialLikeCount,
  initialIsLiked,
  postId,
  userEmail,
}: UseLikeProps) {
  const [hasLiked, setHasLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const { addLikeToBatch, rolledBackLikes, setRolledBackLikes } = useFeedContext();
  const isLikeInProgress = useRef(false);

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
    isLikeInProgress.current = false;
  }, [hasLiked, postId, userEmail, addLikeToBatch]);

  useEffect(() => {
    setHasLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [initialIsLiked, initialLikeCount]);

  useEffect(() => {
    if (postId in rolledBackLikes) {
      setHasLiked(rolledBackLikes[postId] ?? false);
      setLikeCount((prev) => (rolledBackLikes[postId] ? prev + 1 : prev - 1));
      setRolledBackLikes((prev) => {
        const { [postId]: _, ...newRolledBackState } = prev;
        return newRolledBackState;
      });
    }
  }, [rolledBackLikes, setRolledBackLikes,postId]);

  return {
    hasLiked,
    likeCount,
    handleLike,
  };
}
