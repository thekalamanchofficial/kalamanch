"use client";

import React, { useMemo } from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import ErrorMessage from "~/app/_components/errorMessage/ErrorMessage";
import Loader from "~/app/_components/loader/Loader";
import ShowMessage from "~/app/_components/showMessage/ShowMessage";
import LeftSideBarForPosts from "../_components/leftSideBarForPosts/LeftSideBarForPosts";
import { PostEntityType } from "../editor/types/types";
import DraftIterationReviewFeedbackSection from "./_components/draftIterationReviewSection/DraftIterationReviewFeedbackSection";
import { ReviewFeedbackAppBar } from "./_components/reviewFeedbackAppBar/ReviewFeedbackAppBar";
import useReviewFeedbackData from "./_hooks/useReviewFeedbackData";

const Page = () => {
  const {
    iterationsSentForReview,
    hasMoreDraftIterations,
    skip,
    queryLoading,
    handleScroll,
    errorMessage,
    likedDraftIterations,
  } = useReviewFeedbackData();

  const renderUI = useMemo(() => {
    if (queryLoading && skip === 0) {
      return <Loader title="Loading feedback posts..." height="100%" width="100%" />;
    }

    if (errorMessage) {
      return <ErrorMessage message={errorMessage} />;
    }

    if (!queryLoading && iterationsSentForReview?.length === 0) {
      return (
        <ShowMessage title="No feedback posts found." style={{ height: "100%", width: "100%" }} />
      );
    }

    return (
      <>
        <Grid size={12} sx={{ height: "100%", width: "100%" }}>
          <DraftIterationReviewFeedbackSection
            draftIterations={iterationsSentForReview}
            likedDraftIterations={likedDraftIterations}
            handleScroll={handleScroll}
          />
          {queryLoading && skip > 0 && (
            <Loader height="auto" width="auto" title="Loading more feedback posts..." />
          )}
          {!queryLoading && !hasMoreDraftIterations && (
            <ShowMessage
              title="No more feedback posts found."
              style={{
                height: "auto",
                marginTop: "20px",
                padding: "8px",
                backgroundColor: "secondary.main",
              }}
            />
          )}
        </Grid>
      </>
    );
  }, [
    iterationsSentForReview,
    queryLoading,
    errorMessage,
    skip,
    hasMoreDraftIterations,
    likedDraftIterations,
    handleScroll,
  ]);

  return (
    <>
      <ReviewFeedbackAppBar
        draftIterationsSentForReview={iterationsSentForReview}
        entityType={PostEntityType.DRAFT_ITERATION_SENT_FOR_REVIEW}
      />
      <Grid
        size={2}
        sx={{
          mr: 4,
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
            lg: "flex",
          },
        }}
      >
        <LeftSideBarForPosts
          draftPosts={[]}
          draftIterationsSentForReview={iterationsSentForReview}
          entityType={PostEntityType.DRAFT_ITERATION_SENT_FOR_REVIEW}
        />
      </Grid>

      <Grid
        size={{ xs: 12, sm: 12, md: 7, lg: 7 }}
        sx={{
          backgroundColor: "white",
          height: "90vh",
          display: "flex",
        }}
      >
        <Box sx={{ height: "100%", width: "100%" }}>{renderUI}</Box>
      </Grid>
    </>
  );
};

export default Page;
