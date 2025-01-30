"use client";

import React from "react";
import { Box, Divider, Grid2 as Grid, Typography } from "@mui/material";
import WritingPad from "../_components/writingPad/WritingPad";
import EditorLeftSideBarForIterations from "./_components/editorLeftSideBar/EditorLeftSideBarForIterations";
import CreatePostForm from "./_components/createPostForm/CreatePostForm";
import { useQueryParams } from "./_hooks/useQueryParams";
import { useDraftEditorState } from "./_hooks/useDraftEditorState";
import { useCreatePostFormDataState } from "./_hooks/useCreatePostFormDataState";
import SendForReviewDialog from "./_components/sendForReviewDialog/SendForReviewDialog";
import { useSendForReview } from "./_hooks/useSendForReview";
import { PostStatus } from "./types/types";

const Page = () => {
  const { draftPostId } = useQueryParams();
  const {
    draftPost,
    saveLastIterationData,
    selectedIteration,
    handleIterationChange,
    handleEditorContentChange,
    addIteration,
    handlePublishEditorDraftIteration,
    updateDraftPostDetails,
  } = useDraftEditorState({ draftPostId });

  const {
    isCreatePostFormOpen,
    openCreatePostForm,
    closeCreatePostForm,
    formData,
  } = useCreatePostFormDataState({
    postDetails: draftPost?.postDetails,
  });

  const {
    sendForReviewDialogOpen,
    setSendForReviewDialogOpen,
    handleSendForReview,
  } = useSendForReview();

  return (
    <>
      <Grid
        size={2}
        sx={{
          mr: 4,
        }}
      >
        <EditorLeftSideBarForIterations
          showIterations={Boolean(draftPost)}
          iterations={draftPost?.iterations ?? []}
          handleSaveLastIterationData={saveLastIterationData}
          handleAddIteration={addIteration}
          handleIterationSelected={handleIterationChange}
          selectedIterationId={selectedIteration?.id ?? ""}
        />
      </Grid>

      <Grid
        size={7}
        sx={{
          backgroundColor: "white",
          height: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ padding: "8px 20px" }}>
          <Typography
            sx={{ fontWeight: "bold", fontSize: "16px", color: "primary.main" }}
          >
            Editor
          </Typography>
        </Box>
        <Divider />
        <Box>
          <Grid size={12} sx={{ height: "90vh", width: "100%" }}>
            <WritingPad
              key={draftPost ? selectedIteration?.id : "empty"}
              currentIterationId={selectedIteration?.id}
              handleOpen={() => openCreatePostForm()}
              handlePublish={async (content) => {
                await handlePublishEditorDraftIteration(content);
              }}
              defaultContentToDisplay={
                draftPost ? (selectedIteration?.content ?? "") : ""
              }
              handleEditorContentChange={handleEditorContentChange}
              postStatus={PostStatus.DRAFT}
              handleSendForReview={() => setSendForReviewDialogOpen(true)}
            />
          </Grid>
          {isCreatePostFormOpen && (
            <CreatePostForm
              handleClose={() => closeCreatePostForm()}
              open={isCreatePostFormOpen}
              createPostFormData={formData}
              handleFormSubmit={async (details) => {
                await updateDraftPostDetails(details);
                closeCreatePostForm();
              }}
              update={Boolean(draftPost)}
            />
          )}
          {sendForReviewDialogOpen && (
            <SendForReviewDialog
              open={sendForReviewDialogOpen}
              onClose={() => setSendForReviewDialogOpen(false)}
              onSubmit={(selectedUsersForReview: string[]) =>
                handleSendForReview(
                  selectedUsersForReview,
                  selectedIteration?.id,
                )
              }
            />
          )}
        </Box>
      </Grid>
    </>
  );
};

export default Page;
