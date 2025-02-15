"use client";

import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDraftPost } from "~/app/_hooks/useDraftPost";
import PublishPostForm from "~/app/editor/_components/createPostForm/PublishPostForm";
import { type CreatePostFormType } from "~/app/editor/types/types";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { useUser } from "~/context/userContext";
import { STATIC_TEXTS } from "../static/staticText";

type PublishPostFormButtonProps = {
  title: string;
};

const PublishPostFormButton = ({ title }: PublishPostFormButtonProps) => {
  const [createPostFormOpen, setCreatePostFormOpen] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleCreatePostFormClose = () => {
    setCreatePostFormOpen(false);
  };

  const handleFormSubmit = async (data: CreatePostFormType) => {
    if (!user?.id || !user?.name) {
      console.error("User not found");
      return;
    }

    console.log({
      publishPostFormData: data,
    });

    // create draft post
    // const draftPost = await addDraftPost({
    //   authorId: user.id,
    //   authorName: user.name,
    //   authorProfileImageUrl: user.profileImageUrl ?? "",
    //   postDetails: {
    //     title: data.title,
    //     targetAudience: data.targetAudience ?? [],
    //     postType: data.postType as PostType,
    //     actors: data.actors ?? [],
    //     tags: data.tags ?? [],
    //     thumbnailDetails: {
    //       url: data.thumbnailUrl ?? "",
    //     },
    //   },
    //   iterations: [{
    //     iterationName: "Iteration - 1",
    //     content: "",
    //   }]
    // });

    // const queryData = {
    //   draftPostId: draftPost?.id ?? ""
    // };
    // const query = new URLSearchParams(queryData).toString();
    // router.push(`/editor?${query}`);
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
          createPostFormData={{
            title,
            thumbnailUrl: "",
            thumbnailTitle: "",
            thumbnailDescription: "",
            postType: "",
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
