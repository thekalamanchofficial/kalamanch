import { Stack } from "@mui/material";
import Loader from "./_components/loader/Loader";

const SideBarGroupLoader = () => {
  return (
    <Stack
      sx={{ minWidth: "100vh", minHeight: "100vh" }}
      justifyContent="center"
      alignItems="center"
    >
      <Loader height="20px" width="20px" />
    </Stack>
  );
};

export default SideBarGroupLoader;
