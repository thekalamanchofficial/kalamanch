import * as yup from "yup";
import { router, publicProcedure } from "~/server/trpc";
import prisma from "../db";
import { PostType } from "@prisma/client";

const userIdSchema = yup.string().required("User ID is required");

const addDraftPostSchema = yup.object({
  id: yup.string().optional(),
  authorId: yup.string().required(),
  authorName: yup.string().required(),
  authorProfileImageUrl: yup.string().optional(),
  postDetails: yup.object({
    title: yup.string().required(),
    targetAudience: yup.array(yup.string()).optional(),
    postType: yup.string().required(),
    actors: yup.array(yup.string()).optional(),
    tags: yup.array(yup.string()).optional(),
    thumbnailDetails: yup.object({
      url: yup.string().optional(),
      content: yup.string().optional(),
      title: yup.string().optional(),
    }).required(),
  }).required(),
  iterations: yup.array().of(
    yup.object({
      iterationName: yup.string().required(),
      content: yup.string().optional()
    })
  ).optional()
});

export const draftPostRouter = router({
  getDraftPostsForUser: publicProcedure
    .input(userIdSchema)
    .query(async ({ input }: { input: string }) => {
      const draftPosts = await prisma.draftPost.findMany({
        where: {
          authorId: input,
        },
      });
      return draftPosts;
    }),

  getDraftPost: publicProcedure
    .input(yup.string().required())
    .query(async ({ input }: { input: string }) => {
      const draftPost = await prisma.draftPost.findUnique({
        where: {
          id: input,
        },
        include: {
            iterations: true
        }
      });
      return draftPost;
    }),

  addDraftPost: publicProcedure
    .input(addDraftPostSchema)
    .mutation(async ({ input }) => {

      const cleanArray = (array?: (string | undefined)[]): string[] => 
            array?.filter((item): item is string => item !== undefined) ?? [];
      const draftPost = await prisma.draftPost.create({
        data: {
          authorId: input.authorId,
          authorName: input.authorName,
          authorProfileImageUrl: input.authorProfileImageUrl ?? "",
          postDetails: {
            title: input.postDetails.title,
            targetAudience: cleanArray(input.postDetails.targetAudience) ?? [],
            postType: input.postDetails.postType.toUpperCase() as PostType,
            actors: cleanArray(input.postDetails.actors) ?? [],
            tags: cleanArray(input.postDetails.tags) ?? [],
            thumbnailDetails: {
              url: input.postDetails.thumbnailDetails.url ?? "",
              content: input.postDetails.thumbnailDetails.content,
              title: input.postDetails.thumbnailDetails.title,
            },
          },
          iterations: {
            create: input.iterations?.map((iteration) => ({
              iterationName: iteration.iterationName ?? "",
              content: iteration.content ?? "",
            })),
          },
        },
      });
      return draftPost;
    }),

    addIteration: publicProcedure
    .input(yup.object({
      draftPostId: yup.string().required(),
      iterationName: yup.string().required(),
      content: yup.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const iteration = await prisma.iterations.create({
        data: {
          draftPostId: input.draftPostId,
          iterationName: input.iterationName,
          content: input.content ?? "",
        },
      });
      return iteration;
    }),

    updateIteration: publicProcedure
    .input(yup.object({
      iterationId: yup.string().required(),
      iterationName: yup.string().required(),
      content: yup.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const iteration = await prisma.iterations.update({
        where: {
          id: input.iterationId,
        },
        data: {
          iterationName: input.iterationName,
          content: input.content ?? "",
        },
      });
      return iteration;
    }),
});
