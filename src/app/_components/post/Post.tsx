"use client";
import { Card, CardContent, Box } from "@mui/material";
import { memo, useState, useCallback } from "react";
import { type Post as PostType } from "~/app/(with-sidebar)/myfeed/types/types";
import UserNameProfile from "../userNameProfile/UserNameProfile";
import PostCardContent from "../postCardContent/PostCardContent";
import PostCardFooter from "../postCardFooter/PostCardFooter";
import FollowButton from "../followButton/FollowButton";
import CommentSection from "../CommentSection/CommentSection";
import { useClerk } from "@clerk/nextjs";
import { useLike } from "~/hooks/useLike";
import { useComments } from "~/hooks/useComments";
import { PostStatus } from "~/app/editor/types/types";
import { useBookmark } from "~/hooks/useBookmark";

interface PostProps {
  post: PostType;
  userFollowing?: string[];
  isLiked: boolean;
  isBookmarked: boolean;
}

const Post = memo<PostProps>(({ post, userFollowing, isLiked, isBookmarked }) => {
  const { user } = useClerk();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const { hasLiked, likeCount, handleLike } = useLike({
    initialLikeCount: post.likeCount,
    initialIsLiked: isLiked,
    postId: post.id,
    postStatus: PostStatus.PUBLISHED,
    userEmail
  });

  const { hasBookmarked, handleBookmark } = useBookmark({
    initialIsBookmarked: isBookmarked,
    postId: post.id,
    userEmail
  });

  const { comments, handleAddComment } = useComments({
    initialComments: post.comments ?? [],
    postId: post.id,
    postStatus: PostStatus.PUBLISHED.toString().toUpperCase(),
    userEmail,
    userName: user?.fullName ?? userEmail,
    userProfileImageUrl: user?.imageUrl
  });

  const toggleComments = useCallback(() => {
    setIsCommentOpen(prev => !prev);
  }, []);

  return (
    <Card sx={{ mb: 2, boxShadow: "none" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <UserNameProfile
            AuthorName={post.authorName}
            AuthorImage={post.authorProfileImageUrl}
          />
          {userEmail !== post.authorId && (
            <FollowButton
              authorProfileLink={post.authorId}
              isFollowing={userFollowing?.includes(post.authorId)}
            />
          )}
        </Box>
        <PostCardContent
          articleTitle={post.postDetails.title}
          articleContent={post.content}
          articleTags={post.postDetails.tags}
          articleThumbnailUrl={post.postDetails.thumbnailDetails.url}
          articleId={post.id}
          articleDescription={post.postDetails.thumbnailDetails.content ?? ""}
        />
        <PostCardFooter
          likes={likeCount}
          comments={comments}
          bids={post.bids ?? []}
          isLiked={hasLiked}
          isBookmarked={hasBookmarked}
          handleLikeButton={handleLike}
          openCommentBox={toggleComments}
          postId={post.id}
          showLikes={true}
          showComments={true}
          showBids={true}
          showBookmark={true}
          showShare={true}
          handleBookmark={handleBookmark}
        />
        {isCommentOpen && (
          <CommentSection
            comments={comments}
            addComment={handleAddComment}
          />
        )}
      </CardContent>
    </Card>
  );
});

Post.displayName = "Post";

export default Post;