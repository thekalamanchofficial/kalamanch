import * as React from "react";
import { Grid2 as Grid, Box } from "@mui/material";

import PostsFeed from "../_components/userFeed/PostsFeed";
import LeftSideBar from "../_components/userFeed/LeftSideBar";
import RightSideBar from "../_components/userFeed/RightSideBar";

const UserFeedPage = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#fafafa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        sx={{
          height: "100vh",
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          px: 10,
          py: 6,
        }}
      >
        <Grid
          size={2}
          sx={{
            height: "90vh",
          }}
        >
          <LeftSideBar />
        </Grid>
        <Grid
          size={7}
          sx={{
            height: "90vh",
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <PostsFeed />
        </Grid>
        <Grid
          size={2}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            ml: 4,
          }}
        >
          <RightSideBar />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserFeedPage;
