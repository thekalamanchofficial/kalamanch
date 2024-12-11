import { Box, Grid2 as Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { type CommentSectionProps } from "~/app/(with-sidebar)/myfeed/types/types";
import CommentCard from "~/app/_components/CommentSection/CommentCard";
import Editor from "../commentCard/Editor";

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  addComment,
}) => {
  const [newComment, setNewComment] = useState("");
  const [replyingState, setReplyingState] = React.useState<
    Record<string, boolean>
  >({});

  const [isReplying, setIsReplying] = useState(false);
  const [replyingTo, setReplyingTo] = useState("");
  const [parent, setParent] = useState<string>("");

  const toggleReply = (commentId: string) => {
    setReplyingState((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const commentButtonClick = async (comment: string, parent: string) => {
    if (comment?.trim()) {
      if (comment.trim().length > 0) {
        await addComment(comment, parent);
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
        padding: "12px",
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
            <>
              {item.parentId === null ? (
                <CommentCard
                  key={item.id}
                  comment={item}
                  isReplying={isReplying}
                  setIsReplying={setIsReplying}
                  setReplyingTo={setReplyingTo}
                  setParentState={() => setParent(item.id)}
                  setReplyingState={setReplyingState}
                  replyingState={replyingState}
                  handleReply={(newComment: string) =>
                    commentButtonClick(newComment, item.id)
                  }
                  isChildren={false}
                />
              ) : null}
              {item.replies && item.replies.length > 0
                ? item.replies.map((reply) => (
                    <CommentCard
                      key={reply.id}
                      comment={reply}
                      isChildren={true}
                    />
                  ))
                : null}
            </>
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
          overflow: "hidden",
          marginTop: "6px",
        }}
      >
        <Editor
          handleReply={(comment: string) => commentButtonClick(comment, "")}
        />
      </Box>
    </Grid>
  );
};

export default CommentSection;
