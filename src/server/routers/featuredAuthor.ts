import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";
import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";

const featuredAuthorSchema = yup.object({
  userId: yup.string().required(),
  name: yup.string().required(),
  profile: yup.string().required(),
});

export const featuredAuthorRouter = router({
  addFeaturedAuthor: publicProcedure
    .input(yup.array(featuredAuthorSchema))
    .mutation(async ({ input }) => {
      try {
        if (!input) {
          throw new Error("Input is undefined");
        }
        for (const author of input) {
          const { userId, name, profile } = author;
          await prisma.featuredAuthor.create({
            data: {
              userId,
              name,
              profile,
            },
          });
        }
        return true;
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),

  getFeaturedAuthors: publicProcedure
    .input(
      yup.object({
        limit: yup.number().min(1).default(5),
        skip: yup.number().min(0).default(0),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { limit, skip } = input;

        let hasMore = false;

        const count = await prisma.featuredAuthor.count();

        if (count > limit + skip) {
          hasMore = true;
        }

        const featuredAuthors = await prisma.featuredAuthor.findMany({
          take: limit,
          skip: skip,
          include: {
            user: {
              select: {
                followers: true,
                posts: true,
              },
            },
          },
        });

        const authorsWithCounts = featuredAuthors.map((author) => {
          return {
            ...author,
            followersCount: author.user.followers.length,
            articlesCount: author.user.posts.length,
          };
        });

        return {
          featuredAuthor: authorsWithCounts,
          hasMoreAuthor: hasMore,
        };
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),
});
