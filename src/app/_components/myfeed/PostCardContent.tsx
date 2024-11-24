import { Box, Button, CardMedia, Chip, Typography } from "@mui/material";
import React from "react";
interface PostCardContentProps {
  articleTitle: string;
  articleContent: string;
  articleTags: string[];
  articleImage?: string;
  articleDescription: string;
}
const PostCardContent: React.FC<PostCardContentProps> = ({
  articleTitle,
  articleContent,
  articleTags,
  articleImage = "",
  articleDescription,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          pr: 10,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            py: "10px",
          }}
        >
          {articleTitle}
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "15px",
            marginBottom: "10px",
          }}
        >
          {articleContent.slice(0, 400)}
          {articleContent.length > 400 ? " ..." : ""}

          {articleContent.length > 400 && (
            <Button
              variant="text"
              sx={{
                minHeight: "auto",
                height: "30px",
                width: "auto",
                color: "primary.main",
                fontSize: "15px",
                ":hover": {
                  backgroundColor: "transparent",
                },
              }}
              disableTouchRipple
            >
              See more
            </Button>
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          width: "100%",
          mb: "16px",
          height: "250px",
          backgroundColor: "secondary.main",
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={
            articleImage !== "" ? articleImage : "https://picsum.photos/200"
          }
          alt="green iguana"
          sx={{
            width: "80%",
            height: "100%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            pr: 10,
            pl: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              py: "10px",
            }}
          >
            {articleTitle}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            {articleDescription.slice(0, 250)}
            {articleDescription.length > 250 ? " ..." : ""}
            {articleDescription.length > 250 && (
              <Button
                variant="text"
                sx={{
                  minHeight: "auto",
                  width: "auto",
                  height: "10px",
                  color: "primary.main",
                  fontSize: "14px",
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                }}
                disableTouchRipple
              >
                See more
              </Button>
            )}
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
            }}
          >
            {articleTags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                variant="filled"
                sx={{
                  color: "font.secondary",
                  backgroundColor: "common.lightGray",
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PostCardContent;
