import { Box, IconButton } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";
import TollIcon from "@mui/icons-material/Toll";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { type PostCardFooterProps } from "~/app/(with-sidebar)/myfeed/types/types";
import PostActionButton from "./PostActionButton";

const PostCardFooter: React.FC<PostCardFooterProps> = ({
  likes,
  comments,
  shares,
  bids,
}) => {
  const handleAction = (actionType: string) => {
    switch (actionType) {
      case "like":
        console.log("like");
        break;
      case "comment":
        console.log("comment");
        break;
      case "share":
        console.log("share");
        break;
      case "bid":
        console.log("bid");
        break;
      case "bookmark":
        console.log("bookmark");
        break;
      default:
        console.log("default");
    }
  };

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
        <PostActionButton
          icon={<FavoriteBorderIcon />}
          label={likes}
          onClick={() => handleAction("like")}
        />

        <PostActionButton
          icon={<MessageIcon />}
          label={comments}
          onClick={() => handleAction("comment")}
        />
        <PostActionButton
          icon={<TollIcon />}
          label={bids}
          onClick={() => handleAction("share")}
        />
        <PostActionButton
          icon={<SendIcon />}
          label={shares}
          onClick={() => handleAction("bid")}
        />
      </Box>
      <Box>
        <IconButton
          sx={{
            backgroundColor: "common.lightGray",
          }}
          size="small"
          onClick={() => handleAction("bookmark")}
        >
          <BookmarkBorderIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PostCardFooter;
