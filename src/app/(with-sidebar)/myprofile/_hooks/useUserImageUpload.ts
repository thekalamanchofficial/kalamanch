import { useState } from "react";
import { FileUploadSource } from "types/enums";
import { useUploadFileToR2 } from "~/app/_hooks/useUploadFileToR2";
import { handleError } from "~/app/_utils/handleError";
import { useUser } from "~/context/userContext";
import { trpc } from "~/server/client";

type UserImageUploadReturn = {
  uploadImage: (file: File, fileUploadSource: FileUploadSource) => Promise<string>;
  loading: boolean;
};

type UserImageUploadType = () => UserImageUploadReturn;

const useUserImageUpload: UserImageUploadType = () => {
  const [loading, setLoading] = useState(false);
  const { uploadFile } = useUploadFileToR2();
  const { user } = useUser();

  const updateProfileImageMutation = trpc.user.updateProfileImageUrl.useMutation();
  const updateCoverImageMutation = trpc.user.updateCoverImageUrl.useMutation();

  const uploadImage = async (file: File, fileUploadSource: FileUploadSource): Promise<string> => {
    setLoading(true);
    try {
      const uploadedThumbnailUrl = await uploadFile(file, fileUploadSource);
      if (!uploadedThumbnailUrl) {
        throw new Error("Failed to upload the file to Cloudflare R2.");
      }
      if (fileUploadSource === FileUploadSource.PROFILE_IMAGE) {
        await updateProfileImageMutation.mutateAsync({
          userId: user?.id ?? "",
          profileImageUrl: uploadedThumbnailUrl,
        });
      }
      if (fileUploadSource === FileUploadSource.PROFILE_COVER_IMAGE) {
        await updateCoverImageMutation.mutateAsync({
          userId: user?.id ?? "",
          coverImageUrl: uploadedThumbnailUrl,
        });
      }
      return uploadedThumbnailUrl;
    } catch (error) {
      console.log(error);
      handleError("Failed to upload the file.");
      throw new Error("Failed to upload the file.");
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadImage,
    loading,
  };
};

export default useUserImageUpload;
