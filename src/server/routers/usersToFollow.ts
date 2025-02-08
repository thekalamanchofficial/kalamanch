import { protectedProcedure, router } from "../trpc";
import prisma from "~/server/db";
import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";

const featuredAuthorSchema = yup.object({
  userId: yup.string().required(),
  name: yup.string().required(),
  profile: yup.string().required(),
});

export const UsersToFollowRouter = router({
  addUserToFollow: protectedProcedure
    .input(yup.array(featuredAuthorSchema))
    .mutation(async ({ input }) => {
      try {
        if (!input) {
          throw new Error("Input is undefined");
        }
        for (const author of input) {
          const { userId, name, profile } = author;
          await prisma.userToFollow.create({
            data: {
              userId,
              name,
              profileImageUrl: profile,
            },
          });
        }
        return true;
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),

  getUsersToFollow: protectedProcedure
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

        const count = await prisma.userToFollow.count();

        if (count > limit + skip) {
          hasMore = true;
        }

        const usersToFollow = await prisma.userToFollow.findMany({
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
        }).catch((error) => {
          console.error("Error fetching featured authors:", error);
          throw error;
        });

        const authorsWithCounts = usersToFollow.map((author) => {
          return {
            ...author,
            followersCount: author.user.followers.length,
            postCount: author.user.posts.length,
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
