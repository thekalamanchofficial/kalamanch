import { Box, Divider, Stack, Typography } from "@mui/material";
import OwlSVG from "~/assets/svg/owl.svg";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import CreatePostFormButton from "./CreatePostForm";
import UserMenu from "../userMenu/UserMenu";
import { type LeftSideBarProps } from "~/app/(with-sidebar)/myfeed/types/types";
import LeftSideBarNavLinks from "./LeftSideBarNavLinks";

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
      
      {/* Create Post Form Button */}
      <CreatePostFormButton />

      <Box sx={{ marginTop: 2, px: "8px" }}>
        {/* Pass menuItems to the client-side NavLink component */}
        <LeftSideBarNavLinks menuItems={menuItems} />
        <UserMenu />
      </Box>
    </Box>
  );
};

export default LeftSideBarServer;
