import {
  Box,
  Grid2 as Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { type CommentSectionProps } from "~/app/(with-sidebar)/myfeed/types/types";
import CommentCard from "~/app/_components/commentCard/CommentCard";
import { toast } from "react-toastify";

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  addComment,
}) => {
  const [newComment, setNewComment] = useState("");

  const commentButtonClick = async () => {
    if (newComment?.trim().length > 1000) {
      toast.error("Comment should not exceed 1000 characters");
    } else if (newComment?.trim()) {
      if (newComment.trim().length > 0) {
        await addComment(newComment.trim());
        setNewComment("");
      }
    }
  };
  return (
    <Grid
      size={12}
      sx={{
        backgroundColor: "secondary.main",
        minHeight: "120px",
        height: "auto",
        maxHeight: "600px",
        width: "100%",
        overflowY: "scroll",
        scrollbarWidth: "none",
        marginTop: "16px",
        position: "relative",
        mb: "4px",
      }}
    >
      {comments && comments.length > 0 ? (
        <Box
          sx={{
            width: "100%",
            maxHeight: "450px",
            minHeight: "100px",
            overflowY: "scroll",
            scrollbarWidth: "none",
          }}
        >
          {comments.map((item) => (
            <CommentCard key={item.id} comment={item} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "150px",
          }}
        >
          <Typography variant="body2">
            No Comments. Be the first one to comment.
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          bottom: "0",
          left: "0",
          position: "sticky",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: "auto",
          maxHeight: "200px",
          overflow: "hidden",
        }}
      >
        <Input
          aria-label="comment-input"
          multiline
          placeholder="Type your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disableUnderline
          sx={{
            width: "100%",
            border: "1px solid #e0e0e0",
            overflowY: "scroll",
            scrollbarWidth: "none",
            maxHeight: "200px",
            backgroundColor: "white",
            pl: "4px",
            py: "4px",
            color: "text.secondary",
          }}
        />
        <IconButton
          onClick={commentButtonClick}
          sx={{
            borderRadius: "0px",
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default CommentSection;
