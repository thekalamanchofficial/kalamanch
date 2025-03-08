"use client";

import { memo, useMemo } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import {
  alpha,
  Box,
  Chip,
  Divider,
  Fade,
  Grid2 as Grid,
  Grow,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Post from "~/app/_components/post/Post";
import type { Post as PostType } from "~/app/(with-sidebar)/myfeed/types/types";

type PostsListProps = {
  posts: PostType[];
};

const PostsList = memo(({ posts }: PostsListProps) => {
  const theme = useTheme();

  const postCount = useMemo(() => posts.length, [posts.length]);

  return (
    <Grow in timeout={500} appear={true}>
      <Grid size={12}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2, md: 3 },
            borderRadius: { xs: 2, sm: 3 },
            backgroundColor: "background.paper",
            boxShadow: `0 2px 12px ${alpha(theme.palette.divider, 0.1)}`,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              pb: 2,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            }}
          >
            <ArticleIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
              Posts
            </Typography>
            <Chip
              label={`${postCount} found`}
              size="small"
              sx={{ ml: 2, backgroundColor: alpha(theme.palette.primary.main, 0.1) }}
            />
          </Box>

          <Stack spacing={3}>
            {posts.map((post, index) => (
              <PostItem
                key={post.id}
                post={post}
                index={index}
                isLast={index === posts.length - 1}
              />
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grow>
  );
});

PostsList.displayName = "PostsList";

type PostItemProps = {
  post: PostType;
  index: number;
  isLast: boolean;
};

const PostItem = memo(({ post, index, isLast }: PostItemProps) => {
  const transitionDelay = useMemo(() => `${Math.min(index * 50, 300)}ms`, [index]);

  return (
    <Fade in timeout={200} style={{ transitionDelay }}>
      <Box>
        <Post post={post} isLiked={false} isBookmarked={false} />
        {!isLast && <Divider sx={{ mt: 3, opacity: 0.6 }} />}
      </Box>
    </Fade>
  );
});

PostItem.displayName = "PostItem";

export default PostsList;
