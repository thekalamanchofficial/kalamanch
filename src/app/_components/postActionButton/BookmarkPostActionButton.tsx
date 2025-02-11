import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import type { SxProps, Theme } from "@mui/material";
import { Box } from "@mui/system";
import PostActionButton from "./PostActionButton";

type BookmarkPostButtonProps = {
  isBookmarked: boolean | undefined;
  showBookmark: boolean | undefined;
  handleAction: (action: string) => void;
  iconSx: SxProps<Theme>;
};

const BookmarkPostActionButton: React.FC<BookmarkPostButtonProps> = ({
  isBookmarked,
  showBookmark,
  handleAction,
  iconSx,
}) => {
  return (
    showBookmark && (
      <Box>
        <PostActionButton
          icon={isBookmarked ? <BookmarkIcon sx={iconSx} /> : <BookmarkBorderIcon sx={iconSx} />}
          label=""
          onClick={() => handleAction("bookmark")}
          sx={{
            minWidth: "65px",
            minHeight: "24px",
          }}
        />
      </Box>
    )
  );
};

export default BookmarkPostActionButton;
