"use client";
import React, { type ReactNode } from "react";
import { Grid2 as Grid, Box } from "@mui/material";
import LeftSideBar from "~/app/_components/myfeed/LeftSideBar";
import RightSideBar from "~/app/_components/myfeed/RightSideBar";
import staticData from "~/app/(with-sidebar)/myfeed/myfeedMock/myfeedMock";
import { MENU_ITEMS } from "~/app/(with-sidebar)/myfeed/static/menu";

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
      }}
    >
      <Grid
        container
        sx={{
          height: "100vh",
          width: "100%",
          maxWidth: "1572px",
          justifyContent: "center",
          alignItems: "center",
          px: 1,
          py: "4px",
        }}
      >
        <Grid
          size={2}
          sx={{
            height: "90vh",
            borderRight: "1px solid #E0E0E0",
          }}
        >
          <LeftSideBar menuItems={MENU_ITEMS} />
        </Grid>
        <Grid
          size={7}
          sx={{
            height: "90vh",
            overflow: "hidden",
            pb: "50px",
            backgroundColor: "white",
          }}
        >
          {children}
        </Grid>
        <Grid
          size={2}
          sx={{
            height: "90vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
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
