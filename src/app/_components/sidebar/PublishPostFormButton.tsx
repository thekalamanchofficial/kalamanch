"use client";

import { useState } from "react";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { Box, Button, Typography } from "@mui/material";
import { useDraftPost } from "~/app/_hooks/useDraftPost";
import { usePost } from "~/app/_hooks/usePost";
import isDateTitleFormat from "~/app/_utils/isDateTitleFormat";
import PublishPostForm from "~/app/editor/_components/publishPostForm/PublishPostForm";
import { type CreatePostFormType } from "~/app/editor/types/types";
import { useUser } from "~/context/userContext";
import { STATIC_TEXTS } from "../static/staticText";

type PublishPostFormButtonProps = {
  title: string;
  content: string;
  draftPostId?: string;
};

const PublishPostFormButton = ({ title, content, draftPostId }: PublishPostFormButtonProps) => {
  const [createPostFormOpen, setCreatePostFormOpen] = useState(false);
  const { user } = useUser();
  const { publishPost } = usePost();
  const { deleteDraftPost } = useDraftPost();

  const handleCreatePostFormClose = () => {
    setCreatePostFormOpen(false);
  };

  const handleFormSubmit = async (data: CreatePostFormType) => {
    if (!user?.id || !user?.name) {
      console.error("User not found");
      return;
    }

    await publishPost({
      content,
      authorId: user?.id ?? "",
      authorName: user?.name ?? "",
      authorProfileImageUrl: user?.profileImageUrl ?? "",
      title: data.title ?? "",
      postTypeId: data.postTypeId ?? "",
      actors: data.actors ?? [],
      tags: data.tags ?? [],
      genres: data.genres ?? [],
      thumbnailDetails: {
        url: data.thumbnailUrl ?? "",
        content: data.thumbnailDescription ?? "",
        title: data.thumbnailTitle ?? "",
      },
    });

    if (draftPostId) {
      await deleteDraftPost(draftPostId);
    }
  };

  return (
    <Box
      sx={{
        px: "8px",
      }}
    >
      <Button
        startIcon={<FeedOutlinedIcon />}
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
          {STATIC_TEXTS.EDITOR_PAGE.PUBLISH}
        </Typography>
      </Button>
      {createPostFormOpen && (
        <PublishPostForm
          open={createPostFormOpen}
          handleClose={handleCreatePostFormClose}
          handleFormSubmit={handleFormSubmit}
          postFormData={{
            title: !isDateTitleFormat(title) ? title : "",
            thumbnailUrl: "",
            thumbnailTitle: "",
            thumbnailDescription: "",
            postTypeId: "",
            genres: [],
            tags: [],
            actors: [],
          }}
        />
      )}
    </Box>
  );
};

export default PublishPostFormButton;
