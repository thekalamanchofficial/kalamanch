import { Box } from "@mui/material";
import { type MenuItemList } from "~/app/(with-sidebar)/myfeed/types/types";
import LeftSideBarNavLinks from "../sidebar/LeftSideBarNavLinks";
import UserMenu from "../userMenu/UserMenu";

const Navigation = ({ menuItems }: { menuItems: MenuItemList[] }) => (
  <Box sx={{ marginTop: 2, px: "8px" }}>
    <LeftSideBarNavLinks menuItems={menuItems} />
    <UserMenu />
  </Box>
);

export default Navigation;
