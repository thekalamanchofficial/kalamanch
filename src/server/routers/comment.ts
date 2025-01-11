import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";

import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";

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

const commentSchema = yup.object({
  userEmail: yup.string().email().required(),
  userName: yup.string().required(),
  content: yup.string().required().min(1),
  postId: yup.string().required(),
  userProfileImageUrl: yup.string().required(),
  parentId: yup.string().optional(),
});

export const commentRouter = router({
  addComment: publicProcedure
    .input(commentSchema)
    .mutation(async ({ input }) => {
      try {
        const { postId, userEmail, userName, content, userProfileImageUrl, parentId } = input;

        const userDetails = await getUserDetails(userEmail);
        const { id: userId } = userDetails;

        const comment = await prisma.comment.create({
          data: {
            userId,
            postId,
            userName,
            userProfileImageUrl,
            content,
            parentId: parentId === "" ? null : parentId,
          },
        });
        return comment;
      } catch (error) {
        // handleError(error);
        throw error;
      }
    }),

  getComments: publicProcedure
    .input(
      yup.object({
        postId: yup.string().required(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { postId } = input;

        // Fetch comments with their replies
        const comments = await prisma.comment.findMany({
          where: {
            postId,
            parentId: null, // Fetch only top-level comments
          },
          include: {
            replies: {
              include: {
                user: true, // Optionally include user details for replies
                replies: true, // Optionally include replies for replies
              },
            },
          },
        });

        return comments;
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),

  getPostReplies: publicProcedure
    .input(
      yup.object({
        postId: yup.string().required(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { postId } = input;

        // Fetch only replies
        const replies = await prisma.comment.findMany({
          where: {
            parentId: postId,
          },
          include: {
            user: true,
          },
        });

        return replies;
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),
});
