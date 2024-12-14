"use client";
import React, { type ReactNode } from "react";
import { Grid2 as Grid, Box } from "@mui/material";
import RightSideBar from "~/app/_components/sidebar/RightSideBar";
import { MENU_ITEMS } from "~/app/(with-sidebar)/myfeed/static/menu";
import LeftSideBar from "../_components/sidebar/LeftSideBar";
import { trpc } from "~/server/client";

const Layout = ({ children }: { children: ReactNode }) => {
  const featuredAuthorMutation = trpc.featuredAuthor;
  const featuredPostMutation = trpc.featuredPost;

  const { data: featuredAuthorData, isLoading: featuredAuthorLoading } =
    featuredAuthorMutation.getFeaturedAuthors.useQuery({
      limit: 5,
      skip: 0,
    });

  const { data: featuredPostData, isLoading: featuredPostLoading } =
    featuredPostMutation.getFeaturedPosts.useQuery({
      limit: 5,
      skip: 0,
    });

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
            featuredPost={featuredPostData ?? []}
            featuredAuthor={featuredAuthorData ?? []}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
