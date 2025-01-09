import { Box, Divider, Stack, Typography } from "@mui/material";
import OwlSVG from "~/assets/svg/owl.svg";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import CreatePostFormButton from "./CreatePostFormButton";
import UserMenu from "../userMenu/UserMenu";
import LeftSideBarNavLinks from "./LeftSideBarNavLinks";
import { type MenuItemList } from "~/app/(with-sidebar)/myfeed/types/types";

type LeftSideBarProps = {
  menuItems: MenuItemList[];
};

const LeftSideBarServer: React.FC<LeftSideBarProps> = ({ menuItems }) => {
  return (
    <Stack
      sx={{
        minWidth: "264px",
        minHeight: "1124px",
        backgroundColor: "white",
        position: "relative",
        paddingBlockEnd: "24px",
      }}
      direction="column"
      justifyContent="space-between"
    >
      <Box>
        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          sx={{ px: "12px" }}
        >
          <OwlSVG />
          <Typography variant="h5" fontWeight="bold" color="primary">
            {STATIC_TEXTS.APP_TITLE}
          </Typography>
        </Stack>

        <Divider sx={{ width: "100%" }} />

        <Box sx={{ marginTop: 2, px: "8px", width: "240px" }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            gap="20px"
          >
            <CreatePostFormButton />
            <LeftSideBarNavLinks menuItems={menuItems} />
          </Stack>
        </Box>
      </Box>
      <Box sx={{ width: "100%",
        height: "48px", }}>
        <UserMenu />
      </Box>
    </Stack>
  );
};

export default LeftSideBarServer;
