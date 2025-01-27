"use client";
import { Box, Grid2 as Grid } from "@mui/material";
import { useMemo } from "react";
import PostsFeed from "~/app/_components/postsFeed/PostsFeed";
import CustomTabs from "~/app/_components/CustomTabs/CustomTabs";
import { tabs } from "./_config/config";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import Loader from "~/app/_components/loader/Loader";
import ShowMessage from "~/app/_components/showMessage/ShowMessage";
import ErrorMessage from "~/app/_components/errorMessage/ErrorMessage";
import useMyFeedPage from "./_hooks/useMyFeedPage";

const MyFeed = () => {
  const {
    tab,
    skip,
    likedPosts,
    bookmarkedPosts,
    queryLoading,
    hasMorePosts,
    postDataWithComments,
    handleTabChange,
    errorMessage,
  } = useMyFeedPage();

  const renderUI = useMemo(() => {
    if (queryLoading && skip === 0) {
      return <Loader title="Loading Posts..." height="100%" width="100%" />;
    }

    if (errorMessage) {
      return <ErrorMessage message={errorMessage} />;
    }

    if (postDataWithComments?.length === 0) {
      return (
        <ShowMessage
          title="No Posts Found."
          style={{ height: "100%", width: "100%" }}
        />
      );
    }

    if (tab === STATIC_TEXTS.MY_FEED_PAGE.TABS[0]?.value) {
      return (
        <>
          <PostsFeed
            articlesList={postDataWithComments}
            likedPosts={likedPosts}
            bookmarkedPosts={bookmarkedPosts}
          />
          {queryLoading && skip > 0 && (
            <Loader height="auto" width="auto" title="" />
          )}
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

    if (tab === STATIC_TEXTS.MY_FEED_PAGE.TABS[1]?.value) {
      return <div style={{ padding: "10px" }}>Discover Tab</div>;
    }

    return <ShowMessage title="No Posts Found." />;
  }, [
    errorMessage,
    queryLoading,
    skip,
    tab,
    postDataWithComments,
    hasMorePosts,
    likedPosts,
    bookmarkedPosts,
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
        <CustomTabs tabs={tabs} activeTab={tab} onTabChange={handleTabChange} />
      </Grid>
      <Grid
        size={12}
        sx={{
          overflowY: "scroll",
          width: "100%",
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
