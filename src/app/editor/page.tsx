"use client";

import { Box, Grid2 as Grid } from "@mui/material";
import WritingPad from "../_components/writingPad/WritingPad";
import CustomTabs from "../_components/CustomTabs/CustomTabs";
import EditorLeftSideBarForIterations from "./_components/editorLeftSideBar/EditorLeftSideBarForIterations";
import CreatePostForm from "./_components/createPostForm/CreatePostForm";
import { useQueryParams } from "./_hooks/useQueryParams";
import { useDraftEditorState } from "./_hooks/useDraftEditorState";
import { usePostUnpublishing } from "./_hooks/usePostUnpublishing";
import { tabs } from "./_config/config";
import { useTabs } from "./_hooks/useTabs";
import { EditorTabsEnum, PostEntityType, PostStatus } from "./types/types";
import EditorPublishedPostsSection from "./_components/editorPublishedPostsSection/EditorPublishedPostsSection";
import { useUserPostsState } from "./_hooks/useUserPosts";
import { useCreatePostFormDataState } from "./_hooks/useCreatePostFormDataState";
import { usePublishedPostEditorState } from "./_hooks/usePublishedPostEditorState";
import { useNavigateToPostEditor } from "./_hooks/useNavigateToPostEditor";
import LeftSideBarForPosts from "../_components/leftSideBarForPosts/LeftSideBarForPosts";
import FileUploader from "./_components/textUploader/TextUploader";
import SendForReviewDialog from "./_components/sendForReviewDialog/SendForReviewDialog";
import { useSendForReview } from "./_hooks/useSendForReview";
import useUploadTextFromFile from "./_hooks/useFileToText";

const Page = () => {
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
    setFileContentinNewIteration,
  } = useUploadTextFromFile({
    handleEditorContentChange,
    selectedIterationId: selectedIteration?.id ?? "",
    addIteration,
  });

  return (
    <>
      <Grid
        size={2}
        sx={{
          mr: 4,
        }}
      >
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
        size={7}
        sx={{
          backgroundColor: "white",
          height: "90vh",
          display: "flex",
        }}
      >
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
                key={draftPost ? selectedIteration?.id : publishedPost?.content}
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
                if (publishedPost) {
                  await updatePostDetails(details);
                } else {
                  await updateDraftPostDetails(details);
                }
                closeCreatePostForm();
              }}
              update={Boolean(publishedPost ?? draftPost)}
            />
          )}
          <FileUploader
            open={isTextUploaderOpen}
            onClose={() => setIsTextUploaderOpen(false)}
            onFileUpload={(file) => setFileContentinNewIteration(file)}
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
    </>
  );
};

export default Page;
