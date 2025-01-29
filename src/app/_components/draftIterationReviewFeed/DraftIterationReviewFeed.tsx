"use client";
import { type IterationWithReviews, ReviewScreen } from "~/app/(with-sidebar)/myfeed/types/types";
import { Fragment, memo } from "react";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "~/server/client";
import { Divider } from "@mui/material";
import DraftIterationReviewPost from "../draftIterationReviewPost/DraftIterationReviewPost";
type DraftIterationReviewFeedProps = {
  draftIterations: IterationWithReviews[];
  likedDraftIterations: string[];
}

const DraftIterationReviewFeed = memo<DraftIterationReviewFeedProps>(({ draftIterations, likedDraftIterations }) => {
  const { user } = useClerk();
  const userEmail = user?.primaryEmailAddress?.emailAddress ?? "";

  const { data: userFollowing } = trpc.user.getUserFollowings.useQuery(
    {
      userEmail,
    },
    {
      enabled: Boolean(userEmail),
    },
  );

  return (
    <>
      {draftIterations.map((iteration) => (
        <Fragment key={iteration.id}>
          <DraftIterationReviewPost
            draftIterationReviewPost={iteration}
            userFollowing={userFollowing}
            isLiked={likedDraftIterations?.includes(iteration.id) ?? false}
            reviewScreen={ReviewScreen.REVIEWS_MY_FEED_SUBTAB}
          />
          <Divider sx={{ my: 2 }} />
        </Fragment>
      ))}
    </>
  );
});

DraftIterationReviewFeed.displayName = "DraftIterationReviewFeed";

export default DraftIterationReviewFeed;
