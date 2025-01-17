"use client"

import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4318FF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
          padding: '8px',
        },
      },
    },
  },
})

interface GenericDialogProps {
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
    <ThemeProvider theme={theme}>
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
          color: '#1A1A1A',
        }}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{
            color: '#666666',
          }}>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button
            onClick={onClose}
            sx={{
              color: '#666666',
              '&:hover': {
                backgroundColor: '#F5F5F5',
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
              backgroundColor: '#4318FF',
              '&:hover': {
                backgroundColor: '#3311DD',
              },
            }}
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}

