import { useMemo } from "react";
import { trpc } from "~/server/client";

type UseBookmarkReturn = {
  bookmarkedPosts: string[];
};

type UseBookmarkInput = {
  userEmail: string;
};

type UseBookmarkHook = (input: UseBookmarkInput) => UseBookmarkReturn;

const useBookmarkPosts: UseBookmarkHook = ({ userEmail }) => {
  const bookmarkProcedure = trpc.bookmarks;

  const { data: bookmarkedPostData } = bookmarkProcedure.getUserBookmarkPosts.useQuery({
    limit: null,
    userEmail: userEmail ?? "",
  });

  const bookmarkedPostIds = useMemo(
    () => bookmarkedPostData?.items?.map((post) => post.id) ?? [],
    [bookmarkedPostData],
  );

  return {
    bookmarkedPosts: bookmarkedPostIds,
  };
};

export default useBookmarkPosts;
