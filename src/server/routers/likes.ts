import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";

import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";

const bulkLikeSchema = yup.object({
  userEmail: yup.string().email().required(),
  likes: yup.array().of(
    yup.object({
      postId: yup.string().required('Post ID is required'),
      liked: yup.boolean().required('Liked field is required'),
    })
  ).required('Likes array is required'),
});

const getUserDetails = async (userEmail: string) => {
  const userDetails = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (!userDetails) {
    throw new Error("User not found");
  }
  return userDetails;
};

const likeSchema = yup.object({
  postId: yup.string().required(),
  userEmail: yup.string().email().required(),
});

export const likeRouter = router({
  likePost: publicProcedure.input(likeSchema).mutation(async ({ input }) => {
    try {
      const { postId, userEmail } = input;

      const userDetails = await getUserDetails(userEmail);
      const { id: userId } = userDetails;

      const existingLike = await prisma.like.findFirst({
        where: {
          postId: input.postId,
          userId,
        },
      });
      if (existingLike) {
        await prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            likeCount: {
              decrement: existingLike ? 1 : 0,
            },
          },
        });

        return { liked: false };
      } else {
        await prisma.like.create({
          data: {
            userId: userId,
            postId: postId,
          },
        });
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            likeCount: {
              increment: 1,
            },
          },
        });
        return { liked: true };
      }
    } catch (error) {
      handleError(error);
      throw error;
    }
  }),

  bulkLikePost: publicProcedure
  .input(bulkLikeSchema)
  .mutation(async ({ input }) => {
    try {
      if (!input) {
        return { message: "No input provided for bulk like operations." };
      }

      const { id: userId } = await getUserDetails(input.userEmail);

      const likesToCreate: { postId: string; userId: string }[] = [];
      const likesToDelete: { postId: string; userId: string }[] = [];
      const likeCountChanges: Record<string, number> = {};

      for (const { postId, liked } of input.likes) {
        if (liked) {
          likesToCreate.push({ postId, userId });
          likeCountChanges[postId] = (likeCountChanges[postId] ?? 0) + 1;
        } else {
          likesToDelete.push({ postId, userId });
          likeCountChanges[postId] = (likeCountChanges[postId] ?? 0) - 1;
        }
      }

      if (likesToCreate.length > 0) {
        await prisma.like.createMany({
          data: likesToCreate,
        });
      }

      if (likesToDelete.length > 0) {
        await prisma.like.deleteMany({
          where: {
            OR: likesToDelete.map(({ postId, userId }) => ({ postId, userId })),
          },
        });
      }

      const updatePromises = Object.entries(likeCountChanges).map(
        async ([postId, likeCountChange]) => {
          if (likeCountChange !== 0) {
            await prisma.post.update({
              where: { id: postId },
              data: { likeCount: { increment: likeCountChange } },
            });
          }
        }
      );

      await Promise.all(updatePromises);

      return { message: "Bulk like operations completed successfully." };
    } catch (error) {
      handleError(error);
      throw error;
    }
  }),

  getUserLikes: publicProcedure
    .input(
      yup.object({
        userEmail: yup.string().email().required(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { userEmail } = input;

        const userDetails = await getUserDetails(userEmail);

        const { id: userId } = userDetails;

        const userLikes = await prisma.like.findMany({
          where: {
            userId: userId,
          },
          select: {
            postId: true,
          },
        });

        const likedPostIds = userLikes.map((like) => like.postId);

        return likedPostIds;
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),
  getUserLikedPost: publicProcedure
    .input(
      yup.object({
        userEmail: yup.string().email().required(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { userEmail } = input;

        const userDetails = await getUserDetails(userEmail);

        const likedPost = await prisma.like.findMany({
          where: {
            userId: userDetails.id,
          },
          select: {
            post: {
              include: {
                comments: {
                  include: {
                    replies: true,
                  },
                },
                likes: true,
              },
            },
          },
        });

        const formattedLikedPost = likedPost.map((like) => like.post);

        return formattedLikedPost;
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),
});
