"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  Skeleton,
  Tooltip,
  Fade,
  Divider,
  Stack,
} from "@mui/material";
import { trpc } from "~/app/_trpc/client";

type FollowingListProps = {
  userId: string;
};

type User = {
  id: string;
  name: string;
  profileImageUrl: string;
  bio: string | null;
};

const FollowingList: React.FC<FollowingListProps> = ({ userId }) => {
  const theme = useTheme();
  const router = useRouter();
  const loadMoreRef = React.useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.user.getFollowing.useInfiniteQuery(
    {
      userId,
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box key={index} sx={{ p: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Skeleton variant="circular" width={48} height={48} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="40%" height={20} />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{ 
          p: 3, 
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2
        }}
      >
        <Typography color="error" variant="h6">
          Error loading following
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please try refreshing the page
        </Typography>
      </Box>
    );
  }

  const following = data?.pages.flatMap((page) => page.items) ?? [];

  if (!following.length) {
    return (
      <Box 
        sx={{ 
          p: 3, 
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2
        }}
      >
        <Typography variant="h6" color="text.primary">
          Not following anyone yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          When you follow someone, they&apos;ll appear here
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%" }}>
      {following.map((user: User, index: number) => (
        <Stack key={user.id} direction="column" alignItems="center">
          <ListItem disablePadding>
            <Tooltip 
              title="View profile" 
              arrow 
              TransitionComponent={Fade}
              enterDelay={200}
            >
              <ListItemButton
                onClick={() => router.push(`/profile/${user.id}`)}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  transition: "background-color 0.2s ease-in-out",
                }}
                aria-label={`View ${user.name}&apos;s profile`}
              >
                <ListItemAvatar>
                  <Avatar
                    src={user.profileImageUrl}
                    alt={user.name}
                    sx={{ 
                      width: 48, 
                      height: 48,
                      border: `2px solid ${theme.palette.background.paper}`,
                      boxShadow: theme.shadows[1],
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{ 
                        fontWeight: 500, 
                        color: theme.palette.text.primary,
                        transition: "color 0.2s ease-in-out",
                      }}
                    >
                      {user.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: theme.palette.text.secondary,
                        transition: "color 0.2s ease-in-out",
                      }}
                      noWrap
                    >
                      {user.bio ?? "No bio"}
                    </Typography>
                  }
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
          {index < following.length - 1 && (
            <Divider 
              component="li" 
              sx={{ 
                my: 1,
                ml: 0,
                width: "95%",
              }} 
            />
          )}
        </Stack>
      ))}
      <Box ref={loadMoreRef}>
        <ListItem sx={{ justifyContent: "center", py: 2 }}>
          {isFetchingNextPage ? (
            <CircularProgress size={24} />
          ) : hasNextPage ? (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              <CircularProgress size={16} />
              Loading more...
            </Typography>
          ) : (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              No more following
            </Typography>
          )}
        </ListItem>
      </Box>
    </List>
  );
};

export default FollowingList; 