"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { PostStatus } from "~/app/editor/types/types";

const buttonStyle = {
  backgroundColor: "secondary.main",
  minHeight: "auto",
  color: "primary.main",
  py: "8px",
  px: "16px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const textStyle = {
  fontSize: "14px",
};
type ActionsBarProps = {
  handleOpen: () => void;
  handleSubmit: () => void;
  handleSaveDraft: (showToast?: boolean) => void;
  postStatus: PostStatus;
  handleSendForReview: () => void;
};

const EditorActionsBar: React.FC<ActionsBarProps> = ({
  handleOpen,
  postStatus,
  handleSubmit,
  handleSaveDraft,
  handleSendForReview,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: "10px",
      alignItems: "center",
      height: "200px",
      padding: "10px",
    }}
  >
    <Button sx={buttonStyle} onClick={handleOpen}>
      <EditNoteIcon />
      <Typography sx={textStyle}>Edit details</Typography>
    </Button>
    <Button sx={buttonStyle} onClick={handleSendForReview}>
      <ChecklistIcon />
      <Typography sx={textStyle}>Send for review</Typography>
    </Button>
    {postStatus == PostStatus.DRAFT && (
      <Button sx={buttonStyle} onClick={() => handleSaveDraft(true)}>
        <FolderIcon />
        <Typography sx={textStyle}>Save as draft</Typography>
      </Button>
    )}
    <Button
      sx={{ ...buttonStyle, backgroundColor: "primary.main", color: "white" }}
      onClick={handleSubmit}
    >
      <FeedOutlinedIcon />
      <Typography sx={textStyle}>
        {postStatus == PostStatus.DRAFT ? "Publish" : "Update"}
      </Typography>
    </Button>
  </Box>
);

export default EditorActionsBar;
