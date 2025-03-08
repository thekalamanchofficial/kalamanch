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
      {user && (
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
      )}

      <Divider sx={{ my: 1 }} />

      <CreatePostFormButton />

      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigateTo("/myfeed")}
            selected={pathname === "/myfeed"}
            sx={{ py: 1.5 }}
          >
            <ListItemIcon>
              <HomeOutlinedIcon
                color={pathname === "/myfeed" ? "primary" : "inherit"}
                fontSize="medium"
              />
            </ListItemIcon>
            <ListItemText primary="Home" primaryTypographyProps={{ fontSize: "1.05rem" }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo("/profile/" + user?.id)} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <PersonIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="My Profile" primaryTypographyProps={{ fontSize: "1.05rem" }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo("/saved")} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <BookmarkBorderOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Saved" primaryTypographyProps={{ fontSize: "1.05rem" }} />
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
          <ListItemButton onClick={() => navigateTo("/drafts")} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <ModeEditOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Drafts" primaryTypographyProps={{ fontSize: "1.05rem" }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigateTo("/review-feedback")} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <FeedbackOutlinedIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText
              primary="Review Feedback"
              primaryTypographyProps={{ fontSize: "1.05rem" }}
            />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ my: 1 }} />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <LogoutIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText primary="Logout" primaryTypographyProps={{ fontSize: "1.05rem" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default MobileMenuContent;
