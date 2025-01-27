"use client";
import { Box, Grid2 as Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import PostsFeed from "~/app/_components/postsFeed/PostsFeed";
import CustomTabs from "~/app/_components/CustomTabs/CustomTabs";
import { tabs } from "./_config/config";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import Loader from "~/app/_components/loader/Loader";
import ShowMessage from "~/app/_components/showMessage/ShowMessage";
import ErrorMessage from "~/app/_components/errorMessage/ErrorMessage";
import useMyFeedPage from "./_hooks/useMyFeedPage";
import useMyFeedTabs from "./_hooks/useMyFeedTabs";
import DraftIterationReviewFeed from "~/app/_components/draftIterationReviewFeed/DraftIterationReviewFeed";
import useReviewsData from "./_hooks/useDraftsToReviewData";

const MyFeed = () => {

  const {activeTab,handleTabChange} = useMyFeedTabs();
  const {
    skip,
    likedPosts,
    queryLoading,
    hasMorePosts,
    postDataWithComments,
    errorMessage,
  } = useMyFeedPage();

  const { iterationsToReview,hasMoreDraftIterations,skip: draftIterationsSkip,errorMessage: draftIterationsErrorMessage,likedDraftIterations,queryLoading: draftIterationsQueryLoading } = useReviewsData({activeTab});

  const renderUI = useMemo(() => {
    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[0]?.value && queryLoading && skip === 0) {
      return <Loader title="Loading Posts..." height="100%" width="100%" />;
    }
    if ( activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[1]?.value && draftIterationsQueryLoading && draftIterationsSkip === 0) {
      return <Loader title="Loading Posts for Review..." height="100%" width="100%" />;
    }

    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[0]?.value && errorMessage) {
      return <ErrorMessage message={errorMessage} />;
    }
    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[1]?.value && draftIterationsErrorMessage) {
      return <ErrorMessage message={draftIterationsErrorMessage} />;
    }

    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[0]?.value && postDataWithComments?.length === 0) {
      return <ShowMessage title="No Posts Found." style={{ height: "100%", width: "100%" }} />;
    }

    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[0]?.value) {
      return (
        <>
          <PostsFeed articlesList={postDataWithComments} likedPosts={likedPosts} />
          {queryLoading && skip > 0 && <Loader height="auto" width="auto" title="" />}
          {!queryLoading && !hasMorePosts && (
            <ShowMessage
              title="No More Posts Found."
              style={{
                height: "auto",
                width: "100%",
                marginTop: "20px",
                padding: "8px",
                backgroundColor: "secondary.main",
              }}
            />
          )}
        </>
      );
    }
    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[1]?.value && iterationsToReview?.length === 0) {
      return <ShowMessage title="No Posts Found For Review." style={{ height: "100%", width: "100%" }} />;
    }

    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[1]?.value) {
      return (
        <>
          <DraftIterationReviewFeed draftIterations={iterationsToReview} likedDraftIterations={likedDraftIterations} />
          {draftIterationsQueryLoading && draftIterationsSkip > 0 && <Loader height="auto" width="auto" title="Loading Posts for Review..." />}
          {!draftIterationsQueryLoading && !hasMoreDraftIterations && (
            <ShowMessage
              title="No More Posts Found."
              style={{
                height: "auto",
                width: "100%",
                marginTop: "20px",
                padding: "8px",
                backgroundColor: "secondary.main",
              }}
            />
          )}
        </>
      );
    }

    return <ShowMessage title="No Posts Found." />;
  }, [errorMessage, queryLoading, skip, activeTab, postDataWithComments, hasMorePosts, likedPosts, iterationsToReview, likedDraftIterations, draftIterationsQueryLoading, hasMoreDraftIterations, draftIterationsSkip]);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          px: "4px",
          pt: "8px",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <CustomTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </Grid>
      <Grid
        size={12}
        sx={{
          overflowY: "scroll",
          height: "100%",
          scrollbarWidth: "none",
          mt: 1,
          pl: 1,
        }}
      >
        {renderUI}
      </Grid>
    </Box>
  );
};

export default MyFeed;
