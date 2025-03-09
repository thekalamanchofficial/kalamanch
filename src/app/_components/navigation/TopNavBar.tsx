"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import RightSideBar from "~/app/_components/sidebar/RightSideBar";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { handleError } from "~/app/_utils/handleError";
import { useUser } from "~/context/userContext";
import Logo from "./Logo";
import MobileMenuContent from "./MobileMenuContent";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";
import TodoMenu from "./TodoMenu";

const TopNavBar = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const { user: clerkUser, signOut } = useClerk();
  const { user } = useUser();

  const typedClerkUser = clerkUser as UserResource | null;

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [todoMenuAnchor, setTodoMenuAnchor] = useState<null | HTMLElement>(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const handleTodoMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setTodoMenuAnchor(event.currentTarget);
  };

  const handleTodoMenuClose = () => {
    setTodoMenuAnchor(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const handleLogout = async () => {
    toast
      .promise(
        (async () => {
          await signOut({ redirectUrl: "/" });
        })(),
        {
          pending: `${STATIC_TEXTS.LOGOUT_MESSAGES.PENDING}`,
          success: `${STATIC_TEXTS.LOGOUT_MESSAGES.SUCCESS}`,
        },
      )
      .catch((error) => {
        handleError(error);
      });

    handleProfileMenuClose();
    setMobileMenuOpen(false);
  };

  const navigateTo = (route: string) => {
    router.push(route);
    handleTodoMenuClose();
    handleProfileMenuClose();
    setMobileMenuOpen(false);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: "64px", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 1, display: { md: "none" } }}
              onClick={toggleMobileMenu}
            >
              <MenuIcon />
            </IconButton>

            <Logo onClick={() => router.push("/myfeed")} isMobile={false} />
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              width: { xs: "100%", md: "45%" },
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: theme.zIndex.modal + 1,
              maxWidth: "500px",
            }}
          >
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showSearchResults={showSearchResults}
              setShowSearchResults={setShowSearchResults}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              mx: 1,
              display: { xs: "block", sm: "none" },
            }}
          >
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showSearchResults={showSearchResults}
              setShowSearchResults={setShowSearchResults}
            />
          </Box>

          <Stack direction="row" spacing={{ xs: 0.5, sm: 1, md: 2 }} alignItems="center">
            <IconButton
              color="primary"
              aria-label="featured content"
              onClick={toggleRightSidebar}
              sx={{
                display: { xs: "flex", md: "none" },
                ml: 1,
              }}
            >
              <FeaturedPlayListOutlinedIcon />
            </IconButton>

            <Tooltip title="Home">
              <Button
                component={Link}
                href="/myfeed"
                color={pathname === "/myfeed" ? "primary" : "inherit"}
                startIcon={<HomeOutlinedIcon sx={{ fontSize: "1.3rem" }} />}
                sx={{
                  display: { xs: "none", md: "flex" },
                  fontWeight: pathname === "/myfeed" ? "bold" : "normal",
                  color: pathname === "/myfeed" ? "primary.main" : "text.primary",
                  fontSize: "1.05rem",
                  px: 2,
                  py: 1,
                  minWidth: "110px",
                }}
              >
                Home
              </Button>
            </Tooltip>

            <Tooltip title="Todo">
              <Button
                color="inherit"
                startIcon={<TaskAltIcon sx={{ fontSize: "1.3rem" }} />}
                onClick={handleTodoMenuOpen}
                sx={{
                  display: { xs: "none", md: "flex" },
                  color: "text.primary",
                  fontSize: "1.05rem",
                  px: 2,
                  py: 1,
                  minWidth: "110px",
                }}
              >
                Todo
              </Button>
            </Tooltip>

            <TodoMenu
              anchorEl={todoMenuAnchor}
              open={Boolean(todoMenuAnchor)}
              onClose={handleTodoMenuClose}
              navigateTo={navigateTo}
            />

            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              <Tooltip title="Profile Menu">
                <Button
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    color: "text.primary",
                    fontSize: "1.05rem",
                    px: 2,
                    py: 0.75,
                    minWidth: "120px",
                  }}
                  startIcon={
                    <Avatar
                      src={user?.profileImageUrl}
                      alt={user?.name ?? "User"}
                      sx={{
                        width: 36,
                        height: 36,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      }}
                    />
                  }
                >
                  <Typography
                    sx={{
                      display: { xs: "none", md: "block" },
                      fontWeight: 500,
                      fontSize: "1.05rem",
                    }}
                  >
                    Profile
                  </Typography>
                </Button>
              </Tooltip>
            </Box>

            <ProfileMenu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
              user={user}
              clerkUser={typedClerkUser}
              navigateTo={navigateTo}
              handleLogout={handleLogout}
            />
          </Stack>
        </Toolbar>
      </Container>

      <Drawer anchor="left" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <MobileMenuContent
          user={user}
          clerkUser={typedClerkUser}
          pathname={pathname}
          navigateTo={navigateTo}
          handleLogout={handleLogout}
        />
      </Drawer>

      <Drawer
        anchor="right"
        open={rightSidebarOpen}
        onClose={toggleRightSidebar}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            paddingRight: "12px",
          },
        }}
      >
        <Box sx={{ pt: 2 }}>
          <RightSideBar />
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default TopNavBar;
