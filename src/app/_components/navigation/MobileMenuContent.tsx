"use client";

import type { UserResource } from "@clerk/types";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CreatePostFormButton from "~/app/_components/sidebar/CreatePostFormButton";
import type { UserSchema } from "~/app/(with-sidebar)/profile/types/types";
import Logo from "./Logo";

export type MobileMenuContentProps = {
  user: UserSchema | null;
  clerkUser: UserResource | null | undefined;
  pathname: string;
  navigateTo: (route: string) => void;
  handleLogout: () => void;
};

const MobileMenuContent = ({
  user,
  clerkUser,
  pathname,
  navigateTo,
  handleLogout,
}: MobileMenuContentProps) => {
  return (
    <Box sx={{ width: 300, pt: 2 }} role="presentation">
      <Box sx={{ px: 2, mb: 2 }}>
        <Logo onClick={() => navigateTo("/myfeed")} isMobile={true} />
      </Box>

      <Divider sx={{ my: 1 }} />

      <CreatePostFormButton />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigateTo("/myfeed")}
            selected={pathname === "/myfeed"}
            sx={{ 
              py: 1.5,
              color: "primary.main",
              backgroundColor: pathname === "/myfeed" ? "secondary.main" : "transparent",
              '&:hover': {
                backgroundColor: pathname === "/myfeed" ? "secondary.main" : "rgba(0, 0, 0, 0.04)",
              },
              '&.Mui-selected': {
                backgroundColor: "secondary.main",
              },
              '&.Mui-selected:hover': {
                backgroundColor: "secondary.main",
              }
            }}
          >
            <ListItemIcon>
              <HomeOutlinedIcon
                color="primary"
                fontSize="medium"
              />
            </ListItemIcon>
            <ListItemText 
              primary="Home" 
              primaryTypographyProps={{ 
                fontSize: "1.05rem",
                fontWeight: pathname === "/myfeed" ? "bold" : "normal",
                color: "primary.main"
              }} 
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => navigateTo("/profile/" + user?.id)} 
            selected={pathname?.startsWith("/profile/" + user?.id)}
            sx={{ 
              py: 1.5,
              color: "primary.main",
              backgroundColor: pathname?.startsWith("/profile/" + user?.id) ? "secondary.main" : "transparent",
              '&:hover': {
                backgroundColor: pathname?.startsWith("/profile/" + user?.id) ? "secondary.main" : "rgba(0, 0, 0, 0.04)",
              },
              '&.Mui-selected': {
                backgroundColor: "secondary.main",
              },
              '&.Mui-selected:hover': {
                backgroundColor: "secondary.main",
              }
            }}
          >
            <ListItemIcon>
              <PersonIcon color="primary" fontSize="medium" />
            </ListItemIcon>
            <ListItemText 
              primary="My Profile" 
              primaryTypographyProps={{ 
                fontSize: "1.05rem",
                fontWeight: pathname?.startsWith("/profile/" + user?.id) ? "bold" : "normal",
                color: "primary.main"
              }} 
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => navigateTo("/saved")} 
            selected={pathname === "/saved"}
            sx={{ 
              py: 1.5,
              color: "primary.main",
              backgroundColor: pathname === "/saved" ? "secondary.main" : "transparent",
              '&:hover': {
                backgroundColor: pathname === "/saved" ? "secondary.main" : "rgba(0, 0, 0, 0.04)",
              },
              '&.Mui-selected': {
                backgroundColor: "secondary.main",
              },
              '&.Mui-selected:hover': {
                backgroundColor: "secondary.main",
              }
            }}
          >
            <ListItemIcon>
              <BookmarkBorderOutlinedIcon color="primary" fontSize="medium" />
            </ListItemIcon>
            <ListItemText 
              primary="Saved" 
              primaryTypographyProps={{ 
                fontSize: "1.05rem",
                fontWeight: pathname === "/saved" ? "bold" : "normal",
                color: "primary.main"
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ my: 1 }} />

      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ px: 2, py: 1, fontSize: "1rem" }}
      >
        Todo
      </Typography>

      <List>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => navigateTo("/drafts")} 
            selected={pathname === "/drafts"}
            sx={{ 
              py: 1.5,
              color: "primary.main",
              backgroundColor: pathname === "/drafts" ? "secondary.main" : "transparent",
              '&:hover': {
                backgroundColor: pathname === "/drafts" ? "secondary.main" : "rgba(0, 0, 0, 0.04)",
              },
              '&.Mui-selected': {
                backgroundColor: "secondary.main",
              },
              '&.Mui-selected:hover': {
                backgroundColor: "secondary.main",
              }
            }}
          >
            <ListItemIcon>
              <ModeEditOutlinedIcon color="primary" fontSize="medium" />
            </ListItemIcon>
            <ListItemText 
              primary="Drafts" 
              primaryTypographyProps={{ 
                fontSize: "1.05rem",
                fontWeight: pathname === "/drafts" ? "bold" : "normal",
                color: "primary.main"
              }} 
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => navigateTo("/review-feedback")} 
            selected={pathname === "/review-feedback"}
            sx={{ 
              py: 1.5,
              color: "primary.main",
              backgroundColor: pathname === "/review-feedback" ? "secondary.main" : "transparent",
              '&:hover': {
                backgroundColor: pathname === "/review-feedback" ? "secondary.main" : "rgba(0, 0, 0, 0.04)",
              },
              '&.Mui-selected': {
                backgroundColor: "secondary.main",
              },
              '&.Mui-selected:hover': {
                backgroundColor: "secondary.main",
              }
            }}
          >
            <ListItemIcon>
              <FeedbackOutlinedIcon color="primary" fontSize="medium" />
            </ListItemIcon>
            <ListItemText
              primary="Review Feedback"
              primaryTypographyProps={{ 
                fontSize: "1.05rem",
                fontWeight: pathname === "/review-feedback" ? "bold" : "normal",
                color: "primary.main"
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ my: 1 }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={handleLogout} 
            sx={{ 
              py: 1.5,
              color: "primary.main"
            }}
          >
            <ListItemIcon>
              <LogoutIcon color="primary" fontSize="medium" />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ 
                fontSize: "1.05rem",
                color: "primary.main"
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>

      {user && (
        <>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={user.profileImageUrl}
              alt={user.name ?? "User"}
              sx={{ width: 44, height: 44 }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" fontSize="1.1rem">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {clerkUser?.primaryEmailAddress?.emailAddress}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MobileMenuContent;
