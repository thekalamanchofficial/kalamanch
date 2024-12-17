import config from "~/app/_config/config";
import { useEffect, useState } from "react";
import { trpc } from "~/server/client";
import { type FeaturedPost } from "~/app/(with-sidebar)/myfeed/types/types";
import { useRouter } from "next/navigation";
import useLazyLoading from "~/app/_hooks/useLazyLoading";

type useFeaturedPostPageProps = {
  post: FeaturedPost[];
  isLoading: boolean;
  handleClick: (postId: string) => void;
};

const useFeaturedPostPage = (): useFeaturedPostPageProps => {
  const [post, setPosts] = useState<FeaturedPost[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  const featuredPostMutation = trpc.featuredPost;

  const router = useRouter();
  const { data, isLoading, error } =
    featuredPostMutation.getFeaturedPosts.useQuery(
      {
        skip,
        limit:
          skip === 0
            ? config.lazyLoading.initialLimit
            : config.lazyLoading.limit,
      },
      {
        enabled: skip >= 0 && hasMorePosts === true,
      },
    );

  const { handleScroll } = useLazyLoading({
    queryLoading: isLoading,
    error: error?.message ?? "",
    initialLimit: config.lazyLoading.initialLimit,
    limit: config.lazyLoading.limit,
    skip,
    setSkip,
    hasMoreData: data?.hasMore ?? false,
    setHasMoreData: setHasMorePosts,
  });

  const handleClick = (postId: string) => {
    router.push(`/article/${postId}`);
  };

  useEffect(() => {
    setPosts((prevPost) => [...prevPost, ...(data?.featuredPosts ?? [])]);
  }, [data]);

  return {
    post,
    isLoading,
    handleClick,
  };
};

export default useFeaturedPostPage;
