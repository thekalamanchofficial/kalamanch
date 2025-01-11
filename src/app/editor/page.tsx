"use client";
import React, { useState } from "react";
import WritingPad from "../_components/writingPad/WritingPad";
import { Box, Grid2 as Grid } from "@mui/material";
import CustomTabs from "../_components/CustomTabs/CustomTabs";
import { tabs } from "./_config/config";
import { type CreatePostFormType, EditorTabsEnum } from "./types/types";
import CreatePostForm from "./_components/createPostForm/CreatePostForm";
import editorMockData from "./mockDataEditor/mockdata";
import { useSearchParams } from "next/navigation";
import { useUser } from "~/context/userContext";
import { trpc } from "~/server/client";
import { handleError } from "../_utils/handleError";

const Page = () => {
  const [tab, setTab] = useState(EditorTabsEnum.EDITOR);
  const [isCreatePostFormOpen, setIsCreatePostFormOpen] = useState(false);

  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const postMutation = trpc.post.addPost.useMutation();
  const postId = queryParams.postId ?? "";
  const draftPostId = queryParams.draftPostId ?? "";
  const {user} = useUser();
  const defaultContent = "";


  console.log(user);

  const handleChange = (newTab: EditorTabsEnum) => {
    setTab(newTab);
  };

  const handlePublishPost = (content: string) => {

    void postMutation.mutateAsync({
      content: content,
      authorId: user?.id ?? "",
      authorName: user?.name ?? "",
      authorProfileImageUrl: user?.profileImageUrl ?? "",
      postDetails: {
        title: queryParams.title ?? "",
        targetAudience: queryParams.targetAudience?.split(",") ?? [],
        postType: queryParams.postType ?? "",
        actors: queryParams.actors ? queryParams.actors.split(",") : [],
        tags: queryParams.tags?.split(",") ?? [],
        thumbnailDetails: {
          url: queryParams.thumbnailUrl ?? "",
        },
      },
    }).catch((error) => {
      handleError(error);
    });

    setIsCreatePostFormOpen(false);
  };

  const handleClose = () => {
    setIsCreatePostFormOpen(false);
  };
  const handleOpen = () => {
    setIsCreatePostFormOpen(true);
  };

  const formData: CreatePostFormType = {
    title: queryParams.title ?? "",
    actors: queryParams.actors ? queryParams.actors.split(",") : [],
    thumbnailUrl: queryParams.thumbnailUrl ?? "",
    tags: queryParams.tags?.split(",") ?? [],
    postType: queryParams.postType ?? "",
    targetAudience: queryParams.targetAudience?.split(",") ?? [],
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Grid
        size={12}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          px: "4px",
          pt: "8px",
        }}
      >
        <CustomTabs tabs={tabs} activeTab={tab} onTabChange={handleChange} />
      </Grid>
      <Grid
        size={12}
        sx={{
          height: "100%",
          width: "100%",
          overflowY: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <WritingPad
          handleOpen={handleOpen}
          handlePublish={handlePublishPost}
          defaultContentToDisplay={defaultContent}
        />
      </Grid>
      {isCreatePostFormOpen ? (
        <CreatePostForm
          handleClose={handleClose}
          open={isCreatePostFormOpen}
          createPostFormData={formData}
        />
      ) : null}
    </Box>
  );
};

export default Page;
