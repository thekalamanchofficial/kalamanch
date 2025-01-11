import { useState, useRef, useCallback, useEffect } from 'react';
import { trpc } from '~/server/client';

interface UseLikeProps {
  initialLikeCount: number;
  initialIsLiked: boolean;
  postId: string;
  userEmail?: string;
}

export function useLike({ initialLikeCount, initialIsLiked, postId, userEmail }: UseLikeProps) {
  const [hasLiked, setHasLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
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
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);

    try {
      const response = await likeMutation.mutateAsync({
        postId,
        userEmail,
      });
      
      // Update with the actual server state if different
      if (response.liked !== newLikedState) {
        setHasLiked(response.liked);
        setLikeCount(prev => newLikedState ? prev - 1 : prev + 1);
      }
    } catch (error) {
      // Revert to original state if the API call fails
      setHasLiked(!newLikedState);
      setLikeCount(prev => newLikedState ? prev - 1 : prev + 1);
      console.error("Error liking post:", error);
    } finally {
      isLikeInProgress.current = false;
    }
  }, [hasLiked, postId, userEmail, likeMutation]);

  return {
    hasLiked,
    likeCount,
    handleLike
  };
}
