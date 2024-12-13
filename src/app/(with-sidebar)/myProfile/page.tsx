"use client";
import { Grid2 as Grid } from "@mui/material";
import React, { useMemo } from "react";
import CustomTabs from "~/app/_components/CustomTabs/CustomTabs";
import ProfileCard from "~/app/_components/myProfile/profileCard/ProfileCard";
import { tabs } from "~/app/(with-sidebar)/myProfile/_config/config";
import PostsFeed from "~/app/_components/postsFeed/PostsFeed";
import useMyProfilePage from "~/app/(with-sidebar)/myProfile/_hook/useMyProfile";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import Loader from "~/app/_components/loader/Loader";
import ErrorMessage from "~/app/_components/errorMessage/ErrorMessage";
import ShowMessage from "~/app/_components/showMessage/ShowMessage";

const MyProfile = () => {
  const {
    userProfile,
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
  } = useMyProfilePage();

  const renderUI = useMemo(() => {
    if (errorMessage) {
      return <ErrorMessage message={errorMessage} />;
    }
    if (queryLoading && skip === 0) {
      return <Loader title="Loading Posts..." height="100%" width="100%" />;
    }

    if (tab === STATIC_TEXTS.MY_PROFILE_PAGE.TABS[0]?.value) {
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

    if (tab === STATIC_TEXTS.MY_PROFILE_PAGE.TABS[1]?.value) {
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
    <Grid columns={1}>
      <ProfileCard
        coverImage="https://picsum.photos/200"
        bio="bio"
        followers="1M"
        posts={postDataWithComments.length}
        profileImage={userProfile}
        name="kalamanch"
      />
      <CustomTabs tabs={tabs} activeTab={tab} onTabChange={handleChange} />
      {renderUI}
    </Grid>
  );
};

export default MyProfile;
