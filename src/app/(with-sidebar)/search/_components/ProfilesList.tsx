"use client";

import { memo, useCallback, useMemo } from "react";
import PersonIcon from "@mui/icons-material/Person";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Chip,
  Grid2 as Grid,
  Grow,
  Paper,
  Stack,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";

type Profile = {
  id: string;
  name: string;
  bio?: string | null;
  profileImageUrl?: string;
  readingInterests?: { genres: string[]; tags: string[] };
  writingInterests?: { genres: string[]; tags: string[] };
  followers?: string[];
  following?: string[];
  coverImageUrl?: string | null;
};

type ProfilesListProps = {
  profiles: Profile[];
  isTablet: boolean;
};

const ProfilesList = memo(({ profiles, isTablet }: ProfilesListProps) => {
  const theme = useTheme();

  console.log({
    profiles,
  });

  const profileCount = useMemo(() => profiles.length, [profiles.length]);

  return (
    <Grow in timeout={400} appear={true}>
      <Grid size={12}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2, md: 3 },
            mb: { xs: 2, sm: 4 },
            borderRadius: { xs: 2, sm: 3 },
            backgroundColor: "background.paper",
            boxShadow: `0 2px 12px ${alpha(theme.palette.divider, 0.1)}`,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              pb: 2,
              borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
            }}
          >
            <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
              People
            </Typography>
            <Chip
              label={`${profileCount} found`}
              size="small"
              sx={{ ml: 2, backgroundColor: alpha(theme.palette.primary.main, 0.1) }}
            />
          </Box>

          <Grid container spacing={isTablet ? 2 : 3}>
            {profiles.map((profile, index) => (
              <ProfileCard key={profile.id} profile={profile} index={index} isTablet={isTablet} />
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grow>
  );
});

ProfilesList.displayName = "ProfilesList";

type ProfileCardProps = {
  profile: Profile;
  index: number;
  isTablet: boolean;
};

const ProfileCard = memo(({ profile, index, isTablet }: ProfileCardProps) => {
  const theme = useTheme();

  const transitionDelay = useMemo(() => `${Math.min(index * 50, 300)}ms`, [index]);

  return (
    <Grid size={isTablet ? 12 : 6}>
      <Zoom in style={{ transitionDelay }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
            cursor: "pointer",
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
              borderColor: alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <Stack spacing={2}>
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Avatar
                src={profile.profileImageUrl}
                sx={{
                  width: { xs: 48, sm: 64 },
                  height: { xs: 48, sm: 64 },
                  border: `2px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {profile.name}
                </Typography>
                {profile.bio && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {profile.bio}
                  </Typography>
                )}
              </Box>
              <FollowButton />
            </Box>
          </Stack>
        </Paper>
      </Zoom>
    </Grid>
  );
});

ProfileCard.displayName = "ProfileCard";

const FollowButton = memo(() => {
  const theme = useTheme();

  const handleClick = useCallback(() => {
    // Follow logic would go here
  }, []);

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={handleClick}
      sx={{
        minHeight: "unset",
        height: 36,
        borderRadius: 2,
        borderColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
      }}
    >
      Follow
    </Button>
  );
});

FollowButton.displayName = "FollowButton";

export default ProfilesList;
