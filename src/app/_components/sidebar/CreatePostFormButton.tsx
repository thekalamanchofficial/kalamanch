"use client";

import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { STATIC_TEXTS } from "../static/staticText";
import WriteLogo from "~/assets/svg/WriteLogo.svg";
import CreatePostForm from "~/app/editor/_components/createPostForm/CreatePostForm";

const CreatePostFormButton = () => {
  const [createPostFormOpen, setCreatePostFormOpen] = useState(false);

  const handleCreatePostFormClose = () => {
    setCreatePostFormOpen(false);
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        px: "8px",
      }}
    >
      <Button
        startIcon={<WriteLogo />}
        variant="contained"
        size="small"
        fullWidth
        sx={{
          display: "flex",
          height: "40px",
          backgroundColor: "primary.main",
          justifyContent: "start",
          alignItems: "center",
          px: "12px",
        }}
        onClick={() => setCreatePostFormOpen(true)}
      >
        <Typography
          variant="h6"
          color="#fff"
          style={{
            fontSize: "16px",
          }}
        >
          {STATIC_TEXTS.USER_FEED.BUTTONS.WRITE}
        </Typography>
      </Button>
      {createPostFormOpen && (
        <CreatePostForm
          open={createPostFormOpen}
          handleClose={handleCreatePostFormClose}
          createPostFormData={{
            title: "",
            targetAudience: [],
            thumbnailUrl: "",
            postType: "",
            tags: [],
            actors: [],
          }}
        />
      )}
    </Box>
  );
};

export default CreatePostFormButton;
