import React, { useState, type ChangeEvent, useCallback, useRef } from "react";
import { Box, Typography, Button, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";

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
  onImageUpload: (file: File) => void;
  initialImage?: string | null;
}

const ThumbnailUploader: React.FC<ThumbnailUploaderProps> = ({
  onImageUpload,
  initialImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    initialImage ?? null,
  );
  const [file, setFile] = useState<File | null>(null); // TODO: lint error
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
          setFile(file);
          onImageUpload(file);
        };

        reader.readAsDataURL(file);
      }
    },
    [onImageUpload],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const file = event.dataTransfer.files?.[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
          setFile(file);
          onImageUpload(file);
        };

        reader.readAsDataURL(file);
      }
    },
    [onImageUpload],
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
    [],
  );

  return (
    <Box mb={2}>
      <StyledDropZone
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {selectedImage ? (
          <Box
            component="img"
            src={selectedImage}
            alt="Uploaded Image"
            sx={{ maxWidth: "100%", maxHeight: 200 }}
          />
        ) : (
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
        Upload an image
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => handleImageChange(e)}
          accept="image/*"
        />
      </Button>
    </Box>
  );
};

export default ThumbnailUploader;
