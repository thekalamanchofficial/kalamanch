"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MessageIcon from "@mui/icons-material/Message";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {
  Box,
  Button,
  ClickAwayListener,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchResultsPopup from "~/app/_components/search/SearchResultsPopup";
import { type MenuItemList } from "~/app/(with-sidebar)/myfeed/types/types";

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
  ModeEditOutlinedIcon: ModeEditOutlinedIcon,
  FeedbackOutlinedIcon: FeedbackOutlinedIcon,
} as const;

type IconType = keyof typeof ICONS_MAP;

type MenuItem = {
  label: string;
  route: string;
  icon: IconType;
};

const SearchBox: React.FC<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showSearchResults: boolean;
  setShowSearchResults: (show: boolean) => void;
}> = ({ searchQuery, setSearchQuery, showSearchResults, setShowSearchResults }) => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleSearchFocus = () => setShowSearchResults(true);
  const handleClickAway = () => setShowSearchResults(false);
  const handleSearchResultClick = () => {
    setSearchQuery("");
    setShowSearchResults(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          px: "2px",
          py: "4px",
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleSearchFocus}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px",
              backgroundColor: "background.paper",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            },
          }}
        />
        {showSearchResults && (
          <SearchResultsPopup searchQuery={searchQuery} onClose={handleSearchResultClick} />
        )}
      </Box>
    </ClickAwayListener>
  );
};

const NavLink: React.FC<{
  item: MenuItem;
  isActive: boolean;
  IconComponent: React.ComponentType;
}> = ({ item, isActive, IconComponent }) => (
  <Link href={item.route} style={{ textDecoration: "none" }}>
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

const LeftSideBarNavLinks = ({ menuItems }: { menuItems: MenuItemList[] }) => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  return (
    <>
      {menuItems.map((item, index) => {
        const IconComponent = ICONS_MAP[item.icon as unknown as IconType];
        const isActive = pathname === item.route;
        const isSearch = item.label.toLowerCase() === "search";

        if (isSearch) {
          return (
            <SearchBox
              key={index}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showSearchResults={showSearchResults}
              setShowSearchResults={setShowSearchResults}
            />
          );
        }

        return (
          <NavLink
            key={index}
            item={item as unknown as MenuItem}
            isActive={isActive}
            IconComponent={IconComponent}
          />
        );
      })}
    </>
  );
};

export default LeftSideBarNavLinks;
