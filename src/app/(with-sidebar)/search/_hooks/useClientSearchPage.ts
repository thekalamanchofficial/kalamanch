"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery, useTheme } from "@mui/material";
import { trpc } from "~/app/_trpc/client";
import type { Post as PostType } from "~/app/(with-sidebar)/myfeed/types/types";
import {
  DEFAULT_FILTER_TYPE,
  DEFAULT_PAGE,
  DEFAULT_SORT_BY,
  FilterTypeEnum,
  SEARCH_ITEMS_PER_PAGE,
  type SortByEnum,
} from "../_config/config";

type UseClientSearchPageProps = {
  searchQuery: string;
  initialSortBy?: SortByEnum;
  initialFilterType?: FilterTypeEnum;
  initialProfilesPage?: number;
  initialPostsPage?: number;
};

export function useClientSearchPage({
  searchQuery,
  initialSortBy = DEFAULT_SORT_BY,
  initialFilterType = DEFAULT_FILTER_TYPE,
  initialProfilesPage = DEFAULT_PAGE,
  initialPostsPage = DEFAULT_PAGE,
}: UseClientSearchPageProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [sortBy, setSortBy] = useState<SortByEnum>(initialSortBy);
  const [filterType, setFilterType] = useState<FilterTypeEnum>(initialFilterType);
  const [profilesPage, setProfilesPage] = useState(initialProfilesPage);
  const [postsPage, setPostsPage] = useState(initialPostsPage);

  const profilesSkip = useMemo(() => (profilesPage - 1) * SEARCH_ITEMS_PER_PAGE, [profilesPage]);
  const postsSkip = useMemo(() => (postsPage - 1) * SEARCH_ITEMS_PER_PAGE, [postsPage]);

  const profilesQueryParams = useMemo(
    () => ({
      searchQuery,
      limit: filterType === FilterTypeEnum.ALL ? 10 : SEARCH_ITEMS_PER_PAGE,
      skip: filterType === FilterTypeEnum.ALL ? 0 : profilesSkip,
      sortBy,
      filterType,
    }),
    [searchQuery, filterType, profilesSkip, sortBy],
  );

  const postsQueryParams = useMemo(
    () => ({
      searchQuery,
      limit: filterType === FilterTypeEnum.ALL ? 10 : SEARCH_ITEMS_PER_PAGE,
      skip: filterType === FilterTypeEnum.ALL ? 0 : postsSkip,
      sortBy,
      filterType,
    }),
    [searchQuery, filterType, postsSkip, sortBy],
  );

  const isProfilesQueryEnabled = useMemo(
    () =>
      searchQuery.length > 0 &&
      (filterType === FilterTypeEnum.ALL || filterType === FilterTypeEnum.PEOPLE),
    [searchQuery, filterType],
  );

  const isPostsQueryEnabled = useMemo(
    () =>
      searchQuery.length > 0 &&
      (filterType === FilterTypeEnum.ALL || filterType === FilterTypeEnum.POSTS),
    [searchQuery, filterType],
  );

  const {
    data: profilesData,
    isLoading: isProfilesLoading,
    isFetching: isProfilesFetching,
  } = trpc.user.searchProfiles.useQuery(profilesQueryParams, {
    enabled: isProfilesQueryEnabled,
  });

  const {
    data: postsData,
    isLoading: isPostsLoading,
    isFetching: isPostsFetching,
  } = trpc.post.searchPosts.useQuery(postsQueryParams, {
    enabled: isPostsQueryEnabled,
  });

  useEffect(() => {
    if (searchQuery) {
      const params = new URLSearchParams();
      params.set("q", searchQuery);
      params.set("sortBy", sortBy);
      params.set("filterType", filterType);

      if (filterType === FilterTypeEnum.PEOPLE) {
        params.set("profilesPage", profilesPage.toString());
      }
      if (filterType === FilterTypeEnum.POSTS) {
        params.set("postsPage", postsPage.toString());
      }

      router.push(`${pathname}?${params.toString()}`);
    }
  }, [sortBy, filterType, profilesPage, postsPage, searchQuery, pathname, router]);

  const { profiles, totalProfiles, profilesTotalPages } = useMemo(() => {
    const profilesResult = profilesData ?? { profiles: [], hasMore: false, totalCount: 0 };
    return {
      profiles: profilesResult.profiles,
      totalProfiles: profilesResult.totalCount,
      profilesTotalPages: Math.ceil(profilesResult.totalCount / SEARCH_ITEMS_PER_PAGE),
    };
  }, [profilesData]);

  const { posts, totalPosts, postsTotalPages } = useMemo(() => {
    const postsResult = Array.isArray(postsData)
      ? { posts: [], hasMore: false, totalCount: 0 }
      : (postsData ?? { posts: [], hasMore: false, totalCount: 0 });

    return {
      posts: postsResult.posts as PostType[],
      totalPosts: postsResult.totalCount,
      postsTotalPages: Math.ceil(postsResult.totalCount / SEARCH_ITEMS_PER_PAGE),
    };
  }, [postsData]);

  const hasResults = useMemo(
    () => profiles.length > 0 || posts.length > 0,
    [profiles.length, posts.length],
  );

  const isLoading = isProfilesLoading || isPostsLoading;
  const isFetching = isProfilesFetching || isPostsFetching;

  const showProfiles = useMemo(
    () =>
      profiles.length > 0 &&
      (filterType === FilterTypeEnum.ALL || filterType === FilterTypeEnum.PEOPLE),
    [profiles.length, filterType],
  );

  const showPosts = useMemo(
    () =>
      posts.length > 0 &&
      (filterType === FilterTypeEnum.ALL || filterType === FilterTypeEnum.POSTS),
    [posts.length, filterType],
  );

  const handleProfilesPageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, page: number) => {
      setProfilesPage(page);
    },
    [],
  );

  const handlePostsPageChange = useCallback((_event: React.ChangeEvent<unknown>, page: number) => {
    setPostsPage(page);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value as SortByEnum);
    setProfilesPage(1);
    setPostsPage(1);
  }, []);

  const handleFilterChange = useCallback((value: string) => {
    setFilterType(value as FilterTypeEnum);
    setProfilesPage(1);
    setPostsPage(1);
  }, []);

  return {
    isMobile,
    isTablet,
    profiles,
    posts,
    isLoading,
    isFetching,
    isProfilesFetching,
    isPostsFetching,
    hasResults,
    showProfiles,
    showPosts,
    profilesPage,
    postsPage,
    profilesTotalPages,
    postsTotalPages,
    totalProfiles,
    totalPosts,
    handleProfilesPageChange,
    handlePostsPageChange,
    handleSortChange,
    handleFilterChange,
    sortBy,
    filterType,
  };
}
