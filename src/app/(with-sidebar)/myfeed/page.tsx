"use client";

import { useMemo } from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import CustomTabs from "~/app/_components/CustomTabs/CustomTabs";
import DraftIterationReviewFeed from "~/app/_components/draftIterationReviewFeed/DraftIterationReviewFeed";
import ErrorMessage from "~/app/_components/errorMessage/ErrorMessage";
import Loader from "~/app/_components/loader/Loader";
import PostsFeed from "~/app/_components/postsFeed/PostsFeed";
import ShowMessage from "~/app/_components/showMessage/ShowMessage";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { tabs } from "./_config/config";
import useReviewsData from "./_hooks/useDraftsToReviewData";
import useMyFeedPage from "./_hooks/useMyFeedPage";
import useMyFeedTabs from "./_hooks/useMyFeedTabs";

const MyFeed = () => {
  const { activeTab, handleTabChange } = useMyFeedTabs();
  const {
    skip,
    likedPosts,
    bookmarkedPosts,
    queryLoading,
    hasMorePosts,
    postDataWithComments,
    errorMessage,
  } = useMyFeedPage();

  const {
    iterationsToReview,
    hasMoreDraftIterations,
    skip: draftIterationsSkip,
    errorMessage: draftIterationsErrorMessage,
    likedDraftIterations,
    queryLoading: draftIterationsQueryLoading,
  } = useReviewsData({ activeTab });

  const renderUI = useMemo(() => {
    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[0]?.value && queryLoading && skip === 0) {
      return <Loader title="Loading Posts..." height="100%" width="100%" />;
    }
    if (
      activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[1]?.value &&
      draftIterationsQueryLoading &&
      draftIterationsSkip === 0
    ) {
      return <Loader title="Loading Posts for Review..." height="100%" width="100%" />;
    }

    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[0]?.value && errorMessage) {
      return <ErrorMessage message={errorMessage} />;
    }
    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[1]?.value && draftIterationsErrorMessage) {
      return <ErrorMessage message={draftIterationsErrorMessage} />;
    }

    if (
      activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[0]?.value &&
      postDataWithComments?.length === 0
    ) {
      return <ShowMessage title="No Posts Found." style={{ height: "100%", width: "100%" }} />;
    }

    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[0]?.value) {
      return (
        <>
          <PostsFeed
            articlesList={postDataWithComments}
            likedPosts={likedPosts}
            bookmarkedPosts={bookmarkedPosts}
          />
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
    if (
      activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[1]?.value &&
      iterationsToReview?.length === 0
    ) {
      return (
        <ShowMessage title="No Posts Found For Review." style={{ height: "100%", width: "100%" }} />
      );
    }

    if (activeTab === STATIC_TEXTS.MY_FEED_PAGE.TABS[1]?.value) {
      return (
        <>
          <DraftIterationReviewFeed
            draftIterations={iterationsToReview}
            likedDraftIterations={likedDraftIterations}
          />
          {draftIterationsQueryLoading && draftIterationsSkip > 0 && (
            <Loader height="auto" width="auto" title="Loading Posts for Review..." />
          )}
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
  }, [
    errorMessage,
    queryLoading,
    skip,
    activeTab,
    postDataWithComments,
    hasMorePosts,
    likedPosts,
    bookmarkedPosts,
    iterationsToReview,
    likedDraftIterations,
    draftIterationsQueryLoading,
    draftIterationsErrorMessage,
    hasMoreDraftIterations,
    draftIterationsSkip,
  ]);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          width: "100%",
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
          width: "100%",
          minHeight: "calc(100vh - 100px)",
          scrollbarWidth: "none",
          mt: 1,
          pl: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {renderUI}
      </Grid>
    </Box>
  );
};

export default MyFeed;
