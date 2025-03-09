"use client";

import React, { type ReactElement } from "react";
import { Box, Grid2 as Grid } from "@mui/material";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          pt: 4,
          pb: 0,
        }}
      >
        {children}
      </Grid>
    </Box>
  );
};

export default Layout;
