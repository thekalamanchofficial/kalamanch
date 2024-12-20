"use client";
import { Grid2 as Grid } from "@mui/material";
import React, { useMemo } from "react";
import CustomTabs from "~/app/_components/CustomTabs/CustomTabs";
import ProfileCard from "~/app/(with-sidebar)/myprofile/_components/profileCard/ProfileCard";
import { tabs } from "~/app/(with-sidebar)/myprofile/_config/config";
import PostsFeed from "~/app/_components/postsFeed/PostsFeed";
import useMyProfilePage from "~/app/(with-sidebar)/myprofile/_hook/useMyProfile";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import Loader from "~/app/_components/loader/Loader";
import ErrorMessage from "~/app/_components/errorMessage/ErrorMessage";
import ShowMessage from "~/app/_components/showMessage/ShowMessage";
import { EditProfile } from "./_components/editProfile/EditProfile";

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
    postCount,
    followerCount,
    userName,
    isEditProfileOpen,
    handleEditProfileClose,
    handleEditProfileOpen,
    interests,
    bio: userBio,
    birthdate,
    education,
    achievements,
    handleSave,
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
          {postDataWithComments.length > 0 ? (
            <PostsFeed
              articlesList={postDataWithComments ?? []}
              likedPosts={likedPosts}
              handleLikeButton={handleLikeButton}
              addComment={addComment}
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
        bio={userBio ? userBio : ""}
        followers={followerCount}
        posts={postCount}
        profileImage={userProfile}
        name={userName}
        handleEditProfileOpen={handleEditProfileOpen}
      />
      <CustomTabs tabs={tabs} activeTab={tab} onTabChange={handleChange} />
      {renderUI}
      {isEditProfileOpen && (
        <EditProfile
          open={isEditProfileOpen}
          handleClose={handleEditProfileClose}
          profileData={{
            name: userName,
            bio: userBio ? userBio : "",
            birthdate: birthdate,
            interests: interests,
            education: education,
            professionalAchievements: achievements,
          }}
          handleProfileSave={async ({
            name,
            bio,
            birthdate,
            interests,
            education,
            professionalAchievements,
          }) => {
            try {
              await handleSave({
                name,
                birthdate,
                bio: bio ?? "",
                interests: interests ?? [],
                education: education ?? [],
                achievements: professionalAchievements ?? "",
              });
              handleEditProfileClose();
            } catch (error) {
              console.error(error);
            }
          }}
        />
      )}
    </Grid>
  );
};

export default MyProfile;
