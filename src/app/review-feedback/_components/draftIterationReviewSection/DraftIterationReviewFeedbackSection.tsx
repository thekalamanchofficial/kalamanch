"use client";
import React, { Fragment, useEffect, useRef, useCallback } from "react";
import {Box, Divider } from "@mui/material";
import { type IterationWithReviews, ReviewScreen } from "~/app/(with-sidebar)/myfeed/types/types";
import { useSelectedDraftIteration } from "~/app/review-feedback/_contexts/SelectedDraftIterationContext";
import DraftIterationReviewPost from "~/app/_components/draftIterationReviewPost/DraftIterationReviewPost";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "~/server/client";

type DraftIterationReviewFeedbackSectionProps = {
  draftIterations: IterationWithReviews[];
  likedDraftIterations: string[];
  handleScroll?: () => void;
};

export default function DraftIterationReviewFeedbackSection({
    draftIterations,likedDraftIterations,handleScroll
}: DraftIterationReviewFeedbackSectionProps) {
  const {setSelectedDraftIterationId,selectedDraftIterationIdInLeftSideBar,setSelectedDraftIterationIdInLeftSideBar} = useSelectedDraftIteration();
  const postRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());

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


  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const postId = entry.target.getAttribute("data-post-id");
          if (postId) {
            setSelectedDraftIterationId(postId);
            break; 
          }
        }
      }
    },
    [setSelectedDraftIterationId]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, 
      rootMargin: "0px",
      threshold: 0.9,
    });

    postRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [draftIterations, handleIntersection]);


  useEffect(() => {
    const selectedDraftIterationRef = postRefs.current.get(selectedDraftIterationIdInLeftSideBar ?? "");
    if (selectedDraftIterationRef) {
        selectedDraftIterationRef.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSelectedDraftIterationId(selectedDraftIterationIdInLeftSideBar)
  }, [selectedDraftIterationIdInLeftSideBar]);

  useEffect(() => {
    setSelectedDraftIterationId(draftIterations[0]?.id ?? "");
    setSelectedDraftIterationIdInLeftSideBar(draftIterations[0]?.id ?? "")
  }, [draftIterations]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
      onScroll={handleScroll}
    >
      {draftIterations.map((draftIteration) => (
        <div
          key={draftIteration.id}
          ref={(el) => {
            postRefs.current.set(draftIteration.id ?? "", el);
          }}
          data-post-id={draftIteration.id}
        >
        <Fragment key={draftIteration.id}>
          <DraftIterationReviewPost
            draftIterationReviewPost={draftIteration}
            userFollowing={userFollowing}
            isLiked={likedDraftIterations.includes(draftIteration.id)}
            reviewScreen={ReviewScreen.REVIEW_FEEDBACK_SCREEN}
          />
          <Divider sx={{ my: 2 }} />
        </Fragment>
        </div>
      ))}

    </Box>
  );
}