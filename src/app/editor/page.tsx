"use client";

import { Box, Divider, Grid2 as Grid, Typography } from "@mui/material";
import WritingPad from "../_components/writingPad/WritingPad";
import CreatePostForm from "./_components/createPostForm/CreatePostForm";
import { EditorAppBar } from "./_components/editorAppBar/EditorAppBar";
import EditorLeftSideBarForIterations from "./_components/editorLeftSideBar/EditorLeftSideBarForIterations";
import EditorRightSideBar from "./_components/editorRightSideBar/EditorRightSideBar";
import FileUploader from "./_components/fileUploader/FileUploader";
import SendForReviewDialog from "./_components/sendForReviewDialog/SendForReviewDialog";
import { useCreatePostFormDataState } from "./_hooks/useCreatePostFormDataState";
import { useDraftEditorState } from "./_hooks/useDraftEditorState";
import { useQueryParams } from "./_hooks/useQueryParams";
import { useSendForReview } from "./_hooks/useSendForReview";
import useUploadTextFromFile from "./_hooks/useUploadTextFromFile";
import editorMockData from "./mockDataEditor/mockdata";
import { PostStatus } from "./types/types";
import { usePublishedPostEditorState } from "./_hooks/usePublishedPostEditorState";

const Page = () => {
  const { draftPostId, postId } = useQueryParams();

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

  const { publishedPost, updatePostContent, updatePostDetails } =
    usePublishedPostEditorState({ postId });

  const {
    isCreatePostFormOpen,
    openCreatePostForm,
    closeCreatePostForm,
    formData,
  } = useCreatePostFormDataState({
    postDetails: draftPost ? draftPost.postDetails : publishedPost?.postDetails,
  });

  const {
    sendForReviewDialogOpen,
    setSendForReviewDialogOpen,
    handleSendForReview,
  } = useSendForReview();

  const {
    isTextUploaderOpen,
    setIsTextUploaderOpen,
    uploadFileContentinNewIteration,
  } = useUploadTextFromFile({
    addIteration,
  });

  return (
    <>
      <EditorAppBar
        draftPost={draftPost}
        handleSaveLastIterationData={saveLastIterationData}
        handleAddIteration={addIteration}
        handleIterationSelected={handleIterationChange}
        selectedIterationId={selectedIteration?.id ?? ""}
        handleImportText={() => setIsTextUploaderOpen(true)}
      />

      <Grid
        size={2}
        sx={{
          mr: 4,
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
            lg: "flex",
          },
        }}
      >
        <EditorLeftSideBarForIterations
          showIterations={Boolean(draftPost)}
          iterations={draftPost?.iterations ?? []}
          handleSaveLastIterationData={saveLastIterationData}
          handleAddIteration={addIteration}
          handleIterationSelected={handleIterationChange}
          selectedIterationId={selectedIteration?.id ?? ""}
          handleImportText={() => setIsTextUploaderOpen(true)}
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
              key={draftPost ? selectedIteration?.id : publishedPost?.id}
              currentIterationId={selectedIteration?.id}
              handleOpen={() => openCreatePostForm()}
              handlePublish={async (content) => {
                if (publishedPost) {
                  await updatePostContent(content);
                } else {
                  await handlePublishEditorDraftIteration(content);
                }
              }}
              defaultContentToDisplay={
                (draftPost
                  ? selectedIteration?.content
                  : publishedPost?.content) ?? ""
              }
              handleEditorContentChange={handleEditorContentChange}
              postStatus={draftPost ? PostStatus.DRAFT : PostStatus.PUBLISHED}
              handleSendForReview={() => setSendForReviewDialogOpen(true)}
            />
          </Grid>
          {isCreatePostFormOpen && (
            <CreatePostForm
              handleClose={() => closeCreatePostForm()}
              open={isCreatePostFormOpen}
              createPostFormData={formData}
              handleFormSubmit={async (details) => {
                if (publishedPost) {
                  await updatePostDetails(details);
                } else {
                  await updateDraftPostDetails(details);
                }
                closeCreatePostForm();
              }}
              update={Boolean(draftPost)}
            />
          )}
          <FileUploader
            open={isTextUploaderOpen}
            onClose={() => setIsTextUploaderOpen(false)}
            onFileUpload={(file) => uploadFileContentinNewIteration(file)}
          />
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

      <Grid
        size={2}
        sx={{
          display: {
            xs: "none",
            sm: "none",
            md: "flex",
            lg: "flex",
          },
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          ml: 4,
          gap: "12px",
        }}
      >
        <EditorRightSideBar accuracy={editorMockData.accuracy} />
      </Grid>
    </>
  );
};

export default Page;
