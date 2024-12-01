"use client";
import { Button, Card, CardContent, Box } from "@mui/material";
import React from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PostCardFooter from "./PostCardFooter";
import PostCardContent from "./PostCardContent";
import UserNameProfile from "../UserNameProfile";
import { type PostsFeedProps } from "~/app/(with-sidebar)/myfeed/types/types";
import FollowButton from "../FollowButton";

const PostsFeed: React.FC<PostsFeedProps> = ({ articlesList }) => {
  return (
    <>
      {articlesList.map((article, index) => {
        return (
          <Card
            sx={{ width: "100%", boxShadow: "none", px: "0px" }}
            key={index}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  mb: "16px",
                }}
              >
                <UserNameProfile
                  AuthorName={article.authorName}
                  AuthorImage={article.authorImage}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FollowButton
                    authorProfileLink={article.authorProfileLink}
                    yPadding="16px"
                    xPadding="20px"
                  />
                  <Button
                    startIcon={<MoreHorizOutlinedIcon />}
                    sx={{ color: "text.secondary", minHeight: "auto" }}
                    size="small"
                  ></Button>
                </Box>
              </Box>

              <PostCardContent
                articleContent={article.articleContent}
                articleDescription={article.articleDecription}
                articleImage={article.articleImage}
                articleTags={article.articleTags}
                articleTitle={article.articleTitle}
              />

              <PostCardFooter
                likes={article.articleLikes}
                comments={article.articleComments}
                shares={article.articleShares}
                bids={article.articlesBids}
              />
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default PostsFeed;
