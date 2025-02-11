"use client";

import React, { useMemo } from "react";
import { Grid2 as Grid } from "@mui/material";
import CustomTabs from "~/app/_components/CustomTabs/CustomTabs";
import ErrorMessage from "~/app/_components/errorMessage/ErrorMessage";
import Loader from "~/app/_components/loader/Loader";
import PostsFeed from "~/app/_components/postsFeed/PostsFeed";
import ShowMessage from "~/app/_components/showMessage/ShowMessage";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import ProfileCard from "~/app/(with-sidebar)/myprofile/_components/profileCard/ProfileCard";
import { tabs } from "~/app/(with-sidebar)/myprofile/_config/config";
import UseMyProfilePage from "~/app/(with-sidebar)/myprofile/_hooks/useMyProfile";
import { EditProfile } from "./_components/editProfile/EditProfile";

const MyProfile = () => {
  const {
    tab,
    skip,
    likedPosts,
    queryLoading,
    hasMorePosts,
    postDataWithComments,
    handleChange,
    bookmarkedPosts,
    errorMessage,
    postCount,
    followerCount,
    isEditProfileOpen,
    handleEditProfileClose,
    handleEditProfileOpen,
    callSave,
    userInfo,
    userLikedPosts,
    setPosts,
    handleImageUpdate,
  } = UseMyProfilePage();

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
          {postDataWithComments.length > 0 ? (
            <PostsFeed
              articlesList={postDataWithComments ?? []}
              likedPosts={likedPosts}
              bookmarkedPosts={bookmarkedPosts}
              setPosts={setPosts}
              isUserPublishedPostFeed={true}
            />
          ) : (
            <ShowMessage
              title="No Posts Found."
              style={{
                height: "200px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          )}
          {queryLoading && skip > 0 ? <Loader height="auto" width="auto" title="" /> : null}
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
            articlesList={userLikedPosts ?? []}
            likedPosts={likedPosts}
            bookmarkedPosts={bookmarkedPosts}
          />
          {queryLoading && skip > 0 ? <Loader height="auto" width="auto" title="" /> : null}
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
    hasMorePosts,
    userLikedPosts,
    bookmarkedPosts,
    setPosts,
  ]);
  return (
    <Grid columns={1}>
      <ProfileCard
        coverImage={userInfo.coverImageUrl ?? ""}
        bio={userInfo.bio ?? ""}
        followers={followerCount}
        posts={postCount}
        profileImage={userInfo.profileImageUrl}
        name={userInfo.name}
        handleEditProfileOpen={handleEditProfileOpen}
        onImageUpdate={handleImageUpdate}
      />
      <CustomTabs tabs={tabs} activeTab={tab} onTabChange={handleChange} />
      {renderUI}
      {isEditProfileOpen && (
        <EditProfile
          open={isEditProfileOpen}
          handleClose={handleEditProfileClose}
          profileData={userInfo}
          handleProfileSave={callSave}
        />
      )}
    </Grid>
  );
};

export default MyProfile;
