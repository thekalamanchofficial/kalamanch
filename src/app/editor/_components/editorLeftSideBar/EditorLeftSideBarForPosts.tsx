"use client";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhoto";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Box, Button, Divider, Grid2 as Grid, Typography } from "@mui/material";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import React from "react";
import { DraftPost, PostStatus } from "../../types/types";
import { useRouter } from "next/navigation";
import { Post } from "~/app/(with-sidebar)/myfeed/types/types";
import { useSelectedDraftPost } from "../../contexts/SelectedDraftPostContext";
import { useSelectedPublishedPost } from "../../contexts/SelectedPublishedPostContext";

type EditorLeftSideBarPropsForPosts = {
  draftPosts: DraftPost[];
  publishedPosts: Post[];
  postStatus: PostStatus;
};

const EditorLeftSideBarForPosts: React.FC<EditorLeftSideBarPropsForPosts> = ({
  draftPosts,
  publishedPosts,
  postStatus
}) => {
  const router = useRouter();
  const {selectedDraftPostId , setSelectedDraftPostId} = useSelectedDraftPost();
  const {selectedPublishedPostId, setSelectedPublishedPostId} = useSelectedPublishedPost();

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
          {postStatus === PostStatus.DRAFT ? "Draft Posts" :"Published Posts"}
        </Typography>
        { postStatus === PostStatus.DRAFT && <Box
          sx={{
            color: "black",
            width: "100%",
          
          }}
        >
          {draftPosts.map((item,index) => {
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
                onClick={() => setSelectedDraftPostId(item.id ?? "")}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: (item.id) == selectedDraftPostId  ? "#260EB9" : "font.secondary",
                    
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
        {postStatus === PostStatus.PUBLISHED && 
        <Box 
          sx={{
            color: "black",
            width: "100%",
          }}
        >
          {publishedPosts.map((item,index) => {
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
                onClick={() => setSelectedPublishedPostId(item.id ?? "")}
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
      </Grid>
    </Grid>
  );
};

export default EditorLeftSideBarForPosts;
