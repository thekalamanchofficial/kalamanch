import config from "~/app/_config/config";
import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";
import { trpc } from "~/server/client";
import { type FeaturedAuthor } from "~/app/(with-sidebar)/myfeed/types/types";

type useFeaturedAuthorPageProps = {
  author: FeaturedAuthor[];
  isLoading: boolean;
  userFollowing: string[] | undefined;
};

const useFeaturedAuthorPage = (): useFeaturedAuthorPageProps => {
  const { user } = useClerk();
  const [author, setAuthor] = useState<FeaturedAuthor[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMoreAuthor, setHasMoreAuthor] = useState<boolean | undefined>(true);

  const featuredAuthorMutation = trpc.featuredAuthor;
  const userMutation = trpc.user;

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

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomReached = scrollHeight - scrollTop - clientHeight < 10;

    if (bottomReached && !isLoading && !error) {
      setHasMoreAuthor(data?.hasMoreAuthor);
      setSkip((prev) =>
        prev == 0
          ? config.lazyLoading.initialLimit + prev
          : prev + config.lazyLoading.limit,
      );
    }
  }, [error, data?.hasMoreAuthor, isLoading]);

  useEffect(() => {
    setAuthor((prevAuthor) => [...prevAuthor, ...(data?.featuredAuthor ?? [])]);
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, hasMoreAuthor, isLoading]);
  return {
    author,
    isLoading,
    userFollowing,
  };
};

export default useFeaturedAuthorPage;
