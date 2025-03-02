import { toast } from "react-toastify";
import { FileUploadSource } from "types/enums";
import { useUploadFileToR2 } from "~/app/_hooks/useUploadFileToR2";
import { useUser } from "~/context/userContext";
import { trpc } from "~/server/client";

type UserImageUploadReturn = {
  uploadImage: (file: File, fileUploadSource: FileUploadSource) => Promise<string>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

type UserImageUploadType = () => UserImageUploadReturn;

const useUserImageUpload: UserImageUploadType = () => {
  const { uploadFile } = useUploadFileToR2();
  const { user } = useUser();

  const {
    mutateAsync: updateProfileImage,
    isPending: isProfileImageLoading,
    isError: isProfileImageError,
    error: profileImageError,
  } = trpc.user.updateProfileImageUrl.useMutation({
    onSuccess: () => {
      toast.success("Profile image updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update profile image");
      console.log(error);
    },
  });

  const {
    mutateAsync: updateCoverImage,
    isPending: isCoverImageLoading,
    isError: isCoverImageError,
    error: coverImageError,
  } = trpc.user.updateCoverImageUrl.useMutation({
    onSuccess: () => {
      toast.success("Cover image updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update cover image");
      console.log(error);
    },
  });

  const uploadImage = async (file: File, fileUploadSource: FileUploadSource): Promise<string> => {
    const uploadedThumbnailUrl = await uploadFile(file, fileUploadSource);
    if (!uploadedThumbnailUrl) {
      throw new Error("Failed to upload the file to Cloudflare R2.");
    }

    if (fileUploadSource === FileUploadSource.PROFILE_IMAGE) {
      await updateProfileImage({
        userId: user?.id ?? "",
        profileImageUrl: uploadedThumbnailUrl,
      });
    }

    if (fileUploadSource === FileUploadSource.PROFILE_COVER_IMAGE) {
      await updateCoverImage({
        userId: user?.id ?? "",
        coverImageUrl: uploadedThumbnailUrl,
      });
    }

    return uploadedThumbnailUrl;
  };

  return {
    uploadImage,
    isLoading: (isProfileImageLoading ?? false) || (isCoverImageLoading ?? false),
    isError: (isProfileImageError ?? false) || (isCoverImageError ?? false),
    error: (profileImageError ?? coverImageError ?? null) as Error | null,
  };
};

export default useUserImageUpload;
