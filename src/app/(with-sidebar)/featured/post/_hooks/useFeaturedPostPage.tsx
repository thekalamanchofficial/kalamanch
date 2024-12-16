import config from "~/app/_config/config";
import { useCallback, useEffect, useState } from "react";
import { trpc } from "~/server/client";
import { type FeaturedPost } from "~/app/(with-sidebar)/myfeed/types/types";
import { useRouter } from "next/navigation";

type useFeaturedPostPageProps = {
  post: FeaturedPost[];
  featuredPostLoading: boolean;
  handleClick: (postId: string) => void;
};

const useFeaturedPostPage = (): useFeaturedPostPageProps => {
  const router = useRouter();

  const [post, setPosts] = useState<FeaturedPost[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState<boolean | undefined>(true);

  const featuredPostMutation = trpc.featuredPost;

  const {
    data: featuredPostData,
    isLoading: featuredPostLoading,
    error,
  } = featuredPostMutation.getFeaturedPosts.useQuery(
    {
      skip,
      limit:
        skip === 0 ? config.lazyLoading.initialLimit : config.lazyLoading.limit,
    },
    {
      enabled: skip >= 0 && hasMorePosts === true,
    },
  );

  const handleClick = (postId: string) => {
    router.push(`/article/${postId}`);
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomReached = scrollHeight - scrollTop - clientHeight < 10;

    if (bottomReached && !featuredPostLoading && !error) {
      setHasMorePosts(featuredPostData?.hasMorePost);
      setSkip((prev) =>
        prev == 0
          ? config.lazyLoading.initialLimit + prev
          : prev + config.lazyLoading.limit,
      );
    }
  }, [error, featuredPostData?.hasMorePost, featuredPostLoading]);

  useEffect(() => {
    setPosts((prevPosts) => [
      ...prevPosts,
      ...(featuredPostData?.featuredPosts ?? []),
    ]);
  }, [featuredPostData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, hasMorePosts, featuredPostLoading]);

  return {
    post,
    featuredPostLoading,
    handleClick,
  };
};

export default useFeaturedPostPage;
