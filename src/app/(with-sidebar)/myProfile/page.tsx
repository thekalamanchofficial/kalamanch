"use client";
import { Grid2 as Grid } from "@mui/material";
import React from "react";
import CustomTabs from "~/app/_components/CustomTabs/CustomTabs";
import ProfileCard from "~/app/_components/myProfile/profileCard/ProfileCard";
import { MyProfileTabsEnum } from "./types/types";
import { tabs } from "./_config/config";
import PostsFeed from "~/app/_components/postsFeed/PostsFeed";
import mockData from "./mocks/myProfileMock";

const MyProfile = () => {
  const [activeTab, setActiveTab] = React.useState(MyProfileTabsEnum.MY_POSTS);

  const handleTabChange = (newTab: MyProfileTabsEnum) => {
    setActiveTab(newTab);
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
    </Grid>
  );
};

export default MyProfile;
