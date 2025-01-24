"use client";

import { Button, Typography, Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import MessageIcon from "@mui/icons-material/Message";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { type MenuItemList } from "~/app/(with-sidebar)/myfeed/types/types";

 type LeftSideBarNavLinksProps = {
  menuItems: MenuItemList[];
}

const LeftSideBarNavLinks: React.FC<LeftSideBarNavLinksProps> = ({ menuItems }) => {
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
    ModeEditOutlinedIcon: ModeEditOutlinedIcon
  };

  return (
    <>
      {menuItems.map((item, index) => {
        const IconComponent = ICONS_MAP[item.icon as keyof typeof ICONS_MAP];
        const isActive = pathname === item.route;

        return (
          <Link
            key={index}
            href={item.route}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                px: "2px",
                py: "4px",
                backgroundColor: isActive ? "secondary.main" : "white",
              }}
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
          </Link>
        );
      })}
    </>
  );
};

export default LeftSideBarNavLinks;
