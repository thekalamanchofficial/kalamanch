import * as yup from "yup";
import { router, publicProcedure } from "~/server/trpc";
import prisma from "../db";
import { PostType } from "@prisma/client";
import { update } from "lodash";

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
      content: yup.string().optional().nullable(),
      title: yup.string().optional().nullable(),
    }).required(),
  }).required(),
  iterations: yup.array().of(
    yup.object({
      iterationName: yup.string().required(),
      content: yup.string().optional()
    })
  ).optional()
});

const updateDraftPostDetailsSchema = yup.object({
  draftPostId: yup.string().required(),
  postDetails: yup.object({
    title: yup.string().required(),
    targetAudience: yup.array(yup.string()).optional(),
    postType: yup.string().required(),
    actors: yup.array(yup.string()).optional(),
    tags: yup.array(yup.string()).optional(),
    thumbnailDetails: yup.object({
      url: yup.string().optional(),
      content: yup.string().optional().nullable(),
      title: yup.string().optional().nullable(),
    }).required(),
  }).required(),
})

const cleanArray = (array?: (string | undefined)[]): string[] => 
  array?.filter((item): item is string => item !== undefined) ?? [];

export const draftPostRouter = router({
  getDraftPostsForUser: publicProcedure
    .input(userIdSchema)
    .query(async ({ input }: { input: string }) => {
      const draftPosts = await prisma.draftPost.findMany({
        where: {
          authorId: input,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          iterations: true
        }
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
        include: {
          iterations: true
        }
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
    deleteDraftPost: publicProcedure
    .input(yup.string().required())
    .mutation(async ({ input: draftPostId }) => {
      await prisma.draftPost.delete({
        where: {
          id: draftPostId,
        },
      })
    }),

    updateDraftPostDetails: publicProcedure
    .input(updateDraftPostDetailsSchema).
    mutation(async ({ input }) => {
      const { draftPostId, postDetails } = input;
      await prisma.draftPost.update({
        where: {
          id: draftPostId,
        },
        data: { 
          postDetails: {
            update: {
              title: postDetails.title,
              targetAudience: cleanArray(postDetails.targetAudience),
              postType: postDetails.postType as PostType,
              actors: cleanArray(postDetails.actors),
              tags: cleanArray(postDetails.tags),
              thumbnailDetails: {
                update: {
                  url: postDetails.thumbnailDetails.url,
                  content: postDetails.thumbnailDetails.content,
                  title: postDetails.thumbnailDetails.title,
                }
              }
            }
          }
        }
    })
    }),
});
