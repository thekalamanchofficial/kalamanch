"use client";

import { useState } from "react";
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import Loader from "~/app/_components/loader/Loader";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";

type FileUploaderProps = {
  open: boolean;
  onClose: () => void;
  onFileUpload?: (file: File) => Promise<void>;
};

export default function FileUploader({ open, onClose, onFileUpload }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateFile = (file: File) => {
    const validTypes = [".txt", ".doc", ".docx", ".jpeg", ".png", ".jpg"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    return validTypes.includes(fileExtension);
  };

  const handleFile = (selectedFile: File) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please upload a .txt or .doc file");
      setFile(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setError(null);
  };

  const handleImportText = async () => {
    if (file) {
      setIsLoading(true);
      try {
        await onFileUpload?.(file);
      } catch (error) {
        console.error("Error importing text:", error);
      }
      setIsLoading(false);
      setFile(null);
      onClose();
    } else {
      setFile(null);
      setError(STATIC_TEXTS.EDITOR_PAGE.SELECT_FILE_ERROR);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0 && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClose = () => {
    setFile(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">
            {STATIC_TEXTS.EDITOR_PAGE.IMPORT_TEXT_FROM_DOCX_OR_TXT_FILE}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography variant="h3" color="primary.main" sx={{ mb: 2, textAlign: "center" }}>
            {STATIC_TEXTS.EDITOR_PAGE.UPLOADED_TEXT_IN_NEW_ITERATION_MESSAGE}
          </Typography>
          {isLoading ? (
            <Loader title="Uploading text..." height="auto" width="100%" />
          ) : file ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "primary.main",
                }}
              >
                <DescriptionIcon />
                <Typography>{file.name}</Typography>
              </Box>
              <Button
                startIcon={<DeleteIcon />}
                color="error"
                onClick={handleRemove}
                variant="outlined"
                size="small"
              >
                Remove file
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                border: "2px dashed",
                borderColor: "primary.main",
                borderRadius: 1,
                padding: 4,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                backgroundColor: "background.paper",
                "&:hover": {
                  borderColor: "primary.dark",
                  backgroundColor: "action.hover",
                },
              }}
              onDragOver={handleDragOver} // Allow dropping
              onDrop={handleDrop} // Handle dropped file
            >
              <input
                type="file"
                accept=".txt,.doc,.docx,.jpeg,.png,.jpg"
                onChange={handleChange}
                style={{ display: "none" }}
                id="file-input"
              />
              <label htmlFor="file-input">
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    gap: 2,
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 40, color: "primary.main" }} />
                  <Typography>{STATIC_TEXTS.EDITOR_PAGE.DRAG_AND_DROP_FILE}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {STATIC_TEXTS.EDITOR_PAGE.SUPPORTS_TXT_DOCX_PNG_JPEG_FILE}
                  </Typography>
                </Box>
              </label>
            </Box>
          )}

          {error && (
            <Typography
              color="error"
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                mt: 1,
              }}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
              {error}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
          <Button onClick={handleClose}>{STATIC_TEXTS.EDITOR_PAGE.CANCEL}</Button>
          <Button variant="contained" color="primary" disabled={!file} onClick={handleImportText}>
            {STATIC_TEXTS.EDITOR_PAGE.IMPORT}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
