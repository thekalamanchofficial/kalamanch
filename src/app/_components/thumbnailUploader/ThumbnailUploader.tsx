import React, { useCallback, useRef, useState, type ChangeEvent } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import { Box, Button, styled, Typography } from "@mui/material";
import { FileUploadSource } from "types/enums";
import { useUploadFileToR2 } from "~/app/_hooks/useUploadFileToR2";
import Loader from "../loader/Loader";

const StyledDropZone = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.secondary.main,
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
}));

interface ThumbnailUploaderProps {
  onMediaUpload: (uploadedThumbnailUrl: string) => void;
  initialMedia?: string | null;
}

const isVideoFile = (file: File | null) => file?.type.startsWith("video/");

const isVideo = (selectedMedia: string | null) => {
  if (!selectedMedia) return false;
  return selectedMedia.endsWith(".mp4") || selectedMedia.endsWith(".mov");
};
const isImage = (selectedMedia: string | null) => {
  if (!selectedMedia) return false;
  return (
    selectedMedia.endsWith(".jpeg") ||
    selectedMedia.endsWith(".jpg") ||
    selectedMedia.endsWith(".png")
  );
};

const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({ onMediaUpload, initialMedia }) => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(initialMedia ?? null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadFile, isUploading } = useUploadFileToR2();

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleMediaChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const uploadedThumbnailUrl = await uploadFile(
          file,
          isVideoFile(file) ? FileUploadSource.THUMBNAIL_VIDEO : FileUploadSource.THUMBNAIL_IMAGE,
        );
        setSelectedMedia(uploadedThumbnailUrl);
        onMediaUpload(uploadedThumbnailUrl);
      }
    },
    [onMediaUpload, uploadFile],
  );

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const file = event.dataTransfer.files?.[0];
      if (file) {
        const uploadedThumbnailUrl = await uploadFile(
          file,
          isVideoFile(file) ? FileUploadSource.THUMBNAIL_VIDEO : FileUploadSource.THUMBNAIL_IMAGE,
        );
        setSelectedMedia(uploadedThumbnailUrl);
        onMediaUpload(uploadedThumbnailUrl);
      }
    },
    [onMediaUpload, uploadFile],
  );

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <Box mb={2}>
      <StyledDropZone onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
        {isUploading && <Loader title="Uploading File..." height="100%" width="100%" />}

        {!isUploading && selectedMedia && (
          <>
            {isImage(selectedMedia) && (
              <Box
                component="img"
                src={selectedMedia}
                alt="Uploaded Thumbnail"
                sx={{ maxWidth: "100%", maxHeight: 200 }}
              />
            )}
            {isVideo(selectedMedia) && (
              <Box
                component="video"
                src={selectedMedia}
                controls
                sx={{ maxWidth: "100%", maxHeight: 200 }}
              />
            )}
          </>
        )}

        {!isUploading && !selectedMedia && (
          <>
            <ImageIcon sx={{ fontSize: 60, color: "primary.main" }} />
            <Typography variant="body1" color="primary.main" mt={2}>
              Create your thumbnail using our editor
            </Typography>
          </>
        )}
      </StyledDropZone>

      <Button
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{
          mt: 2,
          width: "100%",
          backgroundColor: "secondary.main",
          color: "primary.main",
          "&:hover": {
            backgroundColor: "secondary.main",
            color: "primary.main",
          },
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
        }}
        onClick={handleButtonClick}
      >
        Upload a file
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => handleMediaChange(e)}
          accept=".jpg,.jpeg,.png,.mp4,.mov"
        />
      </Button>
    </Box>
  );
};

export default ThumbnailUploader;
