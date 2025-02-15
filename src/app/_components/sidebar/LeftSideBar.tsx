import { Box, Divider, Stack, Typography } from "@mui/material";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import UserMenu from "../userMenu/UserMenu";
import LeftSideBarNavLinks from "./LeftSideBarNavLinks";
import { type MenuItemList } from "~/app/(with-sidebar)/myfeed/types/types";
import CreatePostFormButton from "./CreatePostFormButton";

type LeftSideBarProps = {
  menuItems: MenuItemList[];
};

const LeftSideBarServer: React.FC<LeftSideBarProps> = ({ menuItems }) => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 1,
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <Stack direction="row" justifyContent="start" alignItems="center" sx={{ px: "12px" }}>
        <OwlSVG />
        <Typography variant="h5" fontWeight="bold" color="primary">
          {STATIC_TEXTS.APP_TITLE}
        </Typography>
      </Stack>

      <Divider sx={{ width: "100%" }} />

      <CreatePostFormButton />

      <Box sx={{ marginTop: 2, px: "8px" }}>
        <LeftSideBarNavLinks menuItems={menuItems} />
        <UserMenu />
      </Box>
    </Box>
  );
};

export default LeftSideBarServer;
