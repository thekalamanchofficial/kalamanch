import React from "react";
import { Box, CircularProgress } from "@mui/material";

type LoaderProps = {
  height: string;
  width: string;
  title?: string;
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
        margin: "10px",
      }}
    >
      <CircularProgress />
      {title}
    </Box>
  );
};

export default Loader;
