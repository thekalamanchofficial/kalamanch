"use client";
import React, { type ReactElement } from "react";
import { Grid2 as Grid, Box } from "@mui/material";
import { SelectedDraftPostProvider } from "./_contexts/SelectedDraftPostContext";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <SelectedDraftPostProvider>
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
        </Grid>
      </Box>
    </SelectedDraftPostProvider>
  );
};

export default Layout;
