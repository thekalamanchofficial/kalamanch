import * as yup from "yup";
import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";

const editorPostSchema = yup.object({
  title: yup.string().required(),
  authorName: yup.string().required(),
  authorProfile: yup.string().required(),
  authorId: yup.string().required(),
  metadataId: yup.string().required(),
  posts: yup
    .array()
    .of(
      yup.object({
        iterationName: yup.string().required(),
        content: yup.string().required(),
        editorPostId: yup.string().optional(),
        createdAt: yup.date().optional(),
        updatedAt: yup.date().optional(),
      }),
    )
    .required(),
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
            metadataId: input.metadataId,
            posts: {
              create: input.posts.map((post) => ({
                iterationName: post.iterationName,
                content: post.content,
                editorPostId: post.editorPostId,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
              })),
            },
          },
        });
        return editorPost;
      } catch (error) {
        throw error;
      }
    }),
});
