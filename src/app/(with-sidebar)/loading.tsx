import { Box } from "@mui/material";
import Loader from "../_components/loader/Loader";

const SideBarGroupLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 100px)",
        width: "100%",
      }}
    >
      <Loader title="" height="100%" width="100%" />
    </Box>
  );
};

export default SideBarGroupLoader;
