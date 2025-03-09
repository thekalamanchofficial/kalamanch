"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useUser } from "~/context/userContext";

const UserFeedCard = () => {
  const { user, isLoading } = useUser();
  const theme = useTheme();
  const router = useRouter();

  if (isLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          width: "100%",
          mt: 2,
          mb: 2,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return null;
  }

  const truncateBio = (text: string | null, maxLength = 100) => {
    if (!text) return "";
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const getLatestEducation = () => {
    if (!user.education || user.education.length === 0) return null;
    return user.education[user.education.length - 1];
  };

  const formatCount = (count = 0) => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();
  };

  const handleProfileClick = () => {
    router.push(`/profile/${user.id}`);
  };

  const followerCount = user.followers?.length ?? 0;
  const followingCount = user.following?.length ?? 0;
  const postCount = user.posts?.length ?? 0;
  const latestEducation = getLatestEducation();

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        mt: 2,
        mb: 2,
        borderRadius: 2,
        position: "relative",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Profile header with avatar and name */}
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar
            src={user.profileImageUrl}
            alt={user.name}
            sx={{
              width: 64,
              height: 64,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
            }}
            onClick={handleProfileClick}
          />
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                color: theme.palette.text.primary,
                lineHeight: 1.2,
              }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mt: 0.5,
                fontStyle: user.bio ? "normal" : "italic",
              }}
            >
              {truncateBio(user.bio, 60) || "No bio provided"}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        {/* User stats */}
        <Stack direction="row" justifyContent="space-around" sx={{ py: 1 }}>
          <Stack alignItems="center">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <PersonIcon fontSize="small" color="primary" />
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                {formatCount(followerCount)}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Followers
            </Typography>
          </Stack>

          <Stack alignItems="center">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <PeopleOutlineIcon fontSize="small" color="primary" />
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                {formatCount(followingCount)}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Following
            </Typography>
          </Stack>

          <Stack alignItems="center">
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ArticleIcon fontSize="small" color="primary" />
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                {formatCount(postCount)}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              Posts
            </Typography>
          </Stack>
        </Stack>

        {latestEducation && (
          <Box sx={{ mt: 1.5, display: "flex", alignItems: "center" }}>
            <SchoolIcon fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontStyle: "italic",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {latestEducation}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default UserFeedCard;
