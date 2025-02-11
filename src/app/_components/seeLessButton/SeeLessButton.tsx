import React from "react";
import { Button } from "@mui/material";

type SeeLessButtonProps = {
  onClick?: () => void;
};
const SeeLessButton: React.FC<SeeLessButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        minHeight: "auto",
        width: "auto",
        height: "10px",
        color: "primary.main",
        fontSize: "14px",
        ":hover": {
          backgroundColor: "transparent",
        },
        fontWeight: "600",
      }}
      disableTouchRipple
    >
      See less
    </Button>
  );
};

export default SeeLessButton;
