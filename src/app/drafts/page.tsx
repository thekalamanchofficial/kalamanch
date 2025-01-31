"use client";
import React from "react";
import { Box, Grid2 as Grid } from "@mui/material";
import { PostEntityType, PostStatus } from "../editor/types/types";
import { useNavigateToPostEditor } from "../editor/_hooks/useNavigateToPostEditor";
import { useUserDraftPostsState } from "./_hooks/useUserDraftPosts";
import DraftPostsSection from "./_components/draftPostsSection/DraftPostsSection";
import { useDraftPostIterationPublishing } from "./_hooks/useDraftPostIterationPublishing";
import LeftSideBarForPosts from "../_components/leftSideBarForPosts/LeftSideBarForPosts";
import { DraftAppBar } from "./_components/draftAppBar/DraftAppBar";

const Page = () => {
  const { draftPostsForUser } = useUserDraftPostsState(); // Needed to get all draft posts
  const { handlePublishDraftPostIteration } = useDraftPostIterationPublishing();
  const { navigateToPostEditor } = useNavigateToPostEditor({});

  return (
    <>
      <DraftAppBar
        draftPosts={draftPostsForUser}
        publishedPosts={[]} // TODO: Remove this
        draftIterationsSentForReview={[]}
        entityType={PostEntityType.DRAFT_POST}
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
        <LeftSideBarForPosts
          draftPosts={draftPostsForUser}
          publishedPosts={[]} // TODO: Remove this
          draftIterationsSentForReview={[]}
          entityType={PostEntityType.DRAFT_POST}
        />
      </Grid>

      <Grid
        size={{ xs: 12, sm: 12, md: 7, lg: 7 }}
        sx={{
          backgroundColor: "white",
          height: "90vh",
          display: "flex",
        }}
      >
        <Box sx={{ height: "100%", width: "100%" }}>
          <Grid size={12} sx={{ height: "100%", width: "100%" }}>
            <DraftPostsSection
              draftPosts={draftPostsForUser}
              handlePublishDraftPostIteration={handlePublishDraftPostIteration}
              handleEditDraftPost={(postId: string) =>
                navigateToPostEditor(postId, PostStatus.DRAFT)
              }
            />
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default Page;
