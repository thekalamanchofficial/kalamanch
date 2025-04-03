"use client";

import dynamic from "next/dynamic";
import { Box, Grid2 as Grid } from "@mui/material";
import { EditorAppBar } from "./_components/editorAppBar/EditorAppBar";
import EditorLeftSideBarForIterations from "./_components/editorLeftSideBar/EditorLeftSideBarForIterations";
import EditorRightSideBar from "./_components/editorRightSideBar/EditorRightSideBar";
import FileUploader from "./_components/fileUploader/FileUploader";
import PublishPostForm from "./_components/publishPostForm/PublishPostForm";
import SendForReviewDialog from "./_components/sendForReviewDialog/SendForReviewDialog";
import { useCreatePostFormDataState } from "./_hooks/useCreatePostFormDataState";
import { useDraftEditorState } from "./_hooks/useDraftEditorState";
import { usePublishedPostEditorState } from "./_hooks/usePublishedPostEditorState";
import { useQueryParams } from "./_hooks/useQueryParams";
import { useSendForReview } from "./_hooks/useSendForReview";
import useUploadTextFromFile from "./_hooks/useUploadTextFromFile";
import editorMockData from "./mockDataEditor/mockdata";
import { PostStatus } from "./types/types";

const WritingPad = dynamic(() => import("../_components/writingPad/WritingPad"), { ssr: false });

const Page = () => {
  const { draftPostId, postId, shouldDraftPost } = useQueryParams();

  const {
    draftPost,
    saveLastIterationData,
    selectedIteration,
    handleIterationChange,
    handleEditorContentChange,
    addIteration,
    updateDraftPostDetails,
  } = useDraftEditorState({ draftPostId });

  const { publishedPost, updatePostContent, updatePostDetails } = usePublishedPostEditorState({
    postId,
  });

  const { isPublishPostFormOpen, openPublishPostForm, closePublishPostForm, formData } =
    useCreatePostFormDataState({
      postDetails: publishedPost,
    });

  const { sendForReviewDialogOpen, setSendForReviewDialogOpen, handleSendForReview } =
    useSendForReview();

  const { isTextUploaderOpen, setIsTextUploaderOpen, uploadFileContentinNewIteration } =
    useUploadTextFromFile({
      addIteration,
    });

  const handlePublish = async (content: string) => {
    if (!publishedPost) {
      console.error("No published post found");
      return;
    }
    await updatePostContent(content);
  };

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
            md: "flex",
          },
        }}
      >
        <EditorLeftSideBarForIterations
          showIterations={Boolean(draftPost)}
          showImportText={Boolean(!postId)}
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
          width: {
            xs: "100%",
            sm: "85%",
            md: "55%",
            lg: "60%",
          },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Grid size={12} sx={{ height: "90vh", width: "100%" }}>
            <WritingPad
              key={draftPost ? selectedIteration?.id : publishedPost?.id}
              defaultTitle={draftPost?.title ?? publishedPost?.title ?? ""}
              currentIterationId={selectedIteration?.id}
              handleOpen={() => openPublishPostForm()}
              handlePublish={async (content) => {
                await handlePublish(content);
              }}
              defaultContentToDisplay={
                (draftPost ? selectedIteration?.content : publishedPost?.content) ?? ""
              }
              handleEditorContentChange={handleEditorContentChange}
              postStatus={draftPost || shouldDraftPost ? PostStatus.DRAFT : PostStatus.PUBLISHED}
              handleSendForReview={() => setSendForReviewDialogOpen(true)}
              draftPostId={draftPost?.id}
            />
          </Grid>
          {isPublishPostFormOpen && (
            <PublishPostForm
              handleClose={() => closePublishPostForm()}
              open={isPublishPostFormOpen}
              postFormData={{
                ...formData,
                postTypeId: formData?.postType?.id,
                showThumbnail: formData?.shoewThumbnail,
              }}
              handleFormSubmit={async (details) => {
                if (publishedPost) {
                  await updatePostDetails(details);
                } else {
                  await updateDraftPostDetails(details);
                }
                closePublishPostForm();
              }}
              update={Boolean(publishedPost)}
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
                handleSendForReview(selectedUsersForReview, selectedIteration?.id)
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
