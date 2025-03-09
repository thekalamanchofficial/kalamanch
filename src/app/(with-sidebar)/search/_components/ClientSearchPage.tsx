"use client";

import { Box, Grid2 as Grid, Pagination, Typography } from "@mui/material";
import { FilterTypeEnum, type SortByEnum } from "../_config/config";
import { useClientSearchPage } from "../_hooks/useClientSearchPage";
import NoResults from "./NoResults";
import PostsList from "./PostsList";
import ProfilesList from "./ProfilesList";
import SearchControls from "./SearchControls";
import SearchLoading from "./SearchLoading";

type ClientSearchPageProps = {
  searchQuery: string;
  initialSortBy?: SortByEnum;
  initialFilterType?: FilterTypeEnum;
  initialProfilesPage?: number;
  initialPostsPage?: number;
};

export default function ClientSearchPage({
  searchQuery,
  initialSortBy,
  initialFilterType,
  initialProfilesPage,
  initialPostsPage,
}: ClientSearchPageProps) {
  const {
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
  } = useClientSearchPage({
    searchQuery,
    initialSortBy,
    initialFilterType,
    initialProfilesPage,
    initialPostsPage,
  });

  const PaginationSection = ({
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

            {filterType === FilterTypeEnum.PEOPLE && profilesTotalPages > 1 && (
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

            {filterType === FilterTypeEnum.POSTS && postsTotalPages > 1 && (
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
