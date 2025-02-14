import { useEffect, useMemo, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { PostStatus } from "@prisma/client";
import config from "~/app/_config/config";
import useBookmarkPosts from "~/app/_hooks/useBookmarkPosts";
import useLazyLoading from "~/app/_hooks/useLazyLoading";
import useLikePosts from "~/app/_hooks/useLikePosts";
import { trpc } from "~/server/client";
import { type Post } from "../types/types";

type useMyFeedPageReturn = {
  postDataWithComments: Post[];
  likedPosts: string[];
  bookmarkedPosts: string[];
  queryLoading: boolean;
  hasMorePosts: boolean;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleScroll: () => void;
  errorMessage: string;
};

const useMyFeedPage = (): useMyFeedPageReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const { user } = useClerk();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const postMutation = trpc.post;

  const {
    data: postData,
    isLoading: queryLoading,
    error,
  } = postMutation.getPosts.useQuery(
    {
      skip,
      limit: skip === 0 ? config.lazyLoading.initialLimit : config.lazyLoading.limit,
    },
    {
      enabled: hasMorePosts,
    },
  );

  const { handleScroll } = useLazyLoading({
    queryLoading,
    error: error?.message ?? "",
    initialLimit: config.lazyLoading.initialLimit,
    limit: config.lazyLoading.limit,
    skip,
    setSkip,
    hasMoreData: postData?.hasMorePosts ?? false,
    setHasMoreData: setHasMorePosts,
  });

  const postDataWithComments = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        comments: post.comments?.map((comment) => ({
          ...comment,
          postId: post.id,
        })),
      })),
    [posts],
  );

  const { likedPosts } = useLikePosts({
    userEmail: userEmail ?? "",
    postStatus: PostStatus.PUBLISHED.toString().toUpperCase(),
  });

  const { bookmarkedPosts } = useBookmarkPosts({
    userEmail: userEmail ?? "",
  });

  useEffect(() => {
    if (postData?.posts) {
      setPosts((prev) => {
        const existingPostIds = new Set(prev.map((post) => post.id));
        // TODO: find a better way to remove duplicate posts, try out using trpc infinite query.
        const newPosts = postData.posts.filter((post) => !existingPostIds.has(post.id));
        return [...prev, ...newPosts];
      });
    }
  }, [postData]);

  return {
    postDataWithComments,
    likedPosts,
    bookmarkedPosts,
    queryLoading,
    hasMorePosts: postData?.hasMorePosts ?? false,
    skip,
    setSkip,
    handleScroll,
    errorMessage: error?.message ?? "",
  };
};

export default useMyFeedPage;
