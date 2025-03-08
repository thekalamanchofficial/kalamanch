"use client";

import { memo, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { trpc } from "~/app/_trpc/client";
import { useUser } from "~/context/userContext";

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
  const router = useRouter();

  const { data: userDetails } = trpc.user.getUserDetailsById.useQuery(profile.id, {
    enabled: !!profile.id,
    refetchOnWindowFocus: false,
  });

  const transitionDelay = useMemo(() => `${Math.min(index * 50, 300)}ms`, [index]);

  const handleViewProfile = useCallback(() => {
    router.push(`/profile/${profile.id}`);
  }, [router, profile.id]);

  const followersCount = useMemo(
    () => userDetails?.followers?.length ?? profile.followers?.length ?? 0,
    [userDetails?.followers, profile.followers],
  );

  const followingCount = useMemo(
    () => userDetails?.following?.length ?? profile.following?.length ?? 0,
    [userDetails?.following, profile.following],
  );

  return (
    <Grid size={isTablet ? 12 : 6}>
      <Zoom in style={{ transitionDelay }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderRadius: 2,
            backgroundColor: alpha(theme.palette.background.paper, 0.6),
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
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
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                src={profile.profileImageUrl}
                sx={{
                  width: { xs: 48, sm: 56 },
                  height: { xs: 48, sm: 56 },
                  border: `2px solid ${theme.palette.background.paper}`,
                  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {profile.name}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    color: "text.secondary",
                    fontSize: "0.75rem",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="caption" fontWeight={600} color="text.primary" mr={0.5}>
                      {followersCount}
                    </Typography>
                    Followers
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="caption" fontWeight={600} color="text.primary" mr={0.5}>
                      {followingCount}
                    </Typography>
                    Following
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1,
                mt: 1,
              }}
            >
              <Button
                variant="contained"
                size="small"
                fullWidth
                startIcon={<VisibilityIcon fontSize="small" />}
                onClick={handleViewProfile}
                sx={{
                  borderRadius: 6,
                  boxShadow: "none",
                  backgroundColor: theme.palette.primary.main,
                  py: 0.75,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.25)}`,
                  },
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                View Profile
              </Button>
              <FollowButton userId={profile.id} />
            </Box>
          </Stack>
        </Paper>
      </Zoom>
    </Grid>
  );
});

ProfileCard.displayName = "ProfileCard";

const FollowButton: React.FC<{ userId: string }> = memo(({ userId }) => {
  const theme = useTheme();
  const { user } = useUser();
  const utils = trpc.useUtils();

  const { data: userDetails } = trpc.user.getUserDetailsById.useQuery(userId, {
    enabled: !!userId && !!user,
    refetchOnWindowFocus: false,
  });

  const { mutate: followUser, isPending } = trpc.user.followUser.useMutation({
    onSuccess: () => {
      void utils.user.getUserDetailsById.invalidate(userId);
      if (user?.id) {
        void utils.user.getUserDetailsById.invalidate(user.id);
      }
    },
    onError: () => {
      toast.error("Failed to follow user. Please try again.");
    },
  });

  const isFollowing = useMemo(() => {
    if (!user?.id || !userDetails?.followers) return false;
    return userDetails.followers.includes(user.id);
  }, [user?.id, userDetails?.followers]);

  const handleClick = useCallback(
    (userId: string) => {
      if (isFollowing) return;

      if (!user) {
        toast.error("You must be logged in to follow a user");
        return;
      }
      followUser({
        currentUserEmail: user.email,
        followerId: userId,
      });
    },
    [followUser, user, isFollowing],
  );

  const buttonText = useMemo(() => {
    if (isPending) return "Following...";
    if (isFollowing) return "Following";
    return "Follow";
  }, [isPending, isFollowing]);

  const buttonStyle = useMemo(() => {
    const baseStyle = {
      borderRadius: 6,
      textTransform: "none" as const,
      fontWeight: 500,
      fontSize: "0.875rem",
      py: 0.75,
    };

    if (isFollowing) {
      return {
        ...baseStyle,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
      };
    }

    return {
      ...baseStyle,
      borderColor: alpha(theme.palette.primary.main, 0.5),
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        borderColor: theme.palette.primary.main,
      },
    };
  }, [theme, isFollowing]);

  const buttonIcon = useMemo(() => {
    if (isPending) {
      return (
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderTop: `2px solid ${theme.palette.primary.main}`,
            animation: "spin 1s linear infinite",
            mr: 1,
            "@keyframes spin": {
              "0%": {
                transform: "rotate(0deg)",
              },
              "100%": {
                transform: "rotate(360deg)",
              },
            },
          }}
        />
      );
    }

    if (isFollowing) {
      return <PersonIcon fontSize="small" />;
    }

    return <PersonAddIcon fontSize="small" />;
  }, [theme, isPending, isFollowing]);

  return (
    <Button
      variant={isFollowing ? "contained" : "outlined"}
      size="small"
      fullWidth
      startIcon={buttonIcon}
      onClick={() => handleClick(userId)}
      disabled={isPending || isFollowing}
      sx={buttonStyle}
    >
      {buttonText}
    </Button>
  );
});

FollowButton.displayName = "FollowButton";

export default ProfilesList;
