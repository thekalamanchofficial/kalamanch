import { useState, useCallback, useEffect } from "react";
import { useFeedContext } from "~/app/(with-sidebar)/myfeed/context/FeedContext";

type UseBookmarkProps = {
  initialIsBookmarked: boolean;
  postId: string;
  userEmail?: string;
};

type UseBookmarkReturn = {
  hasBookmarked: boolean;
  handleBookmark: () => Promise<void>;
};

type UseBookmark = (props: UseBookmarkProps) => UseBookmarkReturn;

export const useBookmark: UseBookmark = ({
  initialIsBookmarked,
  postId,
  userEmail,
}) => {
  const [hasBookmarked, setHasBookmarked] = useState(initialIsBookmarked);
  const { addBookmarkToBatch, rolledBackBookmarks, setRolledBackBookmarks } =
    useFeedContext();

  const handleBookmark = useCallback(async () => {
    if (!userEmail) return;

    const newBookmarkState = !hasBookmarked;

    setHasBookmarked(newBookmarkState);
    addBookmarkToBatch({
      [postId]: {
        bookmarked: newBookmarkState,
      },
    });
  }, [hasBookmarked, postId, userEmail, addBookmarkToBatch]);

  useEffect(() => {
    setHasBookmarked(initialIsBookmarked);
  }, [initialIsBookmarked]);

  useEffect(() => {
    if (postId in rolledBackBookmarks) {
      setHasBookmarked(rolledBackBookmarks[postId] ?? false);
      setRolledBackBookmarks((prev) => {
        const { [postId]: _, ...newRolledBackState } = prev;
        return newRolledBackState;
      });
    }
  }, [rolledBackBookmarks, setRolledBackBookmarks, postId]);

  return {
    hasBookmarked,
    handleBookmark,
  };
};
