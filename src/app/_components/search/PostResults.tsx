import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Link from "next/link";

type SearchPost = {
  id: string;
  title: string;
  authorName: string;
};

type PostResultsProps = {
  posts: SearchPost[];
  onClose?: () => void;
};

export const PostResults = ({ posts, onClose }: PostResultsProps) => {
  if (posts.length === 0) return null;

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
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}; 