import { publicProcedure, router } from "../trpc";
import * as yup from "yup";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { FileUploadSource } from "types/enums";

// Cloudflare R2 Configuration
const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
  },
});

const preSignedUrlSchema = yup.object({
  fileName: yup.string().required("File name is required."),
  fileType: yup
    .string()
    .matches(
      /^(image\/(jpeg|png|jpg)|video\/(mp4|mov))$/,
      "Only images (JPEG, PNG,JPG) and videos (MP4,MOV) are allowed.",
    )
    .required("File type is required."),
  fileUploadSource: yup
    .mixed<FileUploadSource>()
    .oneOf(Object.values(FileUploadSource), "Invalid file upload source.")
    .required("File upload source is required."),
});

// Generate Pre-signed URL for Uploading to Cloudflare R2
export const presignedR2UrlRouter = router({
  getPresignedUrl: publicProcedure
    .input(preSignedUrlSchema)
    .mutation(async ({ input }) => {
      try {
        const { fileName, fileType, fileUploadSource } = input;
        const bucketName = process.env.CLOUDFLARE_R2_BUCKET!;
        const objectKey = `${fileUploadSource.toString()}/${Date.now()}-${fileName}`;

        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: objectKey,
          ContentType: fileType,
        });

        // Generate a pre-signed URL that expires in 5 minutes
        let signedUrl = "";
        try {
          signedUrl = await getSignedUrl(r2Client, command, {
            expiresIn: 300, // 300 seconds = 5 minutes
          });
        } catch (error) {
          console.error("Error generating pre-signed URL:", error);
          throw new Error("Failed to generate pre-signed URL.");
        }
        return {
          url: signedUrl,
          key: objectKey,
        };
      } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        throw new Error("Failed to generate pre-signed URL.");
      }
    }),
});
