"use client";

import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { STATIC_TEXTS } from "../static/staticText";
import WriteLogo from "~/assets/svg/WriteLogo.svg";
import CreatePostForm from "~/app/editor/_components/createPostForm/CreatePostForm";
import { useRouter } from "next/navigation";
import { type CreatePostFormType } from "~/app/editor/types/types";
import { useUser } from "~/context/userContext";
import { type PostType } from "@prisma/client";
import { useDraftPost } from "~/app/editor/_hooks/useDraftPost";

const CreatePostFormButton = () => {
  const [createPostFormOpen, setCreatePostFormOpen] = useState(false);
  const router = useRouter();
  const {user} = useUser();
  const {addDraftPost} = useDraftPost();



  const handleCreatePostFormClose = () => {
    setCreatePostFormOpen(false);
  };

  const handleFormSubmit = async (data: CreatePostFormType) => {

    if (!user?.id || !user?.name) {
      console.error("User not found");
      return;
    }

    // create draft post
    const draftPost = await addDraftPost({
      authorId: user.id,
      authorName: user.name,
      authorProfileImageUrl: user.profileImageUrl ?? "",
      postDetails: {
        title: data.title,
        targetAudience: data.targetAudience ?? [],
        postType: data.postType as PostType,
        actors: data.actors ?? [],
        tags: data.tags ?? [],
        thumbnailDetails: {
          url: data.thumbnailUrl ?? "",
        },
      },
      iterations: [{
        iterationName: "Iteration - 1",
        content: "",
      }]
    });


    const queryData = {
      draftPostId: draftPost?.id ?? ""
    };
    const query = new URLSearchParams(queryData).toString();
    router.push(`/editor?${query}`);
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
          handleFormSubmit={handleFormSubmit}
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
