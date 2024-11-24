import {
  Box,
  Typography,
  Button,
  Grid2 as Grid,
  MenuItem,
  Menu,
} from "@mui/material";
import React from "react";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import OwlSVG from "~/assets/svg/owl.svg";
import WriteLogo from "~/assets/svg/writeLogo.svg";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import MessageIcon from "@mui/icons-material/Message";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import userImage from "~/assets/images/user.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type MenuItemList } from "~/app/myfeed/types/types";
import { useClerk } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { handleError } from "~/app/_utils/handleError";

interface LeftSideBarProps {
  menuItems: MenuItemList[];
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({ menuItems }) => {
  const { signOut } = useClerk();

  const router = useRouter();

  const ICONS_MAP = {
    HomeIcon: HomeOutlinedIcon,
    SearchIcon: SearchIcon,
    MenuBookIcon: MenuBookIcon,
    StarOutlineIcon: StarOutlineIcon,
    MessagesIcon: MessageIcon,
    BookmarkBorderOutlinedIcon: BookmarkBorderOutlinedIcon,
    ShoppingCartOutlinedIcon: ShoppingCartOutlinedIcon,
    SettingsOutlinedIcon: SettingsOutlinedIcon,
    AccountCircleOutlinedIcon: AccountCircleOutlinedIcon,
  };

  const handleTabChange = () => {
    console.log("hello");
    router.push("/myfeed/profile");
  };

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

    setAnchorEl(null);
  };
  return (
    <Grid
      columns={1}
      sx={{
        height: "100%",
        width: "100%",
        spacing: 3,
        backgroundColor: "white",
        position: "relative",
        py: 1,
        px: "8px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          px: 2,
        }}
      >
        <OwlSVG />
        <Typography variant="h5" fontWeight="bold" color="primary">
          {STATIC_TEXTS.APP_TITLE}
        </Typography>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "grey.300" }}></Box>
      <Box
        sx={{
          marginTop: 4,
        }}
      >
        <Button
          startIcon={<WriteLogo />}
          variant="contained"
          size="small"
          fullWidth
          sx={{
            display: "flex",
            height: "40px",
            backgroundColor: "primary.main",
            justifyContent: "start",
            alignItems: "center",
            px: "12px",
          }}
        >
          <Typography
            variant="h6"
            color="#fff"
            style={{
              fontSize: "16px",
            }}
          >
            {STATIC_TEXTS.USER_FEED.BUTTONS.WRITE}
          </Typography>
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: 2,
        }}
      >
        {menuItems.map((item, index) => {
          const IconComponent = ICONS_MAP[item.icon as keyof typeof ICONS_MAP];

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                px: "2px",
                py: "4px",
              }}
              onClick={() => handleTabChange()}
            >
              <Button
                startIcon={<IconComponent />}
                variant="text"
                size="small"
                fullWidth
                sx={{
                  display: "flex",
                  height: "40px",
                  justifyContent: "start",
                  alignItems: "center",
                  color: "text.secondary",
                  marginLeft: "4px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "text.secondary",
                  }}
                >
                  {item.label}
                </Typography>
              </Button>
            </Box>
          );
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          position: "absolute",
          bottom: "0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            alt="profile picture "
            src={userImage}
            width={50}
            height={50}
            style={{
              borderRadius: "100%",
            }}
          ></Image>
          <Typography
            sx={{
              fontSize: "17px",
              fontWeight: "semibold",
              color: "text.secondary",
              marginLeft: "4px",
            }}
          >
            Steve Jobs
          </Typography>
        </Box>
        <div>
          <Button
            startIcon={<MoreHorizOutlinedIcon />}
            sx={{ color: "text.secondary" }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </Menu>
          </Button>
        </div>
      </Box>
    </Grid>
  );
};

export default LeftSideBar;
