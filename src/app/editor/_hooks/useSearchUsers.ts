import { useEffect, useState } from "react";
import { debounce } from "lodash";
import config from "~/app/_config/config";
import useLazyLoading from "~/app/_hooks/useLazyLoading";
import type { UserSchema } from "~/app/(with-sidebar)/myprofile/types/types";
import { useUser } from "~/context/userContext";
import { trpc } from "~/server/client";

type UseSearchUsersReturn = {
  searchTerm: string;
  users: UserSchema[];
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleScroll: () => void;
};

export const useSearchUsers = (): UseSearchUsersReturn => {
  const { user } = useUser();
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    isLoading: queryLoading,
    error,
  } = trpc.user.searchUsersSortedByFollowing.useQuery(
    {
      searchTerm,
      skip,
      limit: skip == 0 ? config.lazyLoading.initialLimit : config.lazyLoading.limit,
      userFollowing: user?.following ?? [],
    },
    { enabled: Boolean(!isUserTyping && hasMoreUsers) },
  );

  const { handleScroll } = useLazyLoading({
    queryLoading,
    error: error?.message ?? "",
    initialLimit: config.lazyLoading.initialLimit,
    limit: config.lazyLoading.limit,
    skip,
    setSkip,
    hasMoreData: hasMoreUsers,
    setHasMoreData: setHasMoreUsers,
  });

  useEffect(() => {
    if (data) {
      if (data.length < config.lazyLoading.limit) {
        setHasMoreUsers(false);
      }
      setUsers((prev) => {
        const existingUserIds = new Set(prev.map((user) => user.id));
        const newUsers = data.filter((user) => !existingUserIds.has(user.id));
        return prev.concat(newUsers);
      });
    }
  }, [data]);

  const handleSearchChange = debounce(() => {
    setIsUserTyping(false);
  }, 1000);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
    setIsUserTyping(true);
    setUsers([]); // Reset users for fresh search results
    setHasMoreUsers(true);
    setSkip(0); // Reset pagination
    handleSearchChange();
  };

  return { searchTerm, users, handleSearch, handleScroll };
};
