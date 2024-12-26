"use client";
import React, { useState, type ReactNode } from "react";
import { Grid2 as Grid, Box } from "@mui/material";
import RightSideBar from "~/app/_components/sidebar/RightSideBar";
import { MENU_ITEMS } from "~/app/(with-sidebar)/myfeed/static/menu";
import LeftSideBar from "../_components/sidebar/LeftSideBar";
import CreatePostForm from "../editor/_components/createPostForm/CreatePostForm";

const Layout = ({ children }: { children: ReactNode }) => {
  const [createPostFormOpen, setCreatePostFormOpen] = useState(false);
  const handleCreatePostFormClose = () => {
    setCreatePostFormOpen(false);
  };
  const handleCreatePostFormOpen = () => {
    setCreatePostFormOpen(true);
  };
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
          <LeftSideBar
            menuItems={MENU_ITEMS}
            createPostFormOpen={handleCreatePostFormOpen}
          />
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
          <RightSideBar />
        </Grid>
      </Grid>
      {createPostFormOpen && (
        <CreatePostForm
          open={createPostFormOpen}
          handleClose={handleCreatePostFormClose}
        />
      )}
    </Box>
  );
};

export default Layout;
