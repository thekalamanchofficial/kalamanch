import { Box, Divider, Stack, Typography } from "@mui/material";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { type MenuItemList } from "~/app/(with-sidebar)/myfeed/types/types";
import OwlSVG from "~/assets/svg/owl.svg";
import UserMenu from "../userMenu/UserMenu";
import CreatePostFormButton from "./CreatePostFormButton";
import LeftSideBarNavLinks from "./LeftSideBarNavLinks";

const Header = () => (
  <Stack direction="row" justifyContent="start" alignItems="center" sx={{ px: "12px" }}>
    <OwlSVG />
    <Typography variant="h5" fontWeight="bold" color="primary">
      {STATIC_TEXTS.APP_TITLE}
    </Typography>
  </Stack>
);

const Navigation = ({ menuItems }: { menuItems: MenuItemList[] }) => (
  <Box sx={{ marginTop: 2, px: "8px" }}>
    <LeftSideBarNavLinks menuItems={menuItems} />
    <UserMenu />
  </Box>
);

const LeftSideBar = ({ menuItems }: { menuItems: MenuItemList[] }) => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 1,
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <Header />
      <Divider sx={{ width: "100%" }} />
      <CreatePostFormButton />
      <Navigation menuItems={menuItems} />
    </Box>
  );
};

export default LeftSideBar;
