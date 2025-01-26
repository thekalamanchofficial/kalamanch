import { MyFeedTabsEnum, type Post } from "../types/types";
import config from "~/app/_config/config";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
import { trpc } from "~/server/client";
import useLazyLoading from "~/app/_hooks/useLazyLoading";
import useBookmarkPosts from "~/app/_hooks/useBookmarkPosts";
import useLikePosts from "~/app/_hooks/useLikePosts";

type useMyFeedPageReturn = {
  postDataWithComments: Post[];
  likedPosts: string[];
  bookmarkedPosts: string[];
  queryLoading: boolean;
  hasMorePosts: boolean;
  tab: MyFeedTabsEnum;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleTabChange: (newTab: MyFeedTabsEnum) => void;
  handleScroll: () => void;
  errorMessage: string;
};

const useMyFeedPage = (): useMyFeedPageReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tab, setTab] = useState<MyFeedTabsEnum>(MyFeedTabsEnum.MY_FEED);
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
      limit:
        skip === 0 ? config.lazyLoading.initialLimit : config.lazyLoading.limit,
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
  });

  const { bookmarkedPosts } = useBookmarkPosts({
    userEmail: userEmail ?? "",
  });

  const handleTabChange = (newTab: MyFeedTabsEnum) => {
    setTab(newTab);
  };

  useEffect(() => {
    if (postData?.posts) {
      setPosts((prev) => {
        const existingPostIds = new Set(prev.map((post) => post.id));
        // TODO: find a better way to remove duplicate posts, try out using trpc infinite query.
        const newPosts = postData.posts.filter(
          (post) => !existingPostIds.has(post.id),
        );
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
    tab,
    skip,
    setSkip,
    handleTabChange,
    handleScroll,
    errorMessage: error?.message ?? "",
  };
};

export default useMyFeedPage;
