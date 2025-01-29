"use client";
import React, { useMemo } from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import { PostEntityType } from "../editor/types/types";
import LeftSideBarForPosts from "../_components/leftSideBarForPosts/LeftSideBarForPosts";
import DraftIterationReviewFeedbackSection from "./_components/draftIterationReviewSection/DraftIterationReviewFeedbackSection";
import useReviewFeedbackData from "./_hooks/useReviewFeedbackData";
import Loader from "~/app/_components/loader/Loader";
import ShowMessage from "~/app/_components/showMessage/ShowMessage";
import ErrorMessage from "~/app/_components/errorMessage/ErrorMessage";

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
      return <Loader title="Loading Draft Posts ..." height="100%" width="100%" />;
    }

    if (errorMessage) {
      return <ErrorMessage message={errorMessage} />;
    }

    if (!queryLoading && iterationsSentForReview?.length === 0) {
      return <ShowMessage title="No Draft Posts Found." style={{ height: "100%", width: "100%" }} />;
    }

    return (
      <>
        <Grid size={12} sx={{ height: "100%", width: "100%" }}>
            <DraftIterationReviewFeedbackSection
              draftIterations={iterationsSentForReview}
              likedDraftIterations={likedDraftIterations}
              handleScroll={handleScroll}
            />
            {queryLoading && skip > 0 && <Loader height="auto" width="auto" title="Loading More Draft Posts ..." />}
            {!queryLoading && !hasMoreDraftIterations && (
            <ShowMessage
              title="No More Draft Posts Found."
              style={{
                height: "auto",
                width: "100%",
                marginTop: "20px",
                padding: "8px",
                backgroundColor: "secondary.main",
              }}
            />
        )}
        </Grid>
      </>
    );
  }, [iterationsSentForReview, queryLoading, errorMessage, skip, hasMoreDraftIterations, likedDraftIterations,handleScroll]);

  return (
    <>
      <Grid
        size={2}
        sx={{
          mr: 4,
        }}
      >
        <LeftSideBarForPosts
          draftPosts={[]}
          publishedPosts={[]}
          draftIterationsSentForReview={iterationsSentForReview}
          entityType={PostEntityType.DRAFT_ITERATION_SENT_FOR_REVIEW}
        />
      </Grid>

      <Grid
        size={7}
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
