"use client";
import React, { type ReactNode } from "react";
import { Grid2 as Grid, Box } from "@mui/material";
import editorMockData from "./mockDataEditor/mockdata";
import EditorRightSideBar from "./_components/editorRightSideBar/EditorRightSideBar";
import EditorLeftSideBar from "./_components/editorLeftSideBar/EditorLeftSideBar";

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
          <EditorLeftSideBar iterations={editorMockData.iterations} />
        </Grid>
        <Grid
          size={7}
          sx={{
            backgroundColor: "white",
            height: "90vh",
            display: "flex",
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
          <EditorRightSideBar accuracy={editorMockData.accuracy} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
