"use client";

import React from "react";
import { Box, Grid2 as Grid, Typography } from "@mui/material";
import LeftSideBarForPosts from "../_components/leftSideBarForPosts/LeftSideBarForPosts";
import Loader from "../_components/loader/Loader";
import ShowMessage from "../_components/showMessage/ShowMessage";
import { useNavigateToPostEditor } from "../editor/_hooks/useNavigateToPostEditor";
import { PostEntityType, PostStatus } from "../editor/types/types";
import { DraftAppBar } from "./_components/draftAppBar/DraftAppBar";
import DraftPostsSection from "./_components/draftPostsSection/DraftPostsSection";
import { useUserDraftPostsState } from "./_hooks/useUserDraftPosts";

const Page = () => {
  const { draftPostsForUser, isLoading, isPending } = useUserDraftPostsState();

  const { navigateToPostEditor } = useNavigateToPostEditor({});

  return (
    <>
      <DraftAppBar
        draftPosts={draftPostsForUser}
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
          {!isLoading && !isPending ? (
            <Grid size={12} sx={{ height: "100%", width: "100%" }}>
              {draftPostsForUser.length > 0 ? (
                <DraftPostsSection
                  draftPosts={draftPostsForUser}
                  handleEditDraftPost={(postId: string) =>
                    navigateToPostEditor(postId, PostStatus.DRAFT)
                  }
                />
              ) : (
                <Box
                  sx={{
                    minHeight: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <ShowMessage
                    title="No Drafts Found."
                    style={{
                      width: "100%",
                      maxWidth: "15rem",
                      p: "1rem",
                      backgroundColor: "secondary.main",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" mt={2}>
                    Start creating new drafts from the editor.
                  </Typography>
                </Box>
              )}
            </Grid>
          ) : (
            <Loader height="100%" width="100%" />
          )}
        </Box>
      </Grid>
    </>
  );
};

export default Page;
