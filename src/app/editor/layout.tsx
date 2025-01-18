"use client";
import React, { type ReactElement } from "react";
import { Grid2 as Grid, Box } from "@mui/material";
import EditorRightSideBar from "./_components/editorRightSideBar/EditorRightSideBar";
import editorMockData from "./mockDataEditor/mockdata";

const Layout = ({ children }: { children: ReactElement }) => {
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
          {children}
        
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
