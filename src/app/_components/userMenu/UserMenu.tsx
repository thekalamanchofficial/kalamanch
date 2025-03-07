"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useClerk } from "@clerk/nextjs";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Avatar, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { handleError } from "~/app/_utils/handleError";
import { STATIC_TEXTS } from "../static/staticText";

const UserMenu = () => {
  const { user, signOut } = useClerk();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Use useEffect to update the image URL and user name after client-side hydration
  useEffect(() => {
    if (user) {
      setImageUrl(user.imageUrl);
      setUserName(user.firstName ?? (user.unsafeMetadata?.name as string));
    }
  }, [user]);

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
          src={imageUrl ?? undefined}
          sx={{ width: 38, height: 38, mr: 1 }}
        />

        <Typography color="text.secondary" variant="subtitle2">
          {userName}
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
