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
import { trpc } from "~/server/client";
const MyFeed = () => {
  const {
    tab,
    skip,
    likedPosts,
    queryLoading,
    hasMorePosts,
    postDataWithComments,
    handleLikeButton,
    handleChange,
    addComment,
    errorMessage,
  } = useMyFeedPage();
  const mutation = trpc.post.addPost.useMutation();

  const renderUI = useMemo(() => {
    if (errorMessage) {
      return <ErrorMessage message={errorMessage} />;
    }
    if (queryLoading && skip === 0) {
      return <Loader title="Loading Posts..." height="100%" width="100%" />;
    }

    if (tab === STATIC_TEXTS.MY_FEED_PAGE.TABS[0]?.value) {
      return (
        <>
          <PostsFeed
            articlesList={postDataWithComments ?? []}
            likedPosts={likedPosts}
            handleLikeButton={handleLikeButton}
            addComment={addComment}
          />
          {queryLoading && skip > 0 ? (
            <Loader height="auto" width="auto" title="" />
          ) : null}
          {!queryLoading && !hasMorePosts ? (
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
          ) : null}
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
    likedPosts,
    handleLikeButton,
    addComment,
    hasMorePosts,
  ]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
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
        <CustomTabs tabs={tabs} activeTab={tab} onTabChange={handleChange} />
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
