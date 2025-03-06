import Link from "next/link";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import type { Profile } from "./types/types";

type ProfileResultsProps = {
  profiles: Profile[];
  onClose?: () => void;
};

export const ProfileResults = ({ profiles, onClose }: ProfileResultsProps) => {
  if (profiles.length === 0) return null;

  return (
    <Box>
      <Typography
        variant="overline"
        sx={{
          px: 3,
          py: 1.5,
          display: "block",
          color: "text.secondary",
          fontSize: "0.675rem",
          letterSpacing: "0.1em",
          backgroundColor: (theme) => theme.palette.grey[50],
        }}
      >
        Profiles
      </Typography>
      <List disablePadding>
        {profiles.map((profile) => (
          <ListItem
            key={profile.id}
            component={Link}
            href={`/profile/${profile.id}`}
            onClick={onClose}
            sx={{
              py: 1.5,
              px: 3,
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
              transition: "all 0.15s ease-in-out",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.grey[50],
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                src={profile.profileImageUrl}
                alt={profile.name}
                sx={{
                  width: 36,
                  height: 36,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={profile.name}
              secondary={profile.bio}
              primaryTypographyProps={{
                variant: "body1",
                fontWeight: 500,
                color: "text.primary",
                fontSize: "0.9375rem",
              }}
              secondaryTypographyProps={{
                variant: "body2",
                noWrap: true,
                color: "text.secondary",
                fontSize: "0.8125rem",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
