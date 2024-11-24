"use client";
import { Button, Card, CardContent, Box } from "@mui/material";
import React from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PostCardFooter from "./PostCardFooter";
import PostCardContent from "./PostCardContent";
import UserNameProfile from "./UserNameProfile";
import { type PostsFeedProps } from "~/app/myfeed/types/types";

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
                  AuthorProfileLink={article.authorProfileLink}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "secondary.main",
                      color: "primary.main",
                      minHeight: "auto",
                      height: "40px",
                      padding: "2px 10px ",
                      margin: "3px 5px ",
                      fontSize: "15px",
                    }}
                  >
                    Follow
                  </Button>
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
