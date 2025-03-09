"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { alpha, Box, CircularProgress, Divider, Link, Paper, Typography } from "@mui/material";
import { trpc } from "~/app/_trpc/client";
import {
  FilterTypeEnum,
  SEARCH_RESULTS_CACHE_TIME,
  SortByEnum,
} from "~/app/(with-sidebar)/search/_config/config";
import { PostResults } from "./PostResults";
import { ProfileResults } from "./ProfileResults";
import type { SearchResultsPopupProps } from "./types/types";

export const NoResults: React.FC<{ searchQuery: string }> = ({ searchQuery }) => (
  <Box
    sx={{
      p: 4,
      textAlign: "center",
      color: "text.secondary",
      minHeight: 120,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 0.5,
    }}
  >
    <Typography
      variant="body1"
      sx={{
        color: "text.primary",
        fontWeight: 500,
        mb: 0.5,
      }}
    >
      No results found for &ldquo;{searchQuery}&rdquo;
    </Typography>
    <Typography
      variant="body2"
      sx={{
        color: "text.secondary",
        fontSize: "0.875rem",
      }}
    >
      Try different keywords or check your spelling
    </Typography>
  </Box>
);

export const EmptyQuery = () => (
  <Box
    sx={{
      p: 4,
      textAlign: "center",
      color: "text.secondary",
      minHeight: 120,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 1,
    }}
  >
    <SearchIcon sx={{ fontSize: 40, color: "text.disabled", opacity: 0.5 }} />
    <Typography
      variant="body1"
      sx={{
        color: "text.secondary",
        fontWeight: 500,
      }}
    >
      Type to search
    </Typography>
    <Typography
      variant="body2"
      sx={{
        color: "text.disabled",
        fontSize: "0.875rem",
      }}
    >
      Search for posts, profiles, and more
    </Typography>
  </Box>
);

export const LoadingState = () => (
  <Box
    sx={{
      p: 3,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: 120,
    }}
  >
    <CircularProgress size={20} thickness={4} sx={{ color: "primary.light" }} />
  </Box>
);

const SearchResultsPopup: React.FC<SearchResultsPopupProps> = ({ searchQuery, onClose }) => {
  const router = useRouter();

  const { data: profilesData, isLoading: isProfilesLoading } = trpc.user.searchProfiles.useQuery(
    {
      searchQuery,
      limit: 5,
      skip: 0,
      sortBy: SortByEnum.RELEVANT,
    },
    {
      enabled: searchQuery.length > 0,
      staleTime: SEARCH_RESULTS_CACHE_TIME,
    },
  );

  const { data: postsData, isLoading: isPostsLoading } = trpc.post.searchPosts.useQuery(
    {
      searchQuery,
      limit: 5,
      skip: 0,
      sortBy: SortByEnum.RECENT,
    },
    {
      enabled: searchQuery.length > 0,
      staleTime: SEARCH_RESULTS_CACHE_TIME,
    },
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && searchQuery.trim().length > 0) {
        e.preventDefault();
        router.push(
          `/search?q=${encodeURIComponent(searchQuery.trim())}&sortBy=${SortByEnum.RELEVANT}&filterType=${FilterTypeEnum.ALL}`,
        );
        onClose?.();
      }
    },
    [searchQuery, router, onClose],
  );

  const isLoading = isProfilesLoading || isPostsLoading;
  const profiles = profilesData?.profiles ?? [];
  const postsResult = Array.isArray(postsData) ? { posts: [] } : (postsData ?? { posts: [] });
  const posts = postsResult.posts;
  const hasResults = profiles.length > 0 || posts.length > 0;

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        right: 0,
        maxHeight: "400px",
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 1300,
        backgroundColor: "background.paper",
        borderRadius: "12px",
        boxShadow: (theme) => `0 6px 24px ${alpha(theme.palette.common.black, 0.12)}`,
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: 1,
        transform: "translateY(0)",
        animation: "fadeIn 0.2s ease-out",
        "@keyframes fadeIn": {
          "0%": {
            opacity: 0,
            transform: "translateY(-8px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: (theme) => theme.palette.grey[200],
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: (theme) => theme.palette.grey[300],
        },
      }}
    >
      {isLoading ? (
        <LoadingState />
      ) : searchQuery.length === 0 ? (
        <EmptyQuery />
      ) : !hasResults ? (
        <NoResults searchQuery={searchQuery} />
      ) : (
        <>
          <ProfileResults profiles={profiles} onClose={onClose} />
          {profiles.length > 0 && posts.length > 0 && <Divider sx={{ opacity: 0.4 }} />}
          <PostResults posts={posts} onClose={onClose} />
          <Box
            sx={{
              p: 1.5,
              textAlign: "center",
              backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.05),
              borderTop: "1px solid",
              borderTopColor: (theme) => alpha(theme.palette.divider, 0.5),
              cursor: "pointer",
              "&:hover": {
                backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.1),
              },
            }}
          >
            <Link
              href={`/search?q=${encodeURIComponent(searchQuery.trim())}&sortBy=${SortByEnum.RELEVANT}&filterType=${FilterTypeEnum.ALL}`}
            >
              <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                View all results
              </Typography>
            </Link>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default SearchResultsPopup;
