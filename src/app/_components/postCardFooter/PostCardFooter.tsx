import React from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import TollIcon from "@mui/icons-material/Toll";
import {
  Button,
  Grid2 as Grid,
  Popover,
  Typography,
  useMediaQuery,
  type Theme,
} from "@mui/material";
import { type PostCardFooterProps } from "~/app/(with-sidebar)/myfeed/types/types";
import BookmarkPostActionButton from "../postActionButton/BookmarkPostActionButton";
import PostActionButton from "../postActionButton/PostActionButton";
import ShareButton from "../sharePost/ShareButton";
import { STATIC_TEXTS } from "../static/staticText";

const PostCardFooter: React.FC<PostCardFooterProps> = ({
  post,
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
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const [bidAnchorEl, setBidAnchorEl] = React.useState<null | HTMLElement>(null);
  const bidRef = React.useRef<HTMLDivElement>(null);

  const handleAction = (actionType: string) => {
    switch (actionType) {
      case "like":
        handleLikeButton();
        break;
      case "comment":
        openCommentBox();
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
        size={isSmallScreen ? 10 : 6}
        sx={{
          display: "flex",
          justifyContent: {
            xs: "center",
            sm: "start",
          },
          alignItems: "center",
          flexWrap: "nowrap",
          gap: {
            xs: "5px",
            sm: "10px",
          },
        }}
      >
        {showLikes && (
          <PostActionButton
            icon={isLiked ? <FavoriteIcon sx={iconSx} /> : <FavoriteBorderIcon sx={iconSx} />}
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
          <div ref={bidRef}>
            <PostActionButton
              icon={<TollIcon sx={iconSx} />}
              label={bids && bids.length > 0 ? bids.length : "0"}
              onClick={() => {
                handleAction("bid");
                setBidAnchorEl(bidRef.current);
              }}
            />
            <Popover
              open={Boolean(bidAnchorEl)}
              anchorEl={bidAnchorEl}
              onClose={() => setBidAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: "background.paper",
                    color: "text.primary",
                    boxShadow: 3,
                    borderRadius: 2,
                    p: 2,
                  },
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold", color: "primary.main" }}>
                Coming soon!
              </Typography>
              <Typography variant="body2" color="primary.main">
                User will be able to sell their art.
              </Typography>
            </Popover>
          </div>
        )}
        {!!post && showShare && <ShareButton post={post} iconSx={iconSx} />}
        {showEditPublishedPost && showUnpublishPost && (
          <BookmarkPostActionButton
            isBookmarked={isBookmarked}
            showBookmark={showBookmark}
            handleAction={handleAction}
            iconSx={iconSx}
          />
        )}
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
        {!showEditPublishedPost && !showUnpublishPost && (
          <BookmarkPostActionButton
            isBookmarked={isBookmarked}
            showBookmark={showBookmark}
            handleAction={handleAction}
            iconSx={iconSx}
          />
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
              width: {
                xs: "100%",
                sm: "auto",
              },
            }}
          >
            {STATIC_TEXTS.EDITOR_PAGE.EDIT}
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
            {STATIC_TEXTS.EDITOR_PAGE.UNPUBLISH}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default PostCardFooter;
