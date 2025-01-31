"use client";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Drawer,
} from "@mui/material";
import { useState } from "react";
import { MENU_ITEMS } from "~/app/(with-sidebar)/myfeed/static/menu";
import LeftSideBar from "../sidebar/LeftSideBar";
import RightSideBar from "../sidebar/RightSideBar";
import MenuIcon from "@mui/icons-material/Menu";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import { usePathname } from "next/navigation";

export const AppBarMenu = () => {
  const pathname = usePathname();
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [featuredDrawerOpen, setFeaturedDrawerOpen] = useState(false);

  const toggleMenuDrawer = (open: boolean) => {
    setMenuDrawerOpen(open);
  };
  const toggleFeaturedDrawer = (open: boolean) => {
    setFeaturedDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="secondary"
        sx={{
          boxShadow: "none",
          display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
        }}
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
            sx={{ display: pathname === "/featured" ? "none" : "flex" }}
          >
            <FeaturedPlayListOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <>
        <Drawer
          anchor="left"
          open={menuDrawerOpen}
          onClose={() => toggleMenuDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 240,
            },
            display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
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
    </>
  );
};
