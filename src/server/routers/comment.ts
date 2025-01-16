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
  parentId: yup.string().nullable(),
});

const bulkCommentSchema = commentSchema.shape({
  tempId: yup.string().required(),
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
        const tempToRealIdMap = new Map<string, string>();

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
        }));

        const createdParents = await prisma.$transaction(async (tx) => {
          const parents = await Promise.all(
            parentCommentData.map((data) =>
              tx.comment.create({
                data,
              }),
            ),
          );

          if (parents.length !== parentCommentData.length) {
            throw new Error("Failed to create all parent comments");
          }

          return parents;
        });

        if (parentComments.length !== createdParents.length) {
          throw new Error("Created parents count does not match input count");
        }

        parentComments.forEach((comment, index) => {
          const createdParent = createdParents[index];
          if (!createdParent?.id) {
            throw new Error(
              `Missing ID for created parent comment at index ${index}`,
            );
          }
          tempToRealIdMap.set(comment.tempId, createdParent.id);
        });

        if (childComments.length === 0) {
          return {
            comments: createdParents,
            idMappings: Array.from(tempToRealIdMap.entries()).map(
              ([tempId, realId]) => ({
                tempId,
                realId,
              }),
            ),
          };
        }

        const childCommentData = childComments.map((comment) => {
          const realParentId = comment.parentId
            ? comment.parentId.startsWith("temp-")
              ? tempToRealIdMap.get(comment.parentId)
              : comment.parentId
            : null;
          if (!realParentId) {
            throw new Error(
              `Parent comment with temp ID ${comment.parentId} not found`,
            );
          }

          return {
            postId: comment.postId,
            content: comment.content,
            userId,
            userName: comment.userName,
            userProfileImageUrl: comment.userProfileImageUrl,
            parentId: realParentId,
          };
        });

        const createdChildren = await prisma.$transaction(async (tx) => {
          const children = await Promise.all(
            childCommentData.map((data) =>
              tx.comment.create({
                data,
              }),
            ),
          );

          if (children.length !== childCommentData.length) {
            throw new Error("Failed to create all child comments");
          }

          return children;
        });

        if (childComments.length !== createdChildren.length) {
          throw new Error("Created children count does not match input count");
        }

        childComments.forEach((comment, index) => {
          const createdChild = createdChildren[index];
          if (!createdChild?.id) {
            throw new Error(
              `Missing ID for created child comment at index ${index}`,
            );
          }
          tempToRealIdMap.set(comment.tempId, createdChild.id);
        });

        const allCreatedComments = [...createdParents, ...createdChildren];

        return {
          comments: allCreatedComments,
          idMappings: Array.from(tempToRealIdMap.entries()).map(
            ([tempId, realId]) => ({
              tempId,
              realId,
            }),
          ),
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
