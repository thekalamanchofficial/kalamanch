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
        gap: "8px",
        borderRadius: "40px",
        lineHeight: "17.64px",
        padding: "4px 20px",
        backgroundColor: "common.lightGray",
        fontSize: "14px",
        color: "text.secondary",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "secondary.main",
          color: "primary.main",
        },
        "&.MuiButton-root": {
            "minHeight": "26px",
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
