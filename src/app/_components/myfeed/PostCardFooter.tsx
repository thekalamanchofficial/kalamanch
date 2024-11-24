import { Box, Chip, IconButton } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";
import TollIcon from "@mui/icons-material/Toll";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

interface PostCardFooterProps {
  likes: number;
  comments: number;
  shares: number;
  bids: number;
}
const PostCardFooter: React.FC<PostCardFooterProps> = ({
  likes,
  comments,
  shares,
  bids,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Chip
          avatar={<FavoriteBorderIcon />}
          label={likes}
          sx={{
            padding: "4px ",
            backgroundColor: "common.lightGray",
            fontSize: "14px",
          }}
        />

        <Chip
          avatar={<MessageIcon />}
          label={comments}
          sx={{
            padding: "4px ",
            backgroundColor: "common.lightGray",
            fontSize: "14px",
          }}
        />
        <Chip
          avatar={<TollIcon />}
          label={bids}
          sx={{
            padding: "4px ",
            backgroundColor: "common.lightGray",
            fontSize: "14px",
          }}
        />
        <Chip
          avatar={<SendIcon />}
          label={shares}
          sx={{
            padding: "4px ",
            fontSize: "14px",
            backgroundColor: "common.lightGray",
          }}
        />
      </Box>
      <Box>
        <IconButton
          sx={{
            backgroundColor: "common.lightGray",
          }}
          size="small"
        >
          <BookmarkBorderIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PostCardFooter;
