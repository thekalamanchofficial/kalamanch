import { Box, Typography, Button, Grid2 as Grid, Divider } from "@mui/material";
import React from "react";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import OwlSVG from "~/assets/svg/owl.svg";
import WriteLogo from "~/assets/svg/writeLogo.svg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import MessageIcon from "@mui/icons-material/Message";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { type LeftSideBarProps } from "~/app/(with-sidebar)/myfeed/types/types";
import { usePathname, useRouter } from "next/navigation";
import UserMenu from "../UserMenu";

const LeftSideBar: React.FC<LeftSideBarProps> = ({ menuItems }) => {
  const router = useRouter();

  const pathname = usePathname();

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
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          px: "12px",
        }}
      >
        <OwlSVG />
        <Typography variant="h5" fontWeight="bold" color="primary">
          {STATIC_TEXTS.APP_TITLE}
        </Typography>
      </Box>

      <Divider
        sx={{
          width: "100%",
        }}
      ></Divider>
      <Box
        sx={{
          marginTop: 4,
          px: "8px",
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
          px: "8px",
        }}
      >
        {menuItems.map((item, index) => {
          const IconComponent = ICONS_MAP[item.icon as keyof typeof ICONS_MAP];
          const isActive = pathname === item.route;

          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                px: "2px",
                py: "4px",
                backgroundColor: isActive ? "secondary.main" : "white",
              }}
              onClick={() => router.push(item.route)}
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
                  color: isActive ? "primary.main" : "text.secondary",
                  marginLeft: "4px",
                  ":hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: isActive ? "primary.main" : "text.secondary",
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
          px: "8px",
        }}
      >
        <UserMenu />
      </Box>
    </Grid>
  );
};

export default LeftSideBar;
