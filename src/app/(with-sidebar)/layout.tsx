"use client";
import React, { type ReactNode } from "react";
import { Grid2 as Grid, Box } from "@mui/material";
import RightSideBar from "~/app/_components/sidebar/RightSideBar";
import staticData from "~/app/(with-sidebar)/myfeed/myfeedMock/myfeedMock";
import { MENU_ITEMS } from "~/app/(with-sidebar)/myfeed/static/menu";
import LeftSideBar from "../_components/sidebar/LeftSideBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#fafafa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: "1572px",
          justifyContent: "center",
          px: 1,
          py: "40px",
        }}
      >
        <Grid
          size={2}
          sx={{
            mr: 4,
          }}
        >
          <LeftSideBar menuItems={MENU_ITEMS} />
        </Grid>
        <Grid
          size={7}
          sx={{
            pb: "50px",
            backgroundColor: "white",
          }}
        >
          {children}
        </Grid>
        <Grid
          size={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            ml: 4,
            gap: "12px",
          }}
        >
          <RightSideBar
            authorToFollow={staticData.authorToFollow}
            featuredArticles={staticData.featuredArticles}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
