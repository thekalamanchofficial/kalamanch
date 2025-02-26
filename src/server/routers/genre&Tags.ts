import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";
import prisma from "~/server/db";
import { protectedProcedure, router } from "../trpc";

const createGenreSchema = yup.object({
  name: yup.string().required("Genre name is required"),
});

const createTagSchema = yup.object({
  name: yup.string().required("Tag name is required"),
  genreIds: yup
    .array()
    .of(yup.string().required("Genre ID is required"))
    .min(1, "At least one Genre ID is required"),
});

export const genreTagRouter = router({
  getGenres: protectedProcedure.query(async () => {
    try {
      const genres = await prisma.genre.findMany({
        include: { tags: true },
      });
      return genres;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to fetch genres.");
    }
  }),

  getGenre: protectedProcedure
    .input(yup.object({ name: yup.string().required("Genre name is required") }))
    .query(async ({ input }) => {
      try {
        const genre = await prisma.genre.findUnique({
          where: { name: input.name },
          include: { tags: true },
        });
        return genre;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to fetch genre.");
      }
    }),

  createGenre: protectedProcedure.input(createGenreSchema).mutation(async ({ input }) => {
    try {
      const genre = await prisma.genre.create({
        data: { name: input.name },
      });
      return genre;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to create genre.");
    }
  }),

  getTags: protectedProcedure.query(async () => {
    try {
      const tags = await prisma.tag.findMany({
        include: { genres: true },
      });
      return tags;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to fetch tags.");
    }
  }),

  getTag: protectedProcedure
    .input(yup.object({ name: yup.string().required("Tag name is required") }))
    .query(async ({ input }) => {
      try {
        const tag = await prisma.tag.findUnique({
          where: { name: input.name },
          include: { genres: true },
        });
        return tag;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to fetch tag.");
      }
    }),

  createTag: protectedProcedure.input(createTagSchema).mutation(async ({ input }) => {
    try {
      const tag = await prisma.tag.create({
        data: {
          name: input.name,
          genreIds: input?.genreIds,
        },
      });

      await prisma.genre.updateMany({
        where: { id: { in: input.genreIds } },
        data: { tagIds: { push: tag.id } },
      });

      return tag;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to create tag.");
    }
  }),
});
