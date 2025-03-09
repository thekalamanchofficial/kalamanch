"use client";

import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

export type TodoMenuProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  navigateTo: (route: string) => void;
};

const TodoMenu = ({ anchorEl, open, onClose, navigateTo }: TodoMenuProps) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      slotProps={{
        paper: {
          elevation: 2,
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: 2,
            overflow: "visible",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
    >
      <MenuItem onClick={() => navigateTo("/drafts")} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <ModeEditOutlinedIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: "1.05rem" }}>Drafts</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => navigateTo("/review-feedback")} sx={{ py: 1.5 }}>
        <ListItemIcon>
          <FeedbackOutlinedIcon fontSize="medium" />
        </ListItemIcon>
        <ListItemText primaryTypographyProps={{ fontSize: "1.05rem" }}>
          Review Feedback
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default TodoMenu;
