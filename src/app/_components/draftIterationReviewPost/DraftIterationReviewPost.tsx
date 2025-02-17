"use client";

import { memo, useCallback, useState } from "react";
import { Box, Card, CardContent } from "@mui/material";
import { ReviewScreen, type IterationWithReviews } from "~/app/(with-sidebar)/myfeed/types/types";
import { useNavigateToPostEditor } from "~/app/editor/_hooks/useNavigateToPostEditor";
import { PostStatus } from "~/app/editor/types/types";
import { useUser } from "~/context/userContext";
import { useComments } from "~/hooks/useComments";
import { useLike } from "~/hooks/useLike";
import CommentSection from "../CommentSection/CommentSection";
import FollowButton from "../followButton/FollowButton";
import PostCardContent from "../postCardContent/PostCardContent";
import PostCardFooter from "../postCardFooter/PostCardFooter";
import UserNameProfile from "../userNameProfile/UserNameProfile";

type DraftIterationReviewPostProps = {
  draftIterationReviewPost: IterationWithReviews;
  userFollowing?: string[];
  isLiked: boolean;
  reviewScreen: ReviewScreen;
};

const DraftIterationReviewPost = memo<DraftIterationReviewPostProps>(
  ({ draftIterationReviewPost, userFollowing, isLiked, reviewScreen }) => {
    const { user } = useUser();
    const userEmail = user?.email;
    const [isCommentOpen, setIsCommentOpen] = useState(false);

    const { hasLiked, likeCount, handleLike } = useLike({
      initialLikeCount: draftIterationReviewPost.likeCount,
      initialIsLiked: isLiked,
      iterationId: draftIterationReviewPost.id,
      postStatus: PostStatus.DRAFT,
      userEmail,
    });

    const { comments, handleAddComment } = useComments({
      initialComments: draftIterationReviewPost.comments ?? [],
      iterationId: draftIterationReviewPost.id,
      postStatus: PostStatus.DRAFT.toString().toUpperCase(),
      userEmail,
      userName: user?.name ?? userEmail,
      userProfileImageUrl: user?.profileImageUrl,
    });
    const { navigateToPostEditor } = useNavigateToPostEditor({});

    const toggleComments = useCallback(() => {
      setIsCommentOpen((prev) => !prev);
    }, []);

    return (
      <Card sx={{ mb: 2, boxShadow: "none" }}>
        <CardContent>
          {reviewScreen === ReviewScreen.REVIEWS_MY_FEED_SUBTAB && (
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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
            </Box>
          )}
          <PostCardContent
            articleTitle={draftIterationReviewPost.draftPost.title}
            articleContent={draftIterationReviewPost.content}
            articleId={draftIterationReviewPost.id}
            savedDate={
              reviewScreen === ReviewScreen.REVIEWS_MY_FEED_SUBTAB
                ? undefined
                : draftIterationReviewPost.updatedAt
            }
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
            handleEditPost={() => {
              navigateToPostEditor(draftIterationReviewPost.draftPost.id ?? "", PostStatus.DRAFT);
            }}
          />
          {isCommentOpen && <CommentSection comments={comments} addComment={handleAddComment} />}
        </CardContent>
      </Card>
    );
  },
);

DraftIterationReviewPost.displayName = "DraftIterationReviewPost";

export default DraftIterationReviewPost;
