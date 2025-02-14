"use client";

import React, { type ReactElement } from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import { FeedProvider } from "../(with-sidebar)/myfeed/_context/FeedContext";
import { SelectedDraftIterationProvider } from "./_contexts/SelectedDraftIterationContext";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <FeedProvider>
      <SelectedDraftIterationProvider>
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
      </SelectedDraftIterationProvider>
    </FeedProvider>
  );
};

export default Layout;
