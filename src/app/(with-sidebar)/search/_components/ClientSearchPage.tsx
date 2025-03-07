"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Box, Grid2 as Grid, Pagination, Typography, useMediaQuery, useTheme } from "@mui/material";
import { trpc } from "~/app/_trpc/client";
import type { Post as PostType } from "~/app/(with-sidebar)/myfeed/types/types";
import {
  DEFAULT_FILTER_TYPE,
  DEFAULT_PAGE,
  DEFAULT_SORT_BY,
  SEARCH_ITEMS_PER_PAGE,
  type FilterTypeOption,
  type SortByOption,
} from "../_config/config";
import NoResults from "./NoResults";
import PostsList from "./PostsList";
import ProfilesList from "./ProfilesList";
import SearchControls from "./SearchControls";
import SearchLoading from "./SearchLoading";

type ClientSearchPageProps = {
  searchQuery: string;
  initialSortBy?: SortByOption;
  initialFilterType?: FilterTypeOption;
  initialProfilesPage?: number;
  initialPostsPage?: number;
};

export default function ClientSearchPage({
  searchQuery,
  initialSortBy = DEFAULT_SORT_BY,
  initialFilterType = DEFAULT_FILTER_TYPE,
  initialProfilesPage = DEFAULT_PAGE,
  initialPostsPage = DEFAULT_PAGE,
}: ClientSearchPageProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [sortBy, setSortBy] = useState<SortByOption>(initialSortBy);
  const [filterType, setFilterType] = useState<FilterTypeOption>(initialFilterType);
  const [profilesPage, setProfilesPage] = useState(initialProfilesPage);
  const [postsPage, setPostsPage] = useState(initialPostsPage);

  const profilesSkip = useMemo(() => (profilesPage - 1) * SEARCH_ITEMS_PER_PAGE, [profilesPage]);
  const postsSkip = useMemo(() => (postsPage - 1) * SEARCH_ITEMS_PER_PAGE, [postsPage]);

  const profilesQueryParams = useMemo(
    () => ({
      searchQuery,
      limit: filterType === "all" ? 10 : SEARCH_ITEMS_PER_PAGE,
      skip: filterType === "all" ? 0 : profilesSkip,
      sortBy,
      filterType,
    }),
    [searchQuery, filterType, profilesSkip, sortBy],
  );

  const postsQueryParams = useMemo(
    () => ({
      searchQuery,
      limit: filterType === "all" ? 10 : SEARCH_ITEMS_PER_PAGE,
      skip: filterType === "all" ? 0 : postsSkip,
      sortBy,
      filterType,
    }),
    [searchQuery, filterType, postsSkip, sortBy],
  );

  const isProfilesQueryEnabled = useMemo(
    () => searchQuery.length > 0 && (filterType === "all" || filterType === "people"),
    [searchQuery, filterType],
  );

  const isPostsQueryEnabled = useMemo(
    () => searchQuery.length > 0 && (filterType === "all" || filterType === "posts"),
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

      if (filterType === "people") {
        params.set("profilesPage", profilesPage.toString());
      }
      if (filterType === "posts") {
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
    () => profiles.length > 0 && (filterType === "all" || filterType === "people"),
    [profiles.length, filterType],
  );

  const showPosts = useMemo(
    () => posts.length > 0 && (filterType === "all" || filterType === "posts"),
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
    setSortBy(value as SortByOption);
    setProfilesPage(1);
    setPostsPage(1);
  }, []);

  const handleFilterChange = useCallback((value: string) => {
    setFilterType(value as FilterTypeOption);
    setProfilesPage(1);
    setPostsPage(1);
  }, []);

  const PaginationSection = useCallback(
    ({
      currentPage,
      totalPages,
      totalItems,
      isLoading,
      onChange,
    }: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      isLoading: boolean;
      onChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
    }) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          mb: 4,
          width: "100%",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Page {currentPage} of {totalPages} ({totalItems} results)
        </Typography>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={onChange}
          color="primary"
          size={isMobile ? "small" : "medium"}
          showFirstButton
          showLastButton
          disabled={isLoading}
        />
      </Box>
    ),
    [isMobile],
  );

  if (searchQuery.length === 0) {
    return <NoResults searchQuery="Please enter a search term" />;
  }

  return (
    <>
      <SearchControls
        isMobile={isMobile}
        sortBy={sortBy}
        filterType={filterType}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />

      <Grid container spacing={3}>
        {isLoading && <SearchLoading />}

        {!hasResults && !isLoading && !isFetching && <NoResults searchQuery={searchQuery} />}

        {showProfiles && !isLoading && (
          <Grid container spacing={0} sx={{ width: "100%", mb: 3 }}>
            <ProfilesList profiles={profiles} isTablet={isTablet} />

            {filterType === "people" && profilesTotalPages > 1 && (
              <PaginationSection
                currentPage={profilesPage}
                totalPages={profilesTotalPages}
                totalItems={totalProfiles}
                isLoading={isProfilesFetching}
                onChange={handleProfilesPageChange}
              />
            )}
          </Grid>
        )}

        {showPosts && !isLoading && (
          <Grid container spacing={0} sx={{ width: "100%" }}>
            <PostsList posts={posts} />

            {filterType === "posts" && postsTotalPages > 1 && (
              <PaginationSection
                currentPage={postsPage}
                totalPages={postsTotalPages}
                totalItems={totalPosts}
                isLoading={isPostsFetching}
                onChange={handlePostsPageChange}
              />
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
}
