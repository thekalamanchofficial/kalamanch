import React, { type ReactNode } from "react";
import { Grid2 as Grid, Box } from "@mui/material";
import RightSideBar from "~/app/_components/sidebar/RightSideBar";
import { MENU_ITEMS } from "~/app/(with-sidebar)/myfeed/static/menu";
import LeftSideBar from "../_components/sidebar/LeftSideBar";
import { FeedProvider } from "./myfeed/context/FeedContext";
import { AppBarMenu } from "../_components/appBarMenu/AppBarMenu";

const Layout = ({ children }: { children: ReactNode }) => {
  const displaySidebarStyle = {
    xs: "none",
    sm: "none",
    md: "flex",
    lg: "flex",
  };
  return (
    <FeedProvider>
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
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <AppBarMenu />
          <Grid
            size={2}
            sx={{
              mr: 4,
              display: displaySidebarStyle,
            }}
          >
            <LeftSideBar menuItems={MENU_ITEMS} />
          </Grid>
          <Grid
            size={{ xs: 12, sm: 12, md: 7, lg: 7 }}
            sx={{
              pb: "50px",
              backgroundColor: "white",
              marginTop: { xs: "16px", sm: "16px", md: "0px", lg: "0px" },
            }}
          >
            {children}
          </Grid>
          <Grid
            size={2}
            sx={{
              display: displaySidebarStyle,
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
      </Box>
    </FeedProvider>
  );
};

export default Layout;
