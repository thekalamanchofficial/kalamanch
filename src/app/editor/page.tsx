"use client";
import React, { useState } from "react";
import WritingPad from "../_components/writingPad/WritingPad";
import { Box, Grid2 as Grid } from "@mui/material";
import CustomTabs from "../_components/CustomTabs/CustomTabs";
import { tabs } from "./_config/config";
import { type CreatePostFormType, EditorPost, EditorTabsEnum, Post } from "./types/types";
import CreatePostForm from "./_components/createPostForm/CreatePostForm";
import { useSearchParams } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { PostType } from "@prisma/client";
import { trpc } from "~/server/client";

 
const Page = () => {
  const [tab, setTab] = useState(EditorTabsEnum.EDITOR);
  const [isCreatePostFormOpen, setIsCreatePostFormOpen] = useState(false);

  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const { user } = useClerk();

  const userMutation = trpc.user;

  const { data: userDetails  } = userMutation.getUserDetails.useQuery(
    user?.primaryEmailAddress?.emailAddress ?? "", // Use empty string as fallback to prevent undefined
  );

  const handleChange = (newTab: EditorTabsEnum) => {
    setTab(newTab);
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

  const postData: Post = {
    title: queryParams.title ?? "",
    authorId: userDetails?.id ?? "",
    authorName: userDetails?.name ?? "",
    authorProfile: "abc",
    content: "",
    media: {
      thumbnailPicture: ["https://picsum.photos/id/237/200/300"],
      thumbnailContent: "Dog",
      thumbnailTitle: "Dogs",
    },
    tags: queryParams.tags?.split(",") ?? [],
    likeCount: 0
    
  };

  const editPostData: EditorPost = {
    title: queryParams.title ?? "",
    authorName: userDetails?.name ?? "",
    authorProfile: "abc",
    authorId: userDetails?.id ?? "",
    content: "",
    metadata: {
      title: queryParams.title ?? "",
      targetAudience: queryParams.targetAudience?.split(",") ?? [],
      thumbnailUrl: "https://picsum.photos/id/237/200/300",
      postType: PostType[queryParams.postType?.toUpperCase() as keyof typeof PostType] ?? PostType.ARTICLE,
      actors: queryParams.actors ? queryParams.actors.split(",") : [],
      tags: queryParams.tags?.split(",") ?? [],
    },
    iterations: [],
  };
  console.log(editPostData);

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
          editorPostData={editPostData}
          postData={postData}
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
