import React from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Button } from "@mui/material";
import GenericDialog from "~/app/_components/genericDialog/GenericDialog";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { PostStatus } from "../../types/types";

type EditPostFooterProps = {
  postStatus: PostStatus;
  handleEditButtonClick: () => void;
  handlePublishOrUnpublishButtonClick: () => void;
};

export default function EditPostFooter({
  postStatus,
  handleEditButtonClick,
  handlePublishOrUnpublishButtonClick,
}: EditPostFooterProps) {
  const [openPublishOrUnPublishDialog, setOpenPublishOrUnPublishDialog] = React.useState(false);

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
      <Button
        variant="contained"
        startIcon={<EditOutlinedIcon />}
        onClick={handleEditButtonClick}
        sx={{
          color: "primary.main",
          backgroundColor: "secondary.main",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "secondary.dark",
          },
        }}
      >
        {postStatus === PostStatus.DRAFT
          ? STATIC_TEXTS.EDITOR_PAGE.EDIT_DRAFT_POST_BUTTON_TEXT
          : STATIC_TEXTS.EDITOR_PAGE.EDIT_PUBLISHED_POST_BUTTON_TEXT}
      </Button>
      <Button
        variant="contained"
        startIcon={<DescriptionOutlinedIcon />}
        onClick={() =>
          postStatus === PostStatus.DRAFT
            ? handlePublishOrUnpublishButtonClick()
            : setOpenPublishOrUnPublishDialog(true)
        }
        sx={{
          backgroundColor: "primary.main",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        {postStatus === PostStatus.DRAFT
          ? STATIC_TEXTS.EDITOR_PAGE.PUBLISH
          : STATIC_TEXTS.EDITOR_PAGE.UNPUBLISH}
      </Button>
      {openPublishOrUnPublishDialog && (
        <GenericDialog
          open={openPublishOrUnPublishDialog}
          onClose={() => setOpenPublishOrUnPublishDialog(false)}
          title={STATIC_TEXTS.EDITOR_PAGE.UNPUBLISH_POST_DIALOG_TITLE}
          content={STATIC_TEXTS.EDITOR_PAGE.PUBLISH_POST_DIALOG_DESCRIPTION}
          confirmText={STATIC_TEXTS.EDITOR_PAGE.UNPUBLISH}
          cancelText={STATIC_TEXTS.EDITOR_PAGE.CANCEL}
          onConfirm={handlePublishOrUnpublishButtonClick}
        />
      )}
    </Box>
  );
}
