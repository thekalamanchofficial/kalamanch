"use client";

import { useEffect, useRef, useCallback } from "react";
import Post from "~/app/_components/post/Post";
import { trpc } from "~/server/client";
import ShowMessage from "~/app/_components/showMessage/ShowMessage";
import Loader from "~/app/_components/loader/Loader";

type BookmarkPostFeedProps = {
  userFollowing: string[];
  userLikes: string[];
  userEnail: string;
};

export default function BookmarkPostFeed({
  userFollowing,
  userLikes,
  userEnail,
}: BookmarkPostFeedProps) {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading } =
    trpc.bookmarks.getUserBookmarkPosts.useInfiniteQuery(
      {
        limit: 10,
        userEmail: userEnail,
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

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (scrollDiv) {
        observer.unobserve(scrollDiv);
      }
    };
  }, [loadMorePosts]);

  return (
    <div>
      <ul>
        {bookmarkedPosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            userFollowing={userFollowing}
            isLiked={userLikes?.includes(post.id) ?? false}
            isBookmarked={true}
          />
        ))}
      </ul>

      {isFetchingNextPage && (
        <Loader title="Loading Posts..." height="100%" width="100%" />
      )}

      {!isLoading && !hasNextPage && (
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
    </div>
  );
}
