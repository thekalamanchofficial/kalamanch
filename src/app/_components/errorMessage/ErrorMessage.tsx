import React from "react";
import GppBadIcon from "@mui/icons-material/GppBad";
import { Box } from "@mui/material";

type ErrorMessageProps = {
  message: string;
  fontSize?: number;
  iconSize?: number;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, fontSize = 20, iconSize = 20 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "error.main",
        padding: "8px",
        height: "100%",

        fontSize: { fontSize },
      }}
    >
      <GppBadIcon sx={{ fontSize: { iconSize }, marginRight: 1 }} />
      {message}
    </Box>
  );
};

export default ErrorMessage;
