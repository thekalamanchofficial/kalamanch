import React from "react";
import ShareIcon from "@mui/icons-material/Share";
import { Box } from "@mui/material";
import { type Post } from "~/app/(with-sidebar)/myfeed/types/types";
import PostActionButton from "../postActionButton/PostActionButton";
import SharePopover from "./SharePopover";
import SharePostDialog from "./SharePostDialog";

type ShareButtonProps = {
  post: Post;
  iconSx?: React.CSSProperties;
  shareIconSx?: React.CSSProperties;
};

const ShareButton: React.FC<ShareButtonProps> = ({
  post,
  iconSx = { height: "16px", width: "16px" },
  shareIconSx = { height: "20px", width: "20px" },
}) => {
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
  const [shareAnchorEl, setShareAnchorEl] = React.useState<null | HTMLElement>(null);
  const shareButtonContainerRef = React.useRef<HTMLDivElement>(null);
  const sharePopoverOpen = Boolean(shareAnchorEl);

  const handleShareClick = () => {
    setShareAnchorEl(shareButtonContainerRef.current);
  };

  const handleEmailShare = () => {
    setShareDialogOpen(true);
    setShareAnchorEl(null);
  };

  const handleWhatsAppShare = () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    const tags = post.tags?.map((tag) => tag.name).join(", ") ?? "";
    const genres = post.genres?.map((genre) => genre.name).join(", ") ?? "";

    let shareMessage = `Post Title: ${post.title}\n\n`;
    shareMessage += `Author: ${post.authorName}\n\n`;

    if (post.thumbnailDetails.content) {
      shareMessage += `Preview:\n${post.thumbnailDetails.content.slice(0, 150)}...\n\n`;
    }

    if (tags || genres || post.likeCount > 0) {
      shareMessage += `Post Details:\n`;

      if (tags) {
        shareMessage += `Tags: ${tags}\n`;
      }
      if (genres) {
        shareMessage += `Genres: ${genres}\n`;
      }
      if (post.likeCount > 0) {
        shareMessage += `Likes: ${post.likeCount}\n`;
      }

      shareMessage += "\n";
    }

    shareMessage += `Read the full post:\n${postUrl}`;

    const encodedMessage = encodeURIComponent(shareMessage);
    let whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (!isMobile) {
      whatsappUrl = `https://web.whatsapp.com/send?text=${encodedMessage}`;
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setShareAnchorEl(null);
  };

  return (
    <Box ref={shareButtonContainerRef}>
      <PostActionButton icon={<ShareIcon sx={iconSx} />} label="" onClick={handleShareClick} />
      <SharePopover
        open={sharePopoverOpen}
        anchorEl={shareAnchorEl}
        onClose={() => setShareAnchorEl(null)}
        onEmailShare={handleEmailShare}
        onWhatsAppShare={handleWhatsAppShare}
        shareIconSx={shareIconSx}
      />
      <SharePostDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        postId={post.id}
      />
    </Box>
  );
};

export default ShareButton;
