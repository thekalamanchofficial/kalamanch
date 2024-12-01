import React from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import UserNameProfile from "~/app/_components/UserNameProfile";
import { useClerk } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { STATIC_TEXTS } from "./static/staticText";
import { handleError } from "~/app/_utils/handleError";
import { Button, Menu, MenuItem } from "@mui/material";

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
    <>
      <UserNameProfile
        ImageHeight={50}
        ImageWidth={50}
        AuthorImage={user?.imageUrl}
        AuthorName={user?.firstName}
      />
      <div style={{ paddingRight: "10px" }}>
        <Button
          startIcon={<MoreHorizOutlinedIcon />}
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
        />
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
      </div>
    </>
  );
};

export default UserMenu;
