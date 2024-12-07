import React from "react";
import { Grid2 as Grid, Box, Typography } from "@mui/material";
import { type CommentCardProps } from "~/app/(with-sidebar)/myfeed/types/types";
import UserNameProfile from "../userNameProfile/UserNameProfile";
const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Grid
      spacing={10}
      sx={{
        gap: "20px",
        padding: "10px",
        overflow: "hidden",
      }}
    >
      <Grid size={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            gap: "10px",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <UserNameProfile
              AuthorName={comment.name}
              AuthorImage={comment.profile}
              ImageHeight={40}
              ImageWidth={40}
              NameFontSize={14}
            />
            <Typography
              variant="caption"
              sx={{
                textAlign: "right",
                marginRight: "10px",
              }}
            >
              2 days ago
            </Typography>
          </Box>
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
      </Grid>
    </Grid>
  );
};

export default CommentCard;
