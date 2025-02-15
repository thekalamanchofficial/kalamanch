"use client";

import { useCallback, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Loader from "~/app/_components/loader/Loader";
import Post from "~/app/_components/post/Post";
import ShowMessage from "~/app/_components/showMessage/ShowMessage";
import { trpc } from "~/server/client";

type BookmarkPostFeedProps = {
  userFollowing: string[];
  userLikes: string[];
  userEmail: string;
};

export default function BookmarkPostFeed({
  userFollowing,
  userLikes,
  userEmail,
}: BookmarkPostFeedProps) {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isPending } =
    trpc.bookmarks.getUserBookmarkPosts.useInfiniteQuery(
      {
        limit: 10,
        userEmail,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const bookmarkedPosts = data?.pages.flatMap((page) => page.items) ?? [];

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMorePosts = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const scrollDiv = loadMoreRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          loadMorePosts();
        }
      },
      {
        rootMargin: "200px",
      },
    );

    if (scrollDiv) {
      observer.observe(scrollDiv);
    }

    return () => {
      if (scrollDiv) {
        observer.unobserve(scrollDiv);
      }
    };
  }, [loadMorePosts]);

  return (
    <Box>
      {bookmarkedPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          userFollowing={userFollowing}
          isLiked={userLikes?.includes(post.id) ?? false}
          isBookmarked={true}
        />
      ))}

      {isFetchingNextPage && <Loader title="Loading Posts..." height="100%" width="100%" />}

      {!isPending && !hasNextPage && (
        <ShowMessage
          title="No More Posts Found."
          style={{
            height: "auto",
            width: "100%",
            marginTop: "20px",
            padding: "8px",
            backgroundColor: "secondary.main",
          }}
        />
      )}

      {/* Empty div to trigger the scroll detection */}
      <div ref={loadMoreRef} />
    </Box>
  );
}
