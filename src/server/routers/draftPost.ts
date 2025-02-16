import * as yup from "yup";
import { protectedProcedure, router } from "~/server/trpc";
import prisma from "../db";

const userIdSchema = yup.string().required("User ID is required");

const addDraftPostSchema = yup.object({
  id: yup.string().optional(),
  authorId: yup.string().required(),
  authorName: yup.string().required(),
  authorProfileImageUrl: yup.string().optional(),
  title: yup.string(),
  iterations: yup
    .array()
    .of(
      yup.object({
        iterationName: yup.string().required(),
        content: yup.string().optional(),
      }),
    )
    .optional(),
});

const updateDraftPostDetailsSchema = yup.object({
  draftPostId: yup.string().required(),
  title: yup.string().required(),
});

export const draftPostRouter = router({
  getDraftPostsForUser: protectedProcedure
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
          iterations: true,
        },
      });
      return draftPosts;
    }),

  getDraftPost: protectedProcedure
    .input(yup.string().required())
    .query(async ({ input }: { input: string }) => {
      const draftPost = await prisma.draftPost.findUnique({
        where: {
          id: input,
        },
        include: {
          iterations: true,
        },
      });
      return draftPost;
    }),

  addDraftPost: protectedProcedure.input(addDraftPostSchema).mutation(async ({ input }) => {
    console.log("input", input);
    const draftPost = await prisma.draftPost.create({
      data: {
        authorId: input.authorId,
        authorName: input.authorName,
        authorProfileImageUrl: input.authorProfileImageUrl ?? "",
        title: input.title ?? "",
        iterations: {
          create: input.iterations?.map((iteration) => ({
            iterationName: iteration.iterationName ?? "",
            content: iteration.content ?? "",
          })),
        },
      },
      include: {
        iterations: true,
      },
    });
    return draftPost;
  }),

  addIteration: protectedProcedure
    .input(
      yup.object({
        draftPostId: yup.string().required(),
        iterationName: yup.string().required(),
        content: yup.string().optional(),
      }),
    )
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

  updateIteration: protectedProcedure
    .input(
      yup.object({
        iterationId: yup.string().required(),
        iterationName: yup.string().required(),
        content: yup.string().optional(),
      }),
    )
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
  deleteDraftPost: protectedProcedure
    .input(yup.string().required())
    .mutation(async ({ input: draftPostId }) => {
      await prisma.draftPost.delete({
        where: {
          id: draftPostId,
        },
      });
    }),

  updateDraftPostDetails: protectedProcedure
    .input(updateDraftPostDetailsSchema)
    .mutation(async ({ input }) => {
      const { draftPostId, title } = input;
      await prisma.draftPost.update({
        where: {
          id: draftPostId,
        },
        data: {
          title,
        },
      });
    }),
});
