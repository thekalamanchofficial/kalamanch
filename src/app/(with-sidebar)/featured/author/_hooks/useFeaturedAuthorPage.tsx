import config from "~/app/_config/config";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { trpc } from "~/server/client";
import type { UserMinimalInfo,  FeaturedAuthor } from "~/app/(with-sidebar)/myfeed/types/types";
import useLazyLoading from "~/app/_hooks/useLazyLoading";

type useFeaturedAuthorPageProps = {
  usersToFollow: UserMinimalInfo[];
  isLoading: boolean;
  userFollowing: string[] | undefined;
};

const useFeaturedAuthorPage = (): useFeaturedAuthorPageProps => {

  const USERS_TO_FOLLOW_LIMIT = 5;
  const [author, setAuthor] = useState<UserMinimalInfo[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMoreAuthor, setHasMoreAuthor] = useState<boolean>(true);

  const userMutation = trpc.user;

  const { user } = useClerk();

  const { data: userDetails, isLoading: userDetailsLoading , error } = userMutation.getUserDetails.useQuery(
    user?.primaryEmailAddress?.emailAddress
  );
  const usersToFollow = userDetails?.usersToFollow ?? [];
  const userAlreadyFollowing = userDetails?.following ?? [];
  const hasMoreUsersToFollow = usersToFollow.length > USERS_TO_FOLLOW_LIMIT;


  const { handleScroll } = useLazyLoading({
    queryLoading: userDetailsLoading,
    error: error?.message ?? "",
    initialLimit: config.lazyLoading.initialLimit,
    limit: config.lazyLoading.limit,
    skip,
    setSkip,
    hasMoreData: hasMoreUsersToFollow ?? false,
    setHasMoreData: setHasMoreAuthor,
  });

  useEffect(() => {
    setAuthor((prevAuthor) => [...prevAuthor, ...(usersToFollow ?? [])]);
  }, [userDetails]);

  return {
    usersToFollow: author,
    isLoading: userDetailsLoading,
    userFollowing: userAlreadyFollowing,
  };
};

export default useFeaturedAuthorPage;
