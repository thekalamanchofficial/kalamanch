import React, { useState, type ReactNode } from "react";
import {
  Grid2 as Grid,
  Box,
  type Theme,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Typography,
} from "@mui/material";
import RightSideBar from "~/app/_components/sidebar/RightSideBar";
import { MENU_ITEMS } from "~/app/(with-sidebar)/myfeed/static/menu";
import LeftSideBar from "../_components/sidebar/LeftSideBar";
import { FeedProvider } from "./myfeed/context/FeedContext";
import MenuIcon from "@mui/icons-material/Menu";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";

const Layout = ({ children }: { children: ReactNode }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  ); // Adjust based on your breakpoint
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [featuredDrawerOpen, setFeaturedDrawerOpen] = useState(false);

  const toggleMenuDrawer = (open: boolean) => {
    setMenuDrawerOpen(open);
  };
  const toggleFeaturedDrawer = (open: boolean) => {
    setFeaturedDrawerOpen(open);
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
          {/* AppBar for Small Screens */}
          {isSmallScreen && (
            <AppBar
              position="fixed"
              color="secondary"
              sx={{ boxShadow: "none" }}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  color="primary"
                  aria-label="menu"
                  onClick={() => toggleMenuDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Box
                  sx={{
                    flexGrow: 1,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  <Typography variant="h3" color="primary">
                    Kalamanch
                  </Typography>
                </Box>
                <IconButton
                  edge="start"
                  color="primary"
                  aria-label="menu"
                  onClick={() => toggleFeaturedDrawer(true)}
                >
                  <FeaturedPlayListOutlinedIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          )}
          {/* Sidebar Drawer for Small Screens */}
          {isSmallScreen && (
            <>
              <Drawer
                anchor="left"
                open={menuDrawerOpen}
                onClose={() => toggleMenuDrawer(false)}
                sx={{
                  "& .MuiDrawer-paper": {
                    width: 240,
                  },
                }}
              >
                <LeftSideBar menuItems={MENU_ITEMS} />
              </Drawer>
              <Drawer
                anchor="right"
                open={featuredDrawerOpen}
                onClose={() => toggleFeaturedDrawer(false)}
                sx={{
                  "& .MuiDrawer-paper": {
                    width: 240,
                    paddingRight: "12px",
                  },
                }}
              >
                <RightSideBar />
              </Drawer>
            </>
          )}
          {!isSmallScreen && (
            <Grid
              size={2}
              sx={{
                mr: 4,
              }}
            >
              <LeftSideBar menuItems={MENU_ITEMS} />
            </Grid>
          )}
          <Grid
            size={isSmallScreen ? 12 : 7}
            sx={{
              pb: "50px",
              backgroundColor: "white",
              marginTop: isSmallScreen ? "16px" : "0px",
            }}
          >
            {children}
          </Grid>
          {!isSmallScreen && (
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
          )}
        </Grid>
      </Box>
    </FeedProvider>
  );
};

export default Layout;
