"use client";

import React from "react";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EditNoteIcon from "@mui/icons-material/EditNote";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import { Box, Button, Typography } from "@mui/material";
import { PostStatus } from "~/app/editor/types/types";
import PublishPostFormButton from "../sidebar/PublishPostFormButton";

const buttonStyle = {
  backgroundColor: "secondary.main",
  minHeight: "auto",
  color: "primary.main",
  py: "8px",
  px: "16px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  "&:hover": {
    backgroundColor: "secondary.dark",
  },
};

const textStyle = {
  fontSize: {
    xs: "12px",
    sm: "14px",
  },
};

type ActionsBarProps = {
  title: string;
  content: string;
  handleOpen: () => void;
  handleSaveDraft: (showToast?: boolean) => void;
  handleSubmit: () => void;
  postStatus: PostStatus;
  handleSendForReview: () => void;
  draftPostId?: string;
};

const EditorActionsBar: React.FC<ActionsBarProps> = ({
  title,
  content,
  handleOpen,
  handleSubmit,
  postStatus,
  handleSaveDraft,
  handleSendForReview,
  draftPostId,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: {
        xs: "column",
        sm: "row",
      },
      justifyContent: {
        xs: "center",
        md: "flex-end",
      },
      flexWrap: {
        xs: "wrap",
        sm: "nowrap",
      },
      gap: "10px",
      alignItems: {
        xs: "stretch",
        sm: "center",
      },
      marginTop: {
        xs: "75px",
        sm: "0",
      },
      height: {
        xs: "250px",
        sm: "200px",
      },
      padding: "10px",
    }}
  >
    {postStatus == PostStatus.PUBLISHED && (
      <Button sx={buttonStyle} onClick={handleOpen}>
        <EditNoteIcon />
        <Typography sx={textStyle}>Edit details</Typography>
      </Button>
    )}
    {postStatus == PostStatus.DRAFT && (
      <Button sx={buttonStyle} onClick={handleSendForReview}>
        <ChecklistIcon />
        <Typography sx={textStyle}>Send for review</Typography>
      </Button>
    )}
    {postStatus == PostStatus.DRAFT && (
      <Button sx={buttonStyle} onClick={() => handleSaveDraft(true)}>
        <FolderIcon />
        <Typography sx={textStyle}>Save as draft</Typography>
      </Button>
    )}
    {postStatus == PostStatus.DRAFT && (
      <PublishPostFormButton title={title} content={content} draftPostId={draftPostId} />
    )}
    {postStatus == PostStatus.PUBLISHED && (
      <Button sx={buttonStyle} onClick={handleSubmit}>
        <FeedOutlinedIcon />
        <Typography sx={textStyle}>Update</Typography>
      </Button>
    )}
  </Box>
);

export default EditorActionsBar;
