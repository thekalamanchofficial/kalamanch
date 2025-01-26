import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";

import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";
import getUserDetails from "../utils/getUserDetails";

const commentSchema = yup.object({
  userEmail: yup.string().email().required(),
  userName: yup.string().required(),
  content: yup.string().required().min(1),
  postId: yup.string().required(),
  userProfileImageUrl: yup.string().required(),
  parentId: yup.string().nullable(),
});

const bulkCommentSchema = commentSchema.shape({
  id: yup.string().required(),
});

const bulkCommentsInputSchema = yup.object({
  userEmail: yup.string().email().required(),
  comments: yup.array().of(bulkCommentSchema).required(),
});

type BulkCommentInput = yup.InferType<typeof bulkCommentSchema>;

export const commentRouter = router({
  addComment: publicProcedure
    .input(commentSchema)
    .mutation(async ({ input }) => {
      try {
        const {
          postId,
          userEmail,
          userName,
          content,
          userProfileImageUrl,
          parentId,
        } = input;

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

  bulkAddComments: publicProcedure
    .input(bulkCommentsInputSchema)
    .mutation(async ({ input }) => {
      try {
        const userDetails = await getUserDetails(input.userEmail);
        const { id: userId } = userDetails;

        const parentComments: BulkCommentInput[] = [];
        const childComments: BulkCommentInput[] = [];

        input.comments.forEach((comment) => {
          if (!comment.parentId) {
            parentComments.push(comment);
          } else {
            childComments.push(comment);
          }
        });

        const parentCommentData = parentComments.map((comment) => ({
          postId: comment.postId,
          content: comment.content,
          userId,
          userName: comment.userName,
          userProfileImageUrl: comment.userProfileImageUrl,
          parentId: null,
          id: comment.id,
        }));

        if (parentCommentData.length > 0) {
          const createdParents = await prisma.comment.createMany({
            data: parentCommentData,
          });

          if (createdParents.count !== parentCommentData.length) {
            throw new Error("Failed to create all parent comments");
          }
        }

        if (childComments.length === 0) {
          return {
            comments: parentCommentData,
          };
        }

        const childCommentData = childComments.map((comment) => ({
          postId: comment.postId,
          content: comment.content,
          userId,
          userName: comment.userName,
          userProfileImageUrl: comment.userProfileImageUrl,
          parentId: comment.parentId,
          id: comment.id,
        }));

        if (childCommentData.length > 0) {
          const createdChildren = await prisma.comment.createMany({
            data: childCommentData,
          });

          if (createdChildren.count !== childCommentData.length) {
            throw new Error("Failed to create all child comments");
          }
        }

        const allCreatedComments = [...parentCommentData, ...childCommentData];

        return {
          comments: allCreatedComments,
        };
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
