import React from "react";
import { Box, Typography, type SxProps } from "@mui/material";

type ShowMessageProps = {
  title: string;
  style?: SxProps;
};
const ShowMessage: React.FC<ShowMessageProps> = ({ title, style }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Typography>{title}</Typography>
    </Box>
  );
};

export default ShowMessage;
