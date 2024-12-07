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
  name: yup.string().required(),
  content: yup.string().required().min(1),
  postId: yup.string().required(),
  profile: yup.string().required(),
});

export const commentRouter = router({
  addComment: publicProcedure
    .input(commentSchema)
    .mutation(async ({ input }) => {
      try {
        const { postId, userEmail, name, content, profile } = input;

        const userDetails = await getUserDetails(userEmail);
        const { id: userId } = userDetails;

        const comment = await prisma.comment.create({
          data: {
            userId,
            postId,
            name,
            profile,
            content,
          },
        });
        return comment;
      } catch (error) {
        handleError(error);
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

        const comments = await prisma.comment.findMany({
          where: {
            postId,
          },
        });

        return comments;
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),
});
