"use client";
import { Button, Card, CardContent, Box, Divider } from "@mui/material";
import React, { useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { type PostsFeedProps } from "~/app/(with-sidebar)/myfeed/types/types";
import UserNameProfile from "../userNameProfile/UserNameProfile";
import PostCardContent from "../postCardContent/PostCardContent";
import PostCardFooter from "../postCardFooter/PostCardFooter";
import FollowButton from "../followButton/FollowButton";
import Link from "next/link";
import CommentSection from "../CommentSection/CommentSection";

const PostsFeed: React.FC<PostsFeedProps> = ({
  articlesList,
  likedPosts,
  handleLikeButton,
  addCommment,
}) => {
  const [toggleComment, setToggleComment] = useState<Record<string, boolean>>(
    {},
  );

  const openCommentBox = (postId: string) => {
    setToggleComment((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleAddComment = async (id: string, comment: string) => {
    await addCommment(id, comment);
  };

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
                openCommentBox={() => openCommentBox(article.id)}
              />
              {toggleComment[article.id] && (
                <CommentSection
                  comments={article.comments}
                  addComment={(comment: string) =>
                    handleAddComment(article.id, comment)
                  }
                />
              )}
            </CardContent>
            <Divider />
          </Card>
        );
      })}
    </>
  );
};

export default PostsFeed;
