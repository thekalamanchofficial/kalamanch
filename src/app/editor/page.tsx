"use client";

import React from "react";
import { Box, CircularProgress, Grid2 as Grid } from "@mui/material";
import WritingPad from "../_components/writingPad/WritingPad";
import CustomTabs from "../_components/CustomTabs/CustomTabs";
import EditorLeftSideBar from "./_components/editorLeftSideBar/EditorLeftSideBar";
import CreatePostForm from "./_components/createPostForm/CreatePostForm";
import { useQueryParams } from "./_hooks/useQueryParams";
import { useEditorState } from "./_hooks/useEditorState";
import { usePostPublishing } from "./_hooks/usePostPublishing";
import { tabs } from "./_config/config";
import { useTabs } from "./_hooks/useTabs";

const Page = () => {
  const { activeTab, changeTab } = useTabs();
  const queryParams = useQueryParams();
  

  const {
    isLoading,
    draftPost,
    saveLastIterationData,
    selectedIteration,
    handleIterationChange,
    handleEditorContentChange,
    addIteration
  } = useEditorState(queryParams.draftPostId);

  const { isCreatePostFormOpen, openCreatePostForm, closeCreatePostForm, handlePublishPost, formData } =
    usePostPublishing(queryParams);


  return (
    <>
      <Grid
        size={2}
        sx={{
          mr: 4,
        }}
      >
        <EditorLeftSideBar
          iterations={draftPost?.iterations ?? []}
          handleSaveLastIterationData={saveLastIterationData}
          handleAddIteration={addIteration}
          handleIterationSelected={handleIterationChange}
          selectedIterationId= {selectedIteration?.id ?? ""}
        />
      </Grid>

      <Grid
        size={7}
        sx={{
          backgroundColor: "white",
          height: "90vh",
          display: "flex",
        }}
      >
        <Box sx={{ height: "100%", width: "100%" }}>
          <Grid size={12} sx={{ display: "flex", justifyContent: "start", alignItems: "start", px: "4px", pt: "8px" }}>
            <CustomTabs tabs={tabs} activeTab={activeTab} onTabChange={changeTab} />
          </Grid>
          <Grid size={12} sx={{ height: "100%", width: "100%", overflowY: "scroll", scrollbarWidth: "none" }}>
            {selectedIteration && ( 
              <WritingPad
                key={selectedIteration.id} 
                currentIterationId={selectedIteration.id}
                handleOpen={() => openCreatePostForm()}
                handlePublish={handlePublishPost}
                defaultContentToDisplay={selectedIteration.content}
                handleEditorContentChange={handleEditorContentChange}
              />
            )}
          </Grid>
          {isCreatePostFormOpen && (
            <CreatePostForm
              handleClose={() => closeCreatePostForm()}
              open={isCreatePostFormOpen}
              createPostFormData={formData}
            />
          )}
        </Box>
      </Grid>
    </>
  );
};

export default Page;
