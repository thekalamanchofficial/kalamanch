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
import { trpc } from "~/server/client";
import { useClerk } from "@clerk/nextjs";

const PostsFeed: React.FC<PostsFeedProps> = ({
  articlesList,
  likedPosts,
  handleLikeButton,
  addComment,
}) => {
  const [toggleComment, setToggleComment] = useState<Record<string, boolean>>(
    {},
  );

  const { user } = useClerk();

  const openCommentBox = (postId: string) => {
    setToggleComment((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleAddComment = async (
    id: string,
    comment: string,
    parent: string,
  ) => {
    await addComment(id, comment, parent);
  };

  const userMutation = trpc.user;

  const { data: userFollowing } = userMutation.getUserFollowings.useQuery({
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });
  

  return (
    <>
      {articlesList.map((article, index) => {
        const isFollowing = userFollowing?.includes(article.authorId);
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
                    AuthorImage={article.authorProfileImageUrl}
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
                    authorProfileLink={article.authorId}
                    style={{
                      padding: "16px 20px",
                    }}
                    isFollowing={isFollowing}
                  />
                  <Button
                    sx={{ color: "text.secondary", minHeight: "auto" }}
                    size="small"
                  >
                    <MoreHorizOutlinedIcon />
                  </Button>
                </Box>
              </Box>

              <PostCardContent
                articleContent={article.content}
                articleDescription={article.postDetails.thumbnailDetails.content ?? ""}
                articleImage={article.postDetails.thumbnailDetails.url}
                articleTags={article.postDetails.tags}
                articleId={article.id}
                articleTitle={article.postDetails.title}
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
                  comments={article.comments ?? []}
                  addComment={(comment: string, parent: string) =>
                    handleAddComment(article.id, comment, parent)
                  }
                />
                // <CommentSection />
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
