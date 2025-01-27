import { Grid2 as Grid, type Theme, useMediaQuery } from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import TollIcon from "@mui/icons-material/Toll";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

import { type PostCardFooterProps } from "~/app/(with-sidebar)/myfeed/types/types";
import PostActionButton from "../postActionButton/PostActionButton";
import SharePostDialog from "../sharePostDialog/SharePostDialog";

const PostCardFooter: React.FC<PostCardFooterProps> = ({
  likes,
  comments,
  bids,
  isLiked,
  isBookmarked,
  handleLikeButton,
  openCommentBox,
  postId,
  handleBookmark,
}) => {
  const [open, setOpen] = React.useState(false);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );
  const handleAction = (actionType: string) => {
    switch (actionType) {
      case "like":
        handleLikeButton();
        break;
      case "comment":
        openCommentBox();
        break;
      case "share":
        console.log("share");
        setOpen(true);
        break;
      case "bid":
        console.log("bid");
        break;
      case "bookmark":
        handleBookmark();
        break;
      default:
        console.log("default");
    }
  };

  const iconSx = { height: "16px", width: "16px" };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Grid
        size={isSmallScreen ? 12 : 11}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <PostActionButton
          icon={
            isLiked ? (
              <FavoriteIcon sx={iconSx} />
            ) : (
              <FavoriteBorderIcon sx={iconSx} />
            )
          }
          label={likes && likes > 0 ? likes : "0"}
          onClick={() => handleAction("like")}
        />

        <PostActionButton
          icon={<MessageIcon sx={iconSx} />}
          label={comments && comments.length > 0 ? comments.length : "0"}
          onClick={() => handleAction("comment")}
        />
        <PostActionButton
          icon={<TollIcon sx={iconSx} />}
          label={bids && bids.length > 0 ? bids.length : "0"}
          onClick={() => handleAction("bid")}
        />
        <PostActionButton
          icon={<ShareIcon sx={iconSx} />}
          label=""
          onClick={() => handleAction("share")}
        />
        <SharePostDialog
          open={open}
          onClose={() => setOpen(false)}
          postId={postId}
        />
      </Grid>
      <Grid size={isSmallScreen ? 12 : 1}>
        <PostActionButton
          icon={
            isBookmarked ? (
              <BookmarkIcon sx={iconSx} />
            ) : (
              <BookmarkBorderIcon sx={iconSx} />
            )
          }
          label=""
          onClick={() => handleAction("bookmark")}
          sx={{
            minWidth: "65px",
            minHeight: "24px",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default PostCardFooter;
