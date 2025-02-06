"use client";

import type React from "react";
import { useRef } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useRouter } from "next/navigation";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import useUserImageUpload from "../../_hooks/useUserImageUpload";
import { FileUploadSource } from "types/enums";

interface ProfileCardProps {
  name: string;
  bio: string;
  followers?: number;
  posts?: number;
  profileImage?: string;
  coverImage?: string;
  handleEditProfileOpen: () => void;
  onImageUpdate: (uploadSource: FileUploadSource, url: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  bio,
  followers,
  posts,
  profileImage,
  coverImage,
  handleEditProfileOpen,
  onImageUpdate,
}) => {
  const router = useRouter();
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useUserImageUpload();

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
          position: "relative",
        }}
      >
        <Button
          variant="contained"
          startIcon={<CameraAltIcon />}
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            backgroundColor: (theme) => theme.palette.secondary.main,
            color: "text.primary",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.secondary.dark,
            },
            textTransform: "none",
            borderRadius: "20px",
            padding: "6px 16px",
          }}
          onClick={() => coverInputRef.current?.click()}
        >
          {STATIC_TEXTS.MY_PROFILE_PAGE.CHANGE_COVER}
        </Button>
        <input
          ref={coverInputRef}
          type="file"
          hidden
          accept="image/jpeg,image/png,image/jpg"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const uploadedThumbnailUrl = await uploadImage(
              file,
              FileUploadSource.PROFILE_COVER_IMAGE,
            );
            onImageUpdate(
              FileUploadSource.PROFILE_COVER_IMAGE,
              uploadedThumbnailUrl,
            );
          }}
        />
      </Box>
      <CardContent sx={{ position: "relative", padding: "20px 40px", gap: 24 }}>
        <Box>
          <Box
            sx={{
              position: "absolute",
              width: "fit-content",
              top: -50,
              left: 40,
            }}
          >
            <Avatar
              src={profileImage}
              alt={name}
              sx={{
                width: 118,
                height: 118,
                border: "3px solid white",
              }}
            />
            <IconButton
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: (theme) => theme.palette.grey[800],
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.grey[900],
                },
                padding: "8px",
              }}
              onClick={() => profileInputRef.current?.click()}
            >
              <CameraAltIcon
                sx={{
                  color: (theme) => theme.palette.grey[100],
                  fontSize: (theme) => theme.typography.h3.fontSize,
                }}
              />
            </IconButton>
            <input
              ref={profileInputRef}
              type="file"
              hidden
              accept="image/jpeg,image/png,image/jpg"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const uploadedThumbnailUrl = await uploadImage(
                  file,
                  FileUploadSource.PROFILE_IMAGE,
                );
                onImageUpdate(
                  FileUploadSource.PROFILE_IMAGE,
                  uploadedThumbnailUrl,
                );
              }}
            />
          </Box>
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
            onClick={handleEditProfileOpen}
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
