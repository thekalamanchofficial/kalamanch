"use client";

import type React from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
  type Theme,
} from "@mui/material";
import { FileUploadSource } from "types/enums";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import useUserImageUpload from "../../_hooks/useUserImageUpload";

interface ProfileCardProps {
  name: string;
  bio: string;
  followers?: number;
  posts?: number;
  profileImage?: string;
  coverImage?: string;
  handleEditProfileOpen: () => void;
  onImageUpdate: (uploadSource: FileUploadSource, url: string) => void;
  isOwner: boolean;
}

const styles = {
  card: {
    boxShadow: "none",
  },
  header: {
    padding: "8px 20px",
    display: "flex",
  },
  coverImage: {
    height: 156,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },
  changeCoverButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: (theme: Theme) => theme.palette.secondary.main,
    color: "text.primary",
    "&:hover": {
      backgroundColor: (theme: Theme) => theme.palette.secondary.dark,
    },
    textTransform: "none",
    border: "1px solid",
    borderColor: "common.gray",
    borderRadius: "20px",
    padding: "6px 16px",
  },
  cardContent: {
    position: "relative",
    padding: "20px 40px",
    gap: 24,
  },
  profileImageContainer: {
    position: "absolute",
    width: "fit-content",
    top: -50,
    left: 40,
  },
  profileAvatar: {
    width: 118,
    height: 118,
    border: "3px solid white",
  },
  editProfileButton: {
    position: "absolute",
    top: 10,
    right: 20,
    borderRadius: 5,
    textTransform: "none",
    height: 32,
    minHeight: 32,
    width: 136,
    padding: "6px 16px",
    backgroundColor: (theme: Theme) => theme.palette.secondary.light,
  },
  profileInfo: {
    padding: "92px 10px 0 10px",
    display: "flex",
    flexDirection: "column",
  },
  statsContainer: {
    display: "flex",
    alignItems: "center",
    width: "50%",
  },
};

const Header: React.FC<{ name: string; posts?: number }> = ({ name, posts }) => {
  const router = useRouter();
  return (
    <Box sx={styles.header}>
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
  );
};

const CoverImageSection: React.FC<{
  coverImage?: string;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isOwner: boolean;
}> = ({ coverImage, onImageSelect, inputRef, isOwner }) => (
  <Box
    sx={{
      ...styles.coverImage,
      backgroundImage: `url(${coverImage})`,
      backgroundColor: `${coverImage ? "" : "secondary.main"}`,
    }}
  >
    {isOwner && (
      <>
        <Button
          variant="contained"
          startIcon={<CameraAltIcon />}
          sx={styles.changeCoverButton}
          onClick={() => inputRef.current?.click()}
        >
          {STATIC_TEXTS.MY_PROFILE_PAGE.CHANGE_COVER}
        </Button>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/jpeg,image/png,image/jpg"
          onChange={onImageSelect}
        />
      </>
    )}
  </Box>
);

const ProfileImageSection: React.FC<{
  profileImage?: string;
  name: string;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isOwner: boolean;
}> = ({ profileImage, name, onImageSelect, inputRef, isOwner }) => (
  <Box sx={styles.profileImageContainer}>
    <Avatar src={profileImage} alt={name} sx={styles.profileAvatar} />
    {isOwner && (
      <>
        <IconButton
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: (theme) => theme.palette.grey[800],
            "&:hover": {
              backgroundColor: (theme) => theme.palette.grey[900],
            },
            "&.MuiIconButton-root": {
              minHeight: 36,
            },
          }}
          onClick={() => inputRef.current?.click()}
        >
          <CameraAltIcon
            fontSize="small"
            sx={{
              color: (theme) => theme.palette.grey[100],
            }}
          />
        </IconButton>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/jpeg,image/png,image/jpg"
          onChange={onImageSelect}
        />
      </>
    )}
  </Box>
);

const ProfileStats: React.FC<{ followers?: number; posts?: number }> = ({ followers, posts }) => (
  <Box sx={styles.statsContainer} gap={1}>
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
);

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  bio,
  followers,
  posts,
  profileImage,
  coverImage,
  handleEditProfileOpen,
  onImageUpdate,
  isOwner,
}) => {
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage } = useUserImageUpload();

  const handleImageUpload = async (file: File | undefined, uploadSource: FileUploadSource) => {
    if (!file) return;
    const uploadedThumbnailUrl = await uploadImage(file, uploadSource);
    onImageUpdate(uploadSource, uploadedThumbnailUrl);
  };

  return (
    <Card sx={styles.card}>
      <Header name={name} posts={posts} />

      <CoverImageSection
        coverImage={coverImage}
        onImageSelect={async (e) => {
          await handleImageUpload(e.target.files?.[0], FileUploadSource.PROFILE_COVER_IMAGE);
        }}
        inputRef={coverInputRef}
        isOwner={isOwner}
      />

      <CardContent sx={styles.cardContent}>
        <Box>
          <ProfileImageSection
            profileImage={profileImage}
            name={name}
            onImageSelect={async (e) => {
              await handleImageUpload(e.target.files?.[0], FileUploadSource.PROFILE_IMAGE);
            }}
            inputRef={profileInputRef}
            isOwner={isOwner}
          />

          {isOwner && (
            <Button
              variant="text"
              size="small"
              startIcon={<ModeEditOutlineOutlinedIcon />}
              sx={styles.editProfileButton}
              onClick={handleEditProfileOpen}
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Box sx={styles.profileInfo} gap={1}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {bio}
          </Typography>
          <ProfileStats followers={followers} posts={posts} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
