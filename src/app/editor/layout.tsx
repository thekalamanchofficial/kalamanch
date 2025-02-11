"use client";

import React, { type ReactElement } from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import { SelectedPublishedPostProvider } from "./_contexts/SelectedPublishedPostContext";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <SelectedPublishedPostProvider>
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
    </SelectedPublishedPostProvider>
  );
};

export default Layout;
