import React from "react";
import { Button } from "@mui/material";

type SeeMoreButtonProps = {
  onClick?: () => void;
};
const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({ onClick }) => {
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
      See more
    </Button>
  );
};

export default SeeMoreButton;
