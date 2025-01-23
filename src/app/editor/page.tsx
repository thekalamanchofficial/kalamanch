"use client";

import React from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import WritingPad from "../_components/writingPad/WritingPad";
import CustomTabs from "../_components/CustomTabs/CustomTabs";
import EditorLeftSideBarForIterations from "./_components/editorLeftSideBar/EditorLeftSideBarForIterations";
import CreatePostForm from "./_components/createPostForm/CreatePostForm";
import { useQueryParams } from "./_hooks/useQueryParams";
import { useDraftEditorState } from "./_hooks/useDraftEditorState";
import { usePostPublishing } from "./_hooks/usePostPublishing";
import { tabs } from "./_config/config";
import { useTabs } from "./_hooks/useTabs";
import { EditorTabsEnum, PostStatus } from "./types/types";
import EditorDraftPostsSection from "./_components/editorDraftPostsSection/EditorDraftPostsSection";
import EditorPublishedPostsSection from "./_components/editorPublishedPostsSection/EditorPublishedPostsSection";
import EditorLeftSideBarForPosts from "./_components/editorLeftSideBar/EditorLeftSideBarForPosts";
import { useUserPostsState } from "./_hooks/useUserPosts";
import { useCreatePostFormDataState } from "./_hooks/useCreatePostFormDataState";
import { usePublishedPostEditorState } from "./_hooks/usePublishedPostEditorState";
import { useNavigateToPostEditor } from "./_hooks/useNavigateToPostEditor";

const Page = () => {
  const { activeTab, changeTab } = useTabs();
  const {postId,draftPostId} = useQueryParams();
  const {draftPostsForUser, publishedPostsForUser,setPublishedPostsForUser } = useUserPostsState({activeTab}); // Needed for Published,Draft Posts Tab
  const {
    draftPost,
    setDraftPost,
    saveLastIterationData,
    selectedIteration,
    handleIterationChange,
    handleEditorContentChange,
    addIteration,
    handlePublishEditorDraftIteration,
    updateDraftPostDetails,
  } = useDraftEditorState({draftPostId});

  const {publishedPost,setPublishedPost, updatePostContent,updatePostDetails } = usePublishedPostEditorState({postId});
  const {isCreatePostFormOpen,openCreatePostForm, closeCreatePostForm, formData } = useCreatePostFormDataState({ postDetails: draftPost ? draftPost.postDetails : publishedPost?.postDetails});
  const {handlePublishDraftPostIteration,handlePostUnPublishing } = usePostPublishing({setPublishedPostsForUser});
  const {navigateToPostEditor} = useNavigateToPostEditor({setDraftPost,setPublishedPost,changeTab});

  return (
    <>
      <Grid
        size={2}
        sx={{
          mr: 4,
        }}
      >
        {
          activeTab === EditorTabsEnum.DRAFTS && (
            <EditorLeftSideBarForPosts
              draftPosts={draftPostsForUser}
              publishedPosts={publishedPostsForUser}
              postStatus={PostStatus.DRAFT}

            />
          )
        }
        {
          activeTab === EditorTabsEnum.PUBLISHED && (
            <EditorLeftSideBarForPosts
              draftPosts={draftPostsForUser}
              publishedPosts={publishedPostsForUser}
              postStatus={PostStatus.PUBLISHED}
            />
          )
        }
        {
           activeTab === EditorTabsEnum.EDITOR && (
          <EditorLeftSideBarForIterations
            showIterations = {Boolean(draftPost)}
            iterations={draftPost?.iterations ?? []}
            handleSaveLastIterationData={saveLastIterationData}
            handleAddIteration={addIteration}
            handleIterationSelected={handleIterationChange}
            selectedIterationId= {selectedIteration?.id ?? ""}
        />)
        }
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
          <Grid size={12} sx={{ height: "100%", width: "100%" }}>
            {activeTab === EditorTabsEnum.EDITOR  && ( 
              <WritingPad
                key = {draftPost ? selectedIteration?.id : publishedPost?.content}
                currentIterationId={selectedIteration?.id}
                handleOpen={() => openCreatePostForm()}
                handlePublish={async (content) => {
                  if (publishedPost) {
                    await updatePostContent(content);
                  } else {
                    await handlePublishEditorDraftIteration(content);
                  }
                }}
                defaultContentToDisplay={(draftPost ? selectedIteration?.content : publishedPost?.content) ?? ""}
                handleEditorContentChange={handleEditorContentChange}
                postStatus= {draftPost ? PostStatus.DRAFT : PostStatus.PUBLISHED}
              />
            )}
            {activeTab === EditorTabsEnum.DRAFTS  && ( 
              <EditorDraftPostsSection
                draftPosts={draftPostsForUser}
                handlePublishDraftPostIteration={handlePublishDraftPostIteration}
                handleEditDraftPost = {(postId) => navigateToPostEditor(postId,PostStatus.DRAFT)}
              />
            )}
            {activeTab === EditorTabsEnum.PUBLISHED  && ( 
              <EditorPublishedPostsSection
                posts={publishedPostsForUser}
                handleOnPostUnpublish={handlePostUnPublishing}
                handleOnPostEdit={(postId: string) => navigateToPostEditor(postId,PostStatus.PUBLISHED)}
              />
            )}
          </Grid>
          {isCreatePostFormOpen && (
            <CreatePostForm
              handleClose={() => closeCreatePostForm()}
              open={isCreatePostFormOpen}
              createPostFormData={formData}
              handleFormSubmit={async(details) => {
                if(publishedPost){
                  await updatePostDetails(details);
                }
                else{
                  await updateDraftPostDetails(details);
                }
                closeCreatePostForm();
              }}
              update = {Boolean(publishedPost ?? draftPost)}
            />
          )}
        </Box>
      </Grid>
    </>
  );
};

export default Page;
