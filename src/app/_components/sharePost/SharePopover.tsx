import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { IconButton, Popover, Tooltip } from "@mui/material";

type SharePopoverProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onEmailShare: () => void;
  onWhatsAppShare: () => void;
  shareIconSx?: React.CSSProperties;
}

const SharePopover: React.FC<SharePopoverProps> = ({
  open,
  anchorEl,
  onClose,
  onEmailShare,
  onWhatsAppShare,
  shareIconSx = { height: "20px", width: "20px" },
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
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
          sx: {
            backgroundColor: "background.paper",
            color: "text.primary",
            boxShadow: 3,
            borderRadius: 2,
            p: 1.5,
            display: "flex",
            gap: 1,
          },
        },
      }}
    >
      <Tooltip title="Share via Email" arrow placement="top">
        <IconButton
          onClick={onEmailShare}
          sx={{
            color: "text.primary",
            "&:hover": { color: "primary.main", backgroundColor: "action.hover" },
            "&.MuiButtonBase-root": {
              minHeight: 32,
            },
          }}
          aria-label="Share via Email"
        >
          <EmailIcon sx={shareIconSx} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on WhatsApp" arrow placement="top">
        <IconButton
          onClick={onWhatsAppShare}
          sx={{
            color: "#25D366", // WhatsApp green
            "&:hover": { backgroundColor: "action.hover" },
            "&.MuiButtonBase-root": {
              minHeight: 32,
            },
          }}
          aria-label="Share on WhatsApp"
        >
          <WhatsAppIcon sx={shareIconSx} />
        </IconButton>
      </Tooltip>
    </Popover>
  );
};

export default SharePopover;
