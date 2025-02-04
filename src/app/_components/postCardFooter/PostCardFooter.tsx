import {
  Box,
  Button,
  Grid2 as Grid,
  type Theme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import TollIcon from "@mui/icons-material/Toll";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { type PostCardFooterProps } from "~/app/(with-sidebar)/myfeed/types/types";
import PostActionButton from "../postActionButton/PostActionButton";
import SharePostDialog from "../sharePostDialog/SharePostDialog";
import { STATIC_TEXTS } from "../static/staticText";

const PostCardFooter: React.FC<PostCardFooterProps> = ({
  likes,
  comments,
  bids,
  isLiked,
  isBookmarked,
  handleLikeButton,
  openCommentBox,
  postId,
  showLikes,
  showComments,
  showBids,
  showBookmark,
  showShare,
  showEditPost,
  showEditPublishedPost,
  showUnpublishPost,
  handleEditPost,
  handleBookmark,
  handleEditPublishedPost,
  handleUnpublishPost,
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
        handleBookmark?.();
        break;
      case "edit:post":
        handleEditPublishedPost?.(postId);
        break;
      case "unpublish:post":
        void handleUnpublishPost?.(postId);
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
        {showLikes && (
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
        )}

        {showComments && (
          <PostActionButton
            icon={<MessageIcon sx={iconSx} />}
            label={comments && comments.length > 0 ? comments.length : "0"}
            onClick={() => handleAction("comment")}
          />
        )}
        {showBids && (
          <PostActionButton
            icon={<TollIcon sx={iconSx} />}
            label={bids && bids.length > 0 ? bids.length : "0"}
            onClick={() => handleAction("bid")}
          />
        )}
        {showShare && (
          <PostActionButton
            icon={<ShareIcon sx={iconSx} />}
            label=""
            onClick={() => handleAction("share")}
          />
        )}
        <SharePostDialog
          open={open}
          onClose={() => setOpen(false)}
          postId={postId}
        />
      </Grid>
      {showBookmark && (
        <Box>
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
        </Box>
      )}
      {showEditPost && (
        <Button
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          onClick={handleEditPost}
          sx={{
            color: "primary.main",
            backgroundColor: "secondary.main",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "secondary.dark",
            },
          }}
        >
          {STATIC_TEXTS.EDITOR_PAGE.EDIT_DRAFT_POST_BUTTON_TEXT}
        </Button>
      )}
      {showEditPublishedPost && (
        <Button
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          onClick={() => handleAction("edit:post")}
          sx={{
            color: "primary.main",
            backgroundColor: "secondary.main",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "secondary.dark",
            },
          }}
        >
          {STATIC_TEXTS.EDITOR_PAGE.EDIT_PUBLISHED_POST_BUTTON_TEXT}
        </Button>
      )}
      {showUnpublishPost && (
        <Button
          variant="contained"
          startIcon={<EditOutlinedIcon />}
          onClick={() => handleAction("unpublish:post")}
          sx={{
            color: "primary.main",
            backgroundColor: "secondary.main",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "secondary.dark",
            },
          }}
        >
          {STATIC_TEXTS.EDITOR_PAGE.UNPUBLISH_POST_DIALOG_TITLE}
        </Button>
      )}
    </Grid>
  );
};

export default PostCardFooter;
