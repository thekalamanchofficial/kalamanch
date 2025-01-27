"use client";
import { Card, CardContent, Box } from "@mui/material";
import { memo, useState, useCallback } from "react";
import { IterationWithReviews, ReviewScreen, type Post as PostType } from "~/app/(with-sidebar)/myfeed/types/types";
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
    postStatus: PostStatus.DRAFT.toString().toUpperCase(),
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
            AuthorName={draftIterationReviewPost.DraftPost.authorName}
            AuthorImage={draftIterationReviewPost.DraftPost.authorProfileImageUrl}
          />
          {user?.id !== draftIterationReviewPost.DraftPost.authorId && (
            <FollowButton
              authorProfileLink={draftIterationReviewPost.DraftPost.authorId}
              isFollowing={userFollowing?.includes(draftIterationReviewPost.DraftPost.authorId)}
            />
          )}
        </Box>}
        <PostCardContent
          articleTitle={draftIterationReviewPost.DraftPost.postDetails.title}
          articleContent={draftIterationReviewPost.content}
          articleTags={draftIterationReviewPost.DraftPost.postDetails.tags}
          articleImage={draftIterationReviewPost.DraftPost.postDetails.thumbnailDetails.url}
          articleId={draftIterationReviewPost.id}
          articleDescription={draftIterationReviewPost.DraftPost.postDetails.thumbnailDetails.content ?? ""}
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
          handleEditPost={()=> {navigateToPostEditor(draftIterationReviewPost.DraftPost.id ?? "",PostStatus.DRAFT)}}

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