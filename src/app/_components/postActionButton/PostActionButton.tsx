import React from "react";
import { Button, Box } from "@mui/material";

type PostActionButtonProps = {
  icon: React.ReactNode;
  label: number | string;
  onClick?: () => void;
};

const PostActionButton: React.FC<PostActionButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "auto",
        gap: "8px",
        borderRadius: "16px",
        padding: "6px 8px",
        backgroundColor: "common.lightGray",
        fontSize: "14px",
        color: "text.secondary",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "common.gray",
        },
      }}
    >
      {icon}
      <Box component="span">{label}</Box>
    </Button>
  );
};

export default PostActionButton;
