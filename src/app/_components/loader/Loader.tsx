import { Box, CircularProgress } from "@mui/material";
import React from "react";

type LoaderProps = {
  height: string;
  width: string;
  title: string;
};
const Loader: React.FC<LoaderProps> = ({ height, width, title }) => {
  return (
    <Box
      sx={{
        width: { width },
        height: { height },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <CircularProgress />
      {title}
    </Box>
  );
};

export default Loader;
