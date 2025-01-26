import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import Avatar from "@mui/material/Avatar"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Search } from "@mui/icons-material"
import ListItemButton from "@mui/material/ListItemButton"
import { DialogActions } from "@mui/material"
import { STATIC_TEXTS } from "~/app/_components/static/staticText"
import { useSearchUsers } from "../../_hooks/useSearchUsers"
import { useSelectedUsers } from "../../_hooks/useSelectedUsers"

interface ReviewDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (selectedUsers: string[]) => void
}

export default function SendForReviewDialog({ open, onClose, onSubmit }: ReviewDialogProps) {
  const { searchTerm,users ,handleSearch, secondLastUserRef } = useSearchUsers();
  const { selectedUsers, toggleUserSelection } = useSelectedUsers()
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Select Users for Review</DialogTitle>
      <Box
        sx={{
          padding: "16px 16px 0 16px",
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 1,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
          }}
        />
      </Box>
      <DialogContent sx={{ pt: 0, maxHeight: "500px", overflowY: "scroll" }}>
        <List>
          {users.map((user, index) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton
                onClick={() => toggleUserSelection(user.id)}
                selected={selectedUsers.includes(user.id)}
                sx={{
                  "&:hover": { backgroundColor: "action.hover" },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.profileImageUrl}>{user.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={user.email}
                  primaryTypographyProps={{
                    fontWeight: selectedUsers.includes(user.id) ? "bold" : "regular",
                  }}
                />
              </ListItemButton>
              {index === users.length - 1 && (
                <div ref={secondLastUserRef} style={{ height: 1 }} />
              )}
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{
            color: "primary.main",
            backgroundColor: "secondary.main",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "secondary.dark",
            },
          }}
          onClick={onClose}
        >
          {STATIC_TEXTS.EDITOR_PAGE.CANCEL}
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmit(selectedUsers)}
          disabled={selectedUsers.length === 0}
          sx={{
            backgroundColor: "primary.main",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Send for Review ({selectedUsers.length} selected)
        </Button>
      </DialogActions>
    </Dialog>
  )
}
