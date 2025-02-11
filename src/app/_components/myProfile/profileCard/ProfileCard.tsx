"use client";

import React from "react";
import { useRouter } from "next/navigation";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Avatar, Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material";

interface ProfileCardProps {
  name: string | null | undefined;
  bio: string;
  followers?: number;
  posts?: number;
  profileImage?: string;
  coverImage?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  bio,
  followers,
  posts,
  profileImage,
  coverImage,
}) => {
  const router = useRouter();

  return (
    <Card sx={{ boxShadow: "none" }}>
      <Box sx={{ padding: "8px 20px", display: "flex" }}>
        <IconButton onClick={() => router.back()}>
          <KeyboardBackspaceIcon />
        </IconButton>
        <Box>
          <Typography variant="subtitle2">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {posts} posts
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          height: 156,
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>
      <CardContent sx={{ position: "relative", padding: "20px 40px", gap: 24 }}>
        <Box>
          <Avatar
            src={profileImage}
            alt={`${name}`}
            sx={{
              width: 118,
              height: 118,
              border: "3px solid white",
              position: "absolute",
              top: -50,
              left: 40,
            }}
          />
          <Button
            variant="text"
            size="small"
            startIcon={<ModeEditOutlineOutlinedIcon />}
            sx={{
              position: "absolute",
              top: 10,
              right: 20,
              borderRadius: 5,
              textTransform: "none",
              height: 32,
              minHeight: 32,
              width: 136,
              padding: "6px 16px",
              backgroundColor: (theme) => theme.palette.secondary.light,
            }}
          >
            Edit Profile
          </Button>
        </Box>
        <Box
          sx={{
            padding: "92px 10px 0 10px",
            display: "flex",
            flexDirection: "column",
          }}
          gap={1}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {bio}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "50%",
            }}
            gap={1}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="subtitle2" align="center" fontWeight="bold">
                {followers}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Followers
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="subtitle2" align="center" fontWeight="bold">
                {posts}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Posts
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
