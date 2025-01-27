import { useState, useCallback, useEffect } from "react";
import { useFeedContext } from "~/app/(with-sidebar)/myfeed/context/FeedContext";

type UseLikeProps = {
  initialLikeCount: number;
  initialIsLiked: boolean;
  postId?: string | null | undefined;
  iterationId?: string | null | undefined;
  postStatus: string;
  userEmail?: string;
};

export function useLike({
  initialLikeCount,
  initialIsLiked,
  postId,
  iterationId,
  postStatus,
  userEmail,
}: UseLikeProps) {
  const [hasLiked, setHasLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const { addLikeToBatch, rolledBackLikes, setRolledBackLikes } = useFeedContext();

  const handleLike = useCallback(async () => {
    if (!userEmail) return;
    const newLikedState = !hasLiked;
    setHasLiked(newLikedState);
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));
    if(postId){
      addLikeToBatch({
        [postId]: {
          liked: newLikedState,
          postStatus: postStatus,
        },
      });
    }
    else if(iterationId){
      addLikeToBatch({
        [iterationId]: {
          liked: newLikedState,
          postStatus: postStatus,
        },
      });

    }
  }, [hasLiked, postId, userEmail, addLikeToBatch]);

  useEffect(() => {
    setHasLiked(initialIsLiked);
    setLikeCount(initialLikeCount);
  }, [initialIsLiked, initialLikeCount]);

  useEffect(() => {
    if (!postId && !iterationId) return; // Ensures at least one is provided
    const postOrIterationId = postId ?? iterationId;
    if (postOrIterationId && postOrIterationId in rolledBackLikes) {
      setHasLiked(rolledBackLikes[postOrIterationId]?.liked ?? false);
      setLikeCount((prev) => (rolledBackLikes[postOrIterationId] ? prev + 1 : prev - 1));
      setRolledBackLikes((prev) => {
        const { [postOrIterationId]: _, ...newRolledBackState } = prev;
        return newRolledBackState;
      });
    }
  }, [rolledBackLikes, setRolledBackLikes,postId,iterationId,postStatus]);

  return {
    hasLiked,
    likeCount,
    handleLike,
  };
}
