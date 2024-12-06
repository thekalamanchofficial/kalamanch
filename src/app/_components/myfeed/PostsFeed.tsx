"use client";
import { Button, Card, CardContent, Box } from "@mui/material";
import React from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PostCardFooter from "./PostCardFooter";
import PostCardContent from "./PostCardContent";
import UserNameProfile from "../UserNameProfile";
import { type PostsFeedProps } from "~/app/(with-sidebar)/myfeed/types/types";
import FollowButton from "../FollowButton";
import Link from "next/link";

const PostsFeed: React.FC<PostsFeedProps> = ({
  articlesList,
  likedPosts,
  handleLikeButton,
}) => {
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
                <Link
                  href={`${process.env.NEXT_PUBLIC_APP_URL}/user/${article.authorId}`}
                  style={{ textDecoration: "none" }}
                >
                  <UserNameProfile
                    AuthorName={article.authorName}
                    AuthorImage={article.authorProfile}
                  />
                </Link>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FollowButton
                    authorProfileLink={`localhost:3000/author/${article.authorId}`}
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
                articleContent={article.content}
                articleDescription={article.media.thumbnail_content}
                articleImage={article.media.thumbnail_picture}
                articleTags={article.tags}
                articleId={article.id}
                articleTitle={article.title}
              />
              <PostCardFooter
                likes={article.likeCount ?? 0}
                comments={article.comments ?? []}
                bids={article.bids ?? []}
                isLiked={likedPosts.includes(article.id)}
                handleLikeButton={() => handleLikeButton(article.id)}
              />
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default PostsFeed;
