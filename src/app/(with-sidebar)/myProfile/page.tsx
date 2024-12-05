import { Grid2 as Grid } from "@mui/material";
import React from "react";
import ProfileCard from "~/app/_components/myProfile/profileCard/ProfileCard";

const MyProfile = () => {
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
    </Grid>
  );
};

export default MyProfile;
