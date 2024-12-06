"use client";
import { Grid2 as Grid } from "@mui/material";
import React, { useState } from "react";
import CustomTabs from "~/app/_components/CustomTabs/CustomTabs";
import ProfileCard from "~/app/(with-sidebar)/myProfile/_components/profileCard/ProfileCard";
import { MyProfileTabsEnum } from "./types/types";
import { tabs } from "./_config/config";
import PostsFeed from "~/app/_components/postsFeed/PostsFeed";
import mockData from "./mocks/myProfileMock";
import { EditProfile } from "./_components/editProfile/EditProfile";

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState(MyProfileTabsEnum.MY_POSTS);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleTabChange = (newTab: MyProfileTabsEnum) => {
    setActiveTab(newTab);
  };

  const handleEditProfileOpen = () => {
    setIsEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false);
  };

  return (
    <Grid columns={1}>
      <ProfileCard
        coverImage="https://picsum.photos/200"
        bio="bio"
        followers="1M"
        posts="4000"
        profileImage="https://picsum.photos/200"
        name="kalamanch"
        handleEditProfileOpen={handleEditProfileOpen}
      />
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      {activeTab === MyProfileTabsEnum.MY_POSTS ? (
        <PostsFeed articlesList={mockData.articlesList} />
      ) : (
        <div>Liked Posts</div>
      )}
      <EditProfile
        open={isEditProfileOpen}
        handleClose={handleEditProfileClose}
        profileData={{
          name: "John Doe",
          headline: "Headline",
          birthdate: new Date(),
        }}
        handleProfileSave={async ({ name, headline }) => {
          await Promise.resolve();
          handleEditProfileClose();
          console.log(name, headline);
        }}
      />
    </Grid>
  );
};

export default MyProfile;
