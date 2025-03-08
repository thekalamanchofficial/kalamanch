"use client";

import type { UserResource } from "@clerk/types";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import type { UserSchema } from "~/app/(with-sidebar)/profile/types/types";

export type ProfileMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  user: UserSchema | null;
  clerkUser: UserResource | null | undefined;
  navigateTo: (route: string) => void;
  handleLogout: () => void;
};

const ProfileMenu = ({
  anchorEl,
  open,
  onClose,
  user,
  clerkUser,
  navigateTo,
  handleLogout,
}: ProfileMenuProps) => {
  return (
    <Menu
      id="profile-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          elevation: 2,
          sx: {
            mt: 1.5,
            minWidth: 240,
            borderRadius: 2,
            overflow: "visible",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
    >
      {user && (
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" fontWeight="bold" fontSize="1.1rem">
            {user.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-word" }}>
            {clerkUser?.primaryEmailAddress?.emailAddress}
          </Typography>
        </Box>
      )}
      <Divider />
      <MenuItem onClick={() => navigateTo(`/profile/${user?.id}`)} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <PersonIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: "1.05rem" }}>My Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => navigateTo("/saved")} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <BookmarkBorderOutlinedIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: "1.05rem" }}>Saved</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <LogoutIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: "1.05rem" }}>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
