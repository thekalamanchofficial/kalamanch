import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, CircularProgress, Divider, Paper, Typography } from "@mui/material";
import { trpc } from "~/app/_trpc/client";
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
      sortBy: "relevant",
    },
    { enabled: searchQuery.length > 0 },
  );

  const { data: postsData, isLoading: isPostsLoading } = trpc.post.searchPosts.useQuery(
    {
      searchQuery,
      limit: 5,
      skip: 0,
      sortBy: "recent",
    },
    { enabled: searchQuery.length > 0 },
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" && searchQuery.length > 0) {
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        onClose?.();
      }
    },
    [searchQuery, router, onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  if (searchQuery.length === 0) return null;

  const isLoading = isProfilesLoading || isPostsLoading;
  const profiles = profilesData?.profiles ?? [];
  const postsResult = Array.isArray(postsData) ? { posts: [] } : (postsData ?? { posts: [] });
  const posts = postsResult.posts;
  const hasResults = profiles.length > 0 || posts.length > 0;

  return (
    <Paper
      elevation={4}
      sx={{
        position: "absolute",
        top: "calc(100% + 4px)",
        left: 0,
        right: 0,
        maxHeight: "400px",
        overflow: "auto",
        zIndex: 1300,
        backgroundColor: "background.paper",
        borderRadius: "8px",
        boxShadow: (theme) => `0 4px 20px ${theme.palette.grey[200]}`,
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
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
      ) : !hasResults ? (
        <NoResults searchQuery={searchQuery} />
      ) : (
        <>
          <ProfileResults profiles={profiles} onClose={onClose} />
          {profiles.length > 0 && posts.length > 0 && <Divider sx={{ opacity: 0.4 }} />}
          <PostResults posts={posts} onClose={onClose} />
        </>
      )}
    </Paper>
  );
};

export default SearchResultsPopup;
