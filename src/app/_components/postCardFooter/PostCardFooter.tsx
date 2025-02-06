import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import TollIcon from "@mui/icons-material/Toll";
import {
  Box,
  Button,
  Grid2 as Grid,
  type Theme,
  useMediaQuery,
} from "@mui/material";
import React from "react";
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
        justifyContent: {
          xs: "center",
          sm: "space-between",
        },
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Grid
        size={isSmallScreen ? 10 : 4}
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
      <Grid
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "10px",
          flexDirection: {
            xs: "column-reverse",
            sm: "row",
          },
          width: {
            xs: "100%",
            sm: "auto",
          },
        }}
      >
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
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            {STATIC_TEXTS.EDITOR_PAGE.EDIT_PUBLISHED_POST_BUTTON_TEXT}
          </Button>
        )}
        {showUnpublishPost && (
          <Button
            variant="contained"
            startIcon={<DescriptionOutlinedIcon />}
            onClick={() => handleAction("unpublish:post")}
            sx={{
              color: "secondary.main",
              backgroundColor: "primary.main",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            {STATIC_TEXTS.EDITOR_PAGE.UNPUBLISH_POST_DIALOG_TITLE}
          </Button>
        )}
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
      </Grid>
    </Grid>
  );
};

export default PostCardFooter;
