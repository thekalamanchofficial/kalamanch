import React from "react";
import { Button, Box, type SxProps } from "@mui/material";

type PostActionButtonProps = {
  icon: React.ReactNode;
  label: number | string;
  onClick?: () => void;
  sx?: SxProps;
};

const PostActionButton: React.FC<PostActionButtonProps> = ({
  icon,
  label,
  onClick,
  sx,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "26px",
        minWidth: "88px",
        gap: "8px",
        borderRadius: "40px",
        padding: "6px 8px",
        backgroundColor: "common.lightGray",
        fontSize: "14px",
        color: "text.secondary",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "secondary.main",
          color: "primary.main",
        },
        ...sx,
      }}
    >
      {icon}
      {label && <Box component="span">{label}</Box>}
    </Button>
  );
};

export default PostActionButton;
