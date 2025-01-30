"use client"

import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, Button, IconButton, Typography, Box, styled } from "@mui/material"
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  Description as DescriptionIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material"

const UploadBox = styled(Box)(({ theme }) => ({
  border: "2px dashed",
  borderColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    borderColor: theme.palette.primary.dark,
    backgroundColor: theme.palette.action.hover,
  },
}))

interface FileUploaderProps {
  open: boolean
  onClose: () => void
  onFileUpload?: (file: File) => void
}

export default function FileUploader({ open, onClose, onFileUpload }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File) => {
    const validTypes = [".txt", ".doc", ".docx"]
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    return validTypes.includes(fileExtension)
  }

  const handleFile = (selectedFile: File) => {
    if (validateFile(selectedFile)) {
      setFile(selectedFile)
      setError(null)
    } else {
      setError("Please upload a .txt or .doc file")
      setFile(null)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleRemove = () => {
    setFile(null)
    setError(null)
  }
  const handleImportText = () => {
    if (file) {
      onFileUpload?.(file)
      setFile(null);
      onClose()
    }
    else{
      setFile(null);
      setError("Please select a file to import")
    }

  }

  const handleClose = () => {
    setFile(null)
    setError(null)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Import text from Doc/Txt File</Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ py: 2 }}>
          {file ? (
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
              <Button startIcon={<DeleteIcon />} color="error" onClick={handleRemove} variant="outlined" size="small">
                Remove file
              </Button>
            </Box>
          ) : (
            <UploadBox>
              <input
                type="file"
                accept=".txt,.doc,.docx"
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
                    gap: 2,
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 40, color: "primary.main" }} />
                  <Typography>Drag and drop your file here, or click to select</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Supports .txt and .doc files
                  </Typography>
                </Box>
              </label>
            </UploadBox>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" disabled={!file} onClick={handleImportText}>
            Import
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

