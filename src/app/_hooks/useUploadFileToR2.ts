import { useState } from "react";
import type { FileUploadSource } from "types/enums";
import { trpc } from "~/server/client";
import { handleError } from "../_utils/handleError";

type UploadFileToR2Return = {
  isUploading: boolean;
  uploadFile: (file: File, fileUploadSource: FileUploadSource) => Promise<string>;
};

type UploadFileToR2Type = () => UploadFileToR2Return;

export const useUploadFileToR2: UploadFileToR2Type = () => {
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync: getPresignedUrl } = trpc.presignedR2Url.getPresignedUrl.useMutation();

  const uploadFile = async (file: File, fileUploadSource: FileUploadSource): Promise<string> => {
    setIsUploading(true);
    try {
      const data = await getPresignedUrl({
        fileName: file.name,
        fileType: file.type,
        fileUploadSource,
      });

      if (!data) {
        throw new Error("Failed to get presigned URL.");
      }
      const { url: presignedUrl, key } = data;

      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      const publicBaseUrl = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL;
      if (uploadResponse.status === 200) {
        return `${publicBaseUrl}/${key}`;
      } else {
        throw new Error("File upload failed.");
      }
    } catch (uploadError) {
      console.error("Error uploading file:", uploadError);
      handleError("Failed to upload the file.");
    } finally {
      setIsUploading(false);
    }
    return "";
  };

  return {
    isUploading,
    uploadFile,
  };
};
