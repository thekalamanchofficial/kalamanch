import { Box } from "@mui/material";
import CreatePostFormButton from "./CreatePostFormButton";
import UserFeedCard from "./UserFeedCard";

const LeftSideBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: 1,
        backgroundColor: "white",
        position: "relative",
        borderRadius: 2,
      }}
    >
      <UserFeedCard />
      <CreatePostFormButton />
    </Box>
  );
};

export default LeftSideBar;
