import config from "~/app/_config/config";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { trpc } from "~/server/client";
import { type FeaturedAuthor } from "~/app/(with-sidebar)/myfeed/types/types";
import useLazyLoading from "~/app/_hooks/useLazyLoading";

type useFeaturedAuthorPageProps = {
  author: FeaturedAuthor[];
  isLoading: boolean;
  userFollowing: string[] | undefined;
};

const useFeaturedAuthorPage = (): useFeaturedAuthorPageProps => {
  const [author, setAuthor] = useState<FeaturedAuthor[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMoreAuthor, setHasMoreAuthor] = useState<boolean>(true);

  const featuredAuthorMutation = trpc.featuredAuthor;
  const userMutation = trpc.user;

  const { user } = useClerk();

  const { data: userFollowing } = userMutation.getUserFollowings.useQuery({
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });

  const { data, isLoading, error } =
    featuredAuthorMutation.getFeaturedAuthors.useQuery(
      {
        skip,
        limit:
          skip === 0
            ? config.lazyLoading.initialLimit
            : config.lazyLoading.limit,
      },
      {
        enabled: skip >= 0 && hasMoreAuthor === true,
      },
    );

  const { handleScroll } = useLazyLoading({
    queryLoading: isLoading,
    error: error?.message ?? "",
    initialLimit: config.lazyLoading.initialLimit,
    limit: config.lazyLoading.limit,
    skip,
    setSkip,
    hasMoreData: data?.hasMoreAuthor ?? false,
    setHasMoreData: setHasMoreAuthor,
  });

  useEffect(() => {
    setAuthor((prevAuthor) => [...prevAuthor, ...(data?.featuredAuthor ?? [])]);
  }, [data]);

  return {
    author,
    isLoading,
    userFollowing,
  };
};

export default useFeaturedAuthorPage;
