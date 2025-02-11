import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import config from "~/app/_config/config";
import useLazyLoading from "~/app/_hooks/useLazyLoading";
import type { UserToFollow } from "~/app/(with-sidebar)/myfeed/types/types";
import { trpc } from "~/server/client";

type useFeaturedAuthorPageProps = {
  usersToFollow: UserToFollow[];
  isLoading: boolean;
  userFollowing: string[] | undefined;
};

const useFeaturedAuthorPage = (): useFeaturedAuthorPageProps => {
  const [author, setAuthor] = useState<UserToFollow[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMoreAuthor, setHasMoreAuthor] = useState<boolean>(true);

  const userMutation = trpc.user;
  const featuredAuthorMutation = trpc.usersToFollow;

  const { user } = useClerk();

  const { data: userAlreadyFollowing } = userMutation.getUserFollowings.useQuery({
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });

  const {
    data: usersToFollowData,
    isLoading,
    error,
  } = featuredAuthorMutation.getUsersToFollow.useQuery(
    {
      skip,
      limit: skip === 0 ? config.lazyLoading.initialLimit : config.lazyLoading.limit,
    },
    {
      enabled: skip >= 0 && hasMoreAuthor === true,
    },
  );

  const { handleScroll } = useLazyLoading({
    // TODO: lint error
    queryLoading: isLoading,
    error: error?.message ?? "",
    initialLimit: config.lazyLoading.initialLimit,
    limit: config.lazyLoading.limit,
    skip,
    setSkip,
    hasMoreData: usersToFollowData?.hasMoreAuthor ?? false,
    setHasMoreData: setHasMoreAuthor,
  });

  useEffect(() => {
    setAuthor((prevAuthor) => [...prevAuthor, ...(usersToFollowData?.featuredAuthor ?? [])]);
  }, [usersToFollowData]);

  return {
    usersToFollow: author,
    isLoading,
    userFollowing: userAlreadyFollowing,
  };
};

export default useFeaturedAuthorPage;
