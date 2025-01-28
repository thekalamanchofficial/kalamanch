"use client";

import React from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useClerk } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { STATIC_TEXTS } from "../static/staticText";
import { handleError } from "~/app/_utils/handleError";
import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";

const UserMenu = () => {
  const { user, signOut } = useClerk();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box display="flex" alignItems="center">
        <Avatar
          alt="user profile picture"
          src={user?.imageUrl}
          sx={{ width: 38, height: 38, mr: 1 }}
        />

        <Typography color="text.secondary" variant="subtitle2">
          {user?.firstName === null
            ? (user?.unsafeMetadata?.name as string)
            : user?.firstName}
        </Typography>
      </Box>
      <Box>
        <Button
          sx={{
            color: "text.secondary",
            height: "auto",
            width: "20px",
          }}
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizOutlinedIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default UserMenu;
