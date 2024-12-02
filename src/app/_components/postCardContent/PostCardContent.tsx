import { Box, CardMedia, Chip, Typography } from "@mui/material";
import React from "react";
import { type PostCardContentProps } from "~/app/(with-sidebar)/myfeed/types/types";
import myfeedConfig from "~/app/(with-sidebar)/myfeed/_config/config";
import SeeMoreButton from "../seeMoreButton/SeeMoreButton";

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
          {articleContent.length > myfeedConfig.ARTICLE_READ_MORE_LENGTH ? (
            <>
              {`${articleContent.slice(0, myfeedConfig.ARTICLE_READ_MORE_LENGTH)} ...`}
              <SeeMoreButton />
            </>
          ) : (
            articleContent
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
            {articleDescription.length >
            myfeedConfig.SUMMARY_READ_MORE_LENGTH ? (
              <>
                {`${articleDescription.slice(0, myfeedConfig.SUMMARY_READ_MORE_LENGTH)} ...`}
                <SeeMoreButton />
              </>
            ) : (
              articleDescription
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
