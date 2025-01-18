"use client"

import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'


type GenericDialogProps = {
  open: boolean
  onClose: () => void
  title: string
  content: string
  confirmText: string
  cancelText: string
  onConfirm: () => void
}

export default function GenericDialog({
  open,
  onClose,
  title,
  content,
  confirmText,
  cancelText,
  onConfirm
}: GenericDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '400px',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{
          fontSize: '1.25rem',
          fontWeight: 600,
        }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button
            onClick={onClose}
            sx={{
              color: "primary.main",
              backgroundColor: "secondary.main",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}    
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            autoFocus
            sx={{
              backgroundColor: "primary.main",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
  )
}

