"use client";
import { Card, CardContent, Box } from "@mui/material";
import { memo, useState, useCallback } from "react";
import { type IterationWithReviews, ReviewScreen } from "~/app/(with-sidebar)/myfeed/types/types";
import UserNameProfile from "../userNameProfile/UserNameProfile";
import PostCardContent from "../postCardContent/PostCardContent";
import PostCardFooter from "../postCardFooter/PostCardFooter";
import FollowButton from "../followButton/FollowButton";
import CommentSection from "../CommentSection/CommentSection";
import { useLike } from "~/hooks/useLike";
import { useComments } from "~/hooks/useComments";
import { PostStatus } from "~/app/editor/types/types";
import { useUser } from "~/context/userContext";
import { useNavigateToPostEditor } from "~/app/editor/_hooks/useNavigateToPostEditor";

type DraftIterationReviewPostProps ={
  draftIterationReviewPost: IterationWithReviews;
  userFollowing?: string[];
  isLiked: boolean;
  reviewScreen: ReviewScreen;
}

const DraftIterationReviewPost = memo<DraftIterationReviewPostProps>(({ draftIterationReviewPost, userFollowing, isLiked,reviewScreen }) => {
  const { user } = useUser();
  const userEmail = user?.email;
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const { hasLiked, likeCount, handleLike } = useLike({
    initialLikeCount: draftIterationReviewPost.likeCount,
    initialIsLiked: isLiked,
    iterationId: draftIterationReviewPost.id,
    postStatus: PostStatus.DRAFT,
    userEmail
  });

  const { comments, handleAddComment } = useComments({
    initialComments: draftIterationReviewPost.comments ?? [],
    iterationId: draftIterationReviewPost.id,
    postStatus: PostStatus.DRAFT.toString().toUpperCase(),
    userEmail,
    userName: user?.name ?? userEmail,
    userProfileImageUrl: user?.profileImageUrl
  });
  const { navigateToPostEditor } = useNavigateToPostEditor({});

  const toggleComments = useCallback(() => {
    setIsCommentOpen(prev => !prev);
  }, []);

  return (
    <Card sx={{ mb: 2, boxShadow: "none" }}>
      <CardContent>
        {reviewScreen === ReviewScreen.REVIEWS_MY_FEED_SUBTAB && <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <UserNameProfile
            AuthorName={draftIterationReviewPost.draftPost.authorName}
            AuthorImage={draftIterationReviewPost.draftPost.authorProfileImageUrl}
          />
          {user?.id !== draftIterationReviewPost.draftPost.authorId && (
            <FollowButton
              authorProfileLink={draftIterationReviewPost.draftPost.authorId}
              isFollowing={userFollowing?.includes(draftIterationReviewPost.draftPost.authorId)}
            />
          )}
        </Box>}
        <PostCardContent
          articleTitle={draftIterationReviewPost.draftPost.postDetails.title}
          articleContent={draftIterationReviewPost.content}
          articleTags={draftIterationReviewPost.draftPost.postDetails.tags}
          articleThumbnailUrl={draftIterationReviewPost.draftPost.postDetails.thumbnailDetails.url}
          articleId={draftIterationReviewPost.id}
          articleDescription={draftIterationReviewPost.draftPost.postDetails.thumbnailDetails.content ?? ""}
          savedDate= {reviewScreen === ReviewScreen.REVIEWS_MY_FEED_SUBTAB ? undefined : draftIterationReviewPost.updatedAt}
        />
        <PostCardFooter
          likes={likeCount}
          comments={comments}
          bids={[]}
          isLiked={hasLiked}
          handleLikeButton={handleLike}
          openCommentBox={toggleComments}
          postId=""
          showLikes={true}
          showComments={true}
          showEditPost={ReviewScreen.REVIEW_FEEDBACK_SCREEN === reviewScreen}
          handleEditPost={()=> {navigateToPostEditor(draftIterationReviewPost.draftPost.id ?? "",PostStatus.DRAFT)}}
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

DraftIterationReviewPost.displayName = "DraftIterationReviewPost";

export default DraftIterationReviewPost;