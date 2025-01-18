import { Box, Grid2 as Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { type CommentSectionProps } from "~/app/(with-sidebar)/myfeed/types/types";
import CommentCard from "~/app/_components/commentCard/CommentCard";
import Editor from "../commentCard/Editor";

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  addComment,
}) => {
  const [replyingState, setReplyingState] = useState<Record<string, boolean>>(
    {},
  );

  const commentButtonClick = async (comment: string, parent: string) => {
    if (comment.trim()) {
      await addComment(comment, parent);
      setReplyingState({}); // Reset reply state to close dialog
    }
  };

  return (
    <Grid
      size={12}
      sx={{
        backgroundColor: "secondary.main",
        minHeight: "120px",
        maxHeight: "600px",
        width: "100%",
        overflowY: "scroll",
        marginTop: "16px",
        mb: "4px",
        overflow: "hidden",
      }}
    >
      {comments && comments.length > 0 ? (
        <Box
          sx={{
            width: "100%",
            maxHeight: "450px",
            padding: "10px",
            minHeight: "100px",
            overflowY: "scroll",
          }}
        >
          {comments.map((item) => (
            <React.Fragment key={item.id}>
              {item.parentId === null && (
                <CommentCard
                  comment={item}
                  setReplyingState={setReplyingState}
                  replyingState={replyingState}
                  handleReply={(newComment: string) =>
                    commentButtonClick(newComment, replyingState[item.id] ? item.id : "")
                  }
                  isChildren={false}
                />
              )}
              {item.replies?.map((reply) => (
                <CommentCard key={reply.id} comment={reply} isChildren={true} />
              ))}
            </React.Fragment>
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
        sx={{ bottom: "0", left: "0", position: "sticky", marginTop: "6px" }}
      >
        <Editor
          handleReply={(comment: string) => commentButtonClick(comment, "")}
        />
      </Box>
    </Grid>
  );
};

export default CommentSection;
