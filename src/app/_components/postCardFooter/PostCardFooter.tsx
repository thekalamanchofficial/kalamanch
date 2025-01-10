import { Box } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import TollIcon from "@mui/icons-material/Toll";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import { type PostCardFooterProps } from "~/app/(with-sidebar)/myfeed/types/types";
import PostActionButton from "../postActionButton/PostActionButton";

const PostCardFooter: React.FC<PostCardFooterProps> = ({
  likes,
  comments,
  bids,
  isLiked,
  handleLikeButton,
  openCommentBox,
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

  const iconSx = { height: "16px", width: "16px" };

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
          icon={isLiked ? <FavoriteIcon sx={iconSx} /> : <FavoriteBorderIcon sx={iconSx} />}
          label={likes && likes > 0 ? likes : "0"}
          onClick={handleLikeButton}
        />

        <PostActionButton
          icon={<MessageIcon sx={iconSx} />}
          label={comments && comments.length > 0 ? comments.length : "0"}
          onClick={() => openCommentBox()}
        />
        <PostActionButton
          icon={<TollIcon sx={iconSx} />}
          label={bids && bids.length > 0 ? bids.length : "0"}
          onClick={() => handleAction("share")}
        />
        <PostActionButton
          icon={<ShareIcon sx={iconSx} />}
          label=""
          onClick={() => handleAction("bid")}
        />
      </Box>
      <Box>
        <PostActionButton
          icon={<BookmarkBorderIcon sx={iconSx} />}
          label=""
          onClick={() => handleAction("bookmark")}
          sx={{
            minWidth: "65px",
            minHeight: "24px",
          }}
        />
      </Box>
    </Box>
  );
};

export default PostCardFooter;
