import Link from "next/link";
import {
  alpha,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

type SearchPost = {
  id: string;
  title: string;
  authorName: string;
  thumbnailUrl?: string;
};

type PostResultsProps = {
  posts: SearchPost[];
  onClose?: () => void;
};

export const PostResults = ({ posts, onClose }: PostResultsProps) => {
  if (posts.length === 0) return null;

  // Function to get the first letter of the post title for the fallback avatar
  const getAvatarFallback = (title: string) => {
    return title.charAt(0).toUpperCase();
  };

  return (
    <Box>
      <Typography
        variant="overline"
        sx={{
          px: 3,
          py: 1.5,
          display: "block",
          color: "text.secondary",
          fontSize: "0.675rem",
          letterSpacing: "0.1em",
          backgroundColor: (theme) => theme.palette.grey[50],
        }}
      >
        Posts
      </Typography>
      <List disablePadding>
        {posts.map((post) => (
          <ListItem
            key={post.id}
            component={Link}
            href={`/posts/${post.id}`}
            onClick={onClose}
            sx={{
              py: 1.5,
              px: 3,
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.15s ease-in-out",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.grey[50],
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={post.thumbnailUrl}
                alt={post.title}
                variant="rounded"
                sx={{
                  width: 48,
                  height: 48,
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                  backgroundColor: (theme) =>
                    post.thumbnailUrl ? "transparent" : alpha(theme.palette.grey[200], 0.7),
                  color: (theme) => theme.palette.text.primary,
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  borderRadius: "8px",
                }}
              >
                {!post.thumbnailUrl && getAvatarFallback(post.title)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={post.title}
              secondary={`by ${post.authorName}`}
              primaryTypographyProps={{
                variant: "body1",
                fontWeight: 500,
                color: "text.primary",
                fontSize: "0.9375rem",
              }}
              secondaryTypographyProps={{
                variant: "body2",
                color: "text.secondary",
                fontSize: "0.8125rem",
              }}
              sx={{ ml: 1 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
