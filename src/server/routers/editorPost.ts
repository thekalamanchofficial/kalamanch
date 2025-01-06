import * as yup from "yup";
import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";
import { PostType } from "@prisma/client";
import { ObjectId } from "mongodb";

const metadataSchema = yup.object({
  title: yup.string().required(),
  targetAudience: yup.array().of(yup.string()).optional(),
  thumbnailUrl: yup.string().url().required(),
  postType: yup.string().required(), // Adjust validation based on your PostType enum
  actors: yup.array().of(yup.string()).optional(),
  tags: yup.array().of(yup.string()).optional(),
});

const editorPostSchema = yup.object({
  title: yup.string().required(),
  authorName: yup.string().required(),
  authorProfile: yup.string().required(),
  authorId: yup.string().required(),
  content: yup.string().required(),
  metadata: metadataSchema.required(),
  iterations: yup
    .array()
    .of(
      yup.object({
        iterationName: yup.string().required(),
        content: yup.string().required(),
        createdAt: yup.date().optional(),
        updatedAt: yup.date().optional(),
      })
    )
    .optional(),
});

export const editorPostRouter = router({
  createPost: publicProcedure
    .input(editorPostSchema)
    .mutation(async ({ input }) => {
      try {
        const editorPost = await prisma.editorPost.create({
          data: {
            title: input.title,
            authorName: input.authorName,
            authorProfile: input.authorProfile,
            authorId: input.authorId,
            content: input.content,
            metadata: {
              create: {
                title: input.metadata.title,
                targetAudience: (input.metadata.targetAudience ?? []) as string[],
                thumbnailUrl: input.metadata.thumbnailUrl,
                postType: input.metadata.postType as PostType, // Ensure PostType matches your Prisma enum
                actors: (input.metadata.actors ?? []) as string[],
                tags: (input.metadata.tags ?? []) as string[],
              },
            },
            Iterations: {
              create: input.iterations ?? [],
            },
          },
        });
        return editorPost;
      } catch (error) {
        throw error;
      }
    }),
});
