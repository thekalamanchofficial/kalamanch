"use client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Box, Divider, Grid2 as Grid, Typography } from "@mui/material";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import React from "react";
import { type DraftPost, PostEntityType } from "../../editor/types/types";
import type { IterationWithReviews, Post } from "~/app/(with-sidebar)/myfeed/types/types";
import { useRouter } from "next/navigation";
import { useSelectedDraftPost } from "../../drafts/_contexts/SelectedDraftPostContext";
import { useSelectedPublishedPost } from "../../editor/_contexts/SelectedPublishedPostContext";
import { useSelectedDraftIteration } from "~/app/review-feedback/_contexts/SelectedDraftIterationContext";

type LeftSideBarPropsForPosts = {
  draftPosts: DraftPost[];
  publishedPosts: Post[];
  draftIterationsSentForReview: IterationWithReviews[]
  entityType: PostEntityType;
};

const LeftSideBarForPosts: React.FC<LeftSideBarPropsForPosts> = ({
  draftPosts,
  publishedPosts,
  draftIterationsSentForReview,
  entityType
}) => {
  const router = useRouter();
  const {selectedDraftPostId ,setSelectedDraftPostIdInLeftSideBar} = useSelectedDraftPost();
  const {selectedPublishedPostId,setSelectedPublishedPostIdInLeftSideBar} = useSelectedPublishedPost();
  const {selectedDraftIterationId,setSelectedDraftIterationIdInLeftSideBar} = useSelectedDraftIteration();

  return (
    <Grid
      columns={1}
      sx={{
        width: "100%",
        height: "90vh",
        spacing: 3,
        backgroundColor: "white",
        position: "relative",
        overflowY: "scroll", 
        scrollbarWidth: "none",
        py: 1
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          py: "4px",
          px: 2,
          cursor: "pointer",
        }}
        onClick={() => {
          router.push("/");
        }}
      >
        <ArrowBackIosIcon
          sx={{
            fontSize: "20px",
          }}
        />
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            color: "common.gray",
          }}
        >
          {STATIC_TEXTS.EDITOR_PAGE.HEADING}
        </Typography>
      </Box>

      <Divider
        sx={{
          width: "100%",
        }}
      />

      <Grid
        container
        sx={{
          marginTop: 2,
          px: 3,
          gap: "20px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          {entityType.toString()}
        </Typography>
        { entityType === PostEntityType.DRAFT_POST && <Box
          sx={{
            color: "black",
            width: "100%",
          
          }}
        >
          {draftPosts.map((item, _index) => {
            return (
              <Box
                sx={{
                  borderRadius: "4px",
                  border: "1px solid ",
                  borderColor: "common.strokePrimary",
                  padding: "8px 10px",
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                key={item.id}
                onClick={() => setSelectedDraftPostIdInLeftSideBar(item.id ?? "")}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: (item.id) == selectedDraftPostId  ? "primary.main" : "font.secondary",
                    
                  }}
                >
                  {item.postDetails.title}
                </Typography>
                <ArrowForwardIosOutlinedIcon
                  sx={{
                    color: (item.id) == selectedDraftPostId ? "#260EB9" : "common.gray",
                    fontSize: "12px",
                  }}
                />
              </Box>
            );
          })}
        </Box>}
        { entityType === PostEntityType.PUBLISHED_POST && 
        <Box 
          sx={{
            color: "black",
            width: "100%",
          }}
        >
          {publishedPosts.map((item, _index) => {
            return (
              <Box
                sx={{
                  borderRadius: "4px",
                  border: "1px solid ",
                  borderColor: "common.strokePrimary",
                  padding: "8px 10px",
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                key={item.id}
                onClick={() => setSelectedPublishedPostIdInLeftSideBar(item.id ?? "")}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: (item.id) == selectedPublishedPostId  ? "#260EB9" : "font.secondary",
                    
                  }}
                >
                  {item.postDetails.title}
                </Typography>
                <ArrowForwardIosOutlinedIcon
                  sx={{
                    color: (item.id) == selectedPublishedPostId ? "#260EB9" : "common.gray",
                    fontSize: "12px",
                  }}
                />
              </Box>
            );
          })}
        </Box>}
        { entityType === PostEntityType.DRAFT_ITERATION_SENT_FOR_REVIEW && <Box
          sx={{
            color: "black",
            width: "100%",
          
          }}
        >
          {draftIterationsSentForReview.map((item) => {
            return (
              <Box
                sx={{
                  borderRadius: "4px",
                  border: "1px solid ",
                  borderColor: "common.strokePrimary",
                  padding: "8px 10px",
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                key={item.id}
                onClick={() => setSelectedDraftIterationIdInLeftSideBar(item.id ?? "")}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: (item.id) == selectedDraftIterationId  ? "primary.main" : "font.secondary",
                    
                  }}
                >
                  {item.DraftPost.postDetails.title + " - " + item.iterationName}
                </Typography>
                <ArrowForwardIosOutlinedIcon
                  sx={{
                    color: (item.id) == selectedDraftIterationId ? "primary.main" : "common.gray",
                    fontSize: "12px",
                  }}
                />
              </Box>
            );
          })}
        </Box>}
      </Grid>
    </Grid>
  );
};

export default LeftSideBarForPosts;
