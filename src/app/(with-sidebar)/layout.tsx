import React, { type ReactNode } from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import TopNavBar from "../_components/navigation/TopNavBar";
import LeftSideBar from "../_components/sidebar/LeftSideBar";
import RightSideBar from "../_components/sidebar/RightSideBar";
import { FeedProvider } from "./myfeed/_context/FeedContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <FeedProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <TopNavBar />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            width: "100%",
            pt: 3,
            pb: 5,
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              mx: "auto",
              px: { xs: 1, sm: 2 },
              maxWidth: {
                sm: "100%",
                lg: "1572px",
              },
              width: "100%",
            }}
            columns={{ xs: 12, sm: 12, md: 12, lg: 10 }}
          >
            <Grid
              size={{ xs: 12, md: 3, lg: 2 }}
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  height: "auto",
                  maxHeight: "calc(100vh - 100px)",
                  position: "sticky",
                  top: "84px",
                }}
              >
                <LeftSideBar />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: 2,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  minHeight: "80vh",
                }}
              >
                {children}
              </Box>
            </Grid>

            <Grid
              size={{ xs: 12, md: 3, lg: 2 }}
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <Box
                sx={{
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "4px",
                  },
                }}
              >
                <RightSideBar />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </FeedProvider>
  );
};

export default Layout;
