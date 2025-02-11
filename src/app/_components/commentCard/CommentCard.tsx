import React from "react";
import { Avatar, Box, Grid2 as Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import { type Comment } from "~/app/(with-sidebar)/myfeed/types/types";
import Editor from "../commentCard/Editor";
import ReplyButton from "../commentCard/ReplyButton";

dayjs().format();
dayjs.extend(relativeTime);
dayjs.extend(isToday);

type commentCardProps = {
  comment: Comment;
  isReplying?: boolean;
  setIsReplying?: (replying: boolean) => void;
  setReplyingTo?: (replyingTo: string) => void;
  setParentState?: () => void;
  setReplyingState?: (state: Record<string, boolean>) => void;
  replyingState?: Record<string, boolean>;
  handleReply?: (comment: string) => void;
  isChildren: boolean;
};
const CommentCard: React.FC<commentCardProps> = ({
  comment,
  isChildren,
  isReplying,
  setIsReplying,
  setReplyingTo,
  setParentState,
  setReplyingState,
  replyingState = {},
  handleReply,
}) => {
  const timeAgo = dayjs(comment.createdAt).isToday() ? "Today" : dayjs(comment.createdAt).fromNow();

  return (
    <Grid
      spacing={10}
      sx={{
        overflow: "hidden",
        backgroundColor: "white",
        padding: "12px",
        mb: "10px",
        ml: isChildren ? "50px" : "0px",
      }}
    >
      <Grid size={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            gap: "8px",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Grid
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: 30, height: 30 }} src={comment.userProfileImageUrl} />
              <Typography variant="subtitle2" fontWeight="700">
                {comment.userName}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {timeAgo}
              </Typography>
            </div>
            {!isChildren ? (
              <ReplyButton
                style={{
                  minHeight: "auto",
                }}
                props={{
                  onClick: () => {
                    if (setIsReplying) setIsReplying(!isReplying);
                    if (setReplyingTo) setReplyingTo(comment.userName);
                    if (setParentState) setParentState();
                    if (setReplyingState) setReplyingState({ [comment.id]: true });
                  },
                }}
              />
            ) : null}
          </Grid>
          <Typography
            variant="body2"
            sx={{
              marginLeft: "4px",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {comment.content}
          </Typography>
        </Box>

        {!isChildren && replyingState[comment.id] ? (
          <Editor handleReply={(comment: string) => (handleReply ? handleReply(comment) : null)} />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default CommentCard;
