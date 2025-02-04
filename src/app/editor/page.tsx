"use client";

import React from "react";
import { Box, Divider, Grid2 as Grid, Typography } from "@mui/material";
import React from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import WritingPad from "../_components/writingPad/WritingPad";
import EditorLeftSideBarForIterations from "./_components/editorLeftSideBar/EditorLeftSideBarForIterations";
import CreatePostForm from "./_components/createPostForm/CreatePostForm";
import { useQueryParams } from "./_hooks/useQueryParams";
import { useDraftEditorState } from "./_hooks/useDraftEditorState";
import { useCreatePostFormDataState } from "./_hooks/useCreatePostFormDataState";
import { usePublishedPostEditorState } from "./_hooks/usePublishedPostEditorState";
import { useNavigateToPostEditor } from "./_hooks/useNavigateToPostEditor";
import LeftSideBarForPosts from "../_components/leftSideBarForPosts/LeftSideBarForPosts";
import FileUploader from "./_components/fileUploader/FileUploader";
import SendForReviewDialog from "./_components/sendForReviewDialog/SendForReviewDialog";
import { useSendForReview } from "./_hooks/useSendForReview";
import { PostStatus } from "./types/types";
import EditorRightSideBar from "./_components/editorRightSideBar/EditorRightSideBar";
import editorMockData from "./mockDataEditor/mockdata";
import { EditorAppBar } from "./_components/editorAppBar/EditorAppBar";
import useUploadTextFromFile from "./_hooks/useUploadTextFromFile";

const Page = () => {
  const { draftPostId } = useQueryParams();
  const { activeTab, changeTab } = useTabs();
  const { postId, draftPostId } = useQueryParams();
  const { publishedPostsForUser, setPublishedPostsForUser } = useUserPostsState(
    { activeTab },
  ); // Needed for Published Posts Tab
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
  const { handlePostUnPublishing } = usePostUnpublishing({
    setPublishedPostsForUser,
  });
  const { navigateToPostEditor } = useNavigateToPostEditor({ changeTab });
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
        activeTab={activeTab}
        publishedPosts={publishedPostsForUser}
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
        />
        {activeTab === EditorTabsEnum.PUBLISHED && (
          <LeftSideBarForPosts
            draftPosts={[]}
            draftIterationsSentForReview={[]}
            publishedPosts={publishedPostsForUser}
            entityType={PostEntityType.PUBLISHED_POST}
          />
        )}
        {activeTab === EditorTabsEnum.EDITOR && (
          <EditorLeftSideBarForIterations
            showIterations={Boolean(draftPost)}
            iterations={draftPost?.iterations ?? []}
            handleSaveLastIterationData={saveLastIterationData}
            handleAddIteration={addIteration}
            handleIterationSelected={handleIterationChange}
            selectedIterationId={selectedIteration?.id ?? ""}
            handleImportText={() => setIsTextUploaderOpen(true)}
          />
        )}
      </Grid>

      <Grid
        size={{ xs: 12, sm: 12, md: 7, lg: 7 }}
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
        <Box sx={{ height: "100%", width: "100%" }}>
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
            <CustomTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={changeTab}
            />
          </Grid>
          <Grid size={12} sx={{ height: "100%", width: "100%" }}>
            {activeTab === EditorTabsEnum.EDITOR && (
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
            )}
            {activeTab === EditorTabsEnum.PUBLISHED && (
              <EditorPublishedPostsSection
                posts={publishedPostsForUser}
                handleOnPostUnpublish={handlePostUnPublishing}
                handleOnPostEdit={(postId: string) =>
                  navigateToPostEditor(postId, PostStatus.PUBLISHED)
                }
              />
            )}
          </Grid>
          {isCreatePostFormOpen && (
            <CreatePostForm
              handleClose={() => closeCreatePostForm()}
              open={isCreatePostFormOpen}
              createPostFormData={formData}
              handleFormSubmit={async (details) => {
                await updateDraftPostDetails(details);
              handleFormSubmit={async (details) => {
                if (publishedPost) {
                  await updatePostDetails(details);
                } else {
                  await updateDraftPostDetails(details);
                }
                closeCreatePostForm();
              }}
              update={Boolean(draftPost)}
              update={Boolean(publishedPost ?? draftPost)}
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
