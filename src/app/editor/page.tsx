"use client";
import React, { useState } from "react";
import WritingPad from "../_components/writingPad/writingPad";
import { Box, Grid2 as Grid } from "@mui/material";
import CustomTabs from "../_components/CustomTabs/CustomTabs";
import { tabs } from "./_config/config";
import { EditorTabsEnum } from "./types/types";
import CreatePostForm from "./_components/createPostForm/CreatePostForm";
import editorMockData from "./mockDataEditor/mockdata";

const Page = () => {
  const [tab, setTab] = useState(EditorTabsEnum.EDITOR);
  const [isCreatePostFormOpen, setIsCreatePostFormOpen] = useState(false);

  const handleChange = (newTab: EditorTabsEnum) => {
    setTab(newTab);
  };

  const handleClose = () => {
    setIsCreatePostFormOpen(false);
  };
  const handleOpen = () => {
    setIsCreatePostFormOpen(true);
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
          borderBottom: "1px solid #E0E0E0",
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
          editorPostData={editorMockData.editorPost}
        />
      </Grid>
      {isCreatePostFormOpen ? (
        <CreatePostForm
          handleClose={handleClose}
          open={isCreatePostFormOpen}
          createPostFormData={editorMockData.editorPost.metadata}
        />
      ) : null}
    </Box>
  );
};

export default Page;
