import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";

import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";
import { PostStatus } from "@prisma/client";
import getUserDetails from "../utils/getUserDetails";

const bulkLikeSchema = yup.object({
  userEmail: yup.string().email().required(),
  likes: yup.array().of(
    yup.object({
      postId: yup.string().optional().nullable(),
      iterationId: yup.string().optional().nullable(),
      postStatus: yup.string().required(),
      liked: yup.boolean().required('Liked field is required'),
    })
  ).required('Likes array is required'),
});

const likeSchema = yup.object({
  postId: yup.string().optional().nullable(),
  iterationId: yup.string().optional().nullable(),
  postStatus: yup.string().required(),
  userEmail: yup.string().email().required(),
});

export const likeRouter = router({

    likePost: publicProcedure.input(likeSchema).mutation(async ({ input }) => {
      try {
        const { postId, userEmail, postStatus, iterationId } = input;
  
        // Fetch user details
        const userDetails = await getUserDetails(userEmail);
        const { id: userId } = userDetails;
  
        const isPublished = postStatus === PostStatus.PUBLISHED.toString().toUpperCase();
        const targetId = isPublished ? postId : iterationId;
        if (!targetId) {
          throw new Error("Neither postId nor iterationId is provided.");
        }
        // Check for existing like
        const existingLike = await prisma.like.findFirst({
          where: {
            userId,
            ...(isPublished ? { postId } : { iterationId }),
          },
        });
  
        if (existingLike) {
          // Remove the like
          await prisma.like.delete({
            where: { id: existingLike.id },
          });
  
          if (isPublished) {
            await prisma.post.update({
              where: { id: targetId },
              data: {
                likeCount: {
                  decrement: 1,
                },
              },
            });
          } else {
            await prisma.iterations.update({
              where: { id: targetId },
              data: {
                likeCount: {
                  decrement: 1,
                },
              },
            });
          }
  
          return { liked: false };
        } else {
          // Add a new like
          await prisma.like.create({
            data: {
              userId,
              ...(isPublished ? { postId } : { iterationId }),
            },
          });
  
          // Update like count in the respective table
          if(isPublished){
              await prisma.post.update({
                where: { id: targetId },
                data: {
                  likeCount: {
                    increment: 1,
                  },
                },
            });
          } else {
            await prisma.iterations.update({
              where: { id: targetId },
              data: {
                likeCount: {
                  increment: 1,
                },
              },
            });
          }
  
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

      const likesToCreate: { postId?: string | null | undefined; iterationId?: string | null | undefined; userId: string ,postStatus: PostStatus }[] = [];
      const likesToDelete: {  postId?: string | null | undefined; iterationId?: string | null | undefined; userId: string ,postStatus: PostStatus}[] = [];
      const postLikeCountChanges: Record<string, number> = {};
      const iterationLikeCountChanges: Record<string, number> = {};

      for (const { postId,iterationId, liked, postStatus } of input.likes) {
        const postStatusEnum = postStatus.toUpperCase() as PostStatus;
        if (liked) {
          likesToCreate.push({ postId,iterationId, userId ,postStatus:postStatusEnum});
          if(postId){
            postLikeCountChanges[postId] = (postLikeCountChanges[postId] ?? 0) + 1;
          }
          else if (iterationId){
            iterationLikeCountChanges[iterationId] = (iterationLikeCountChanges[iterationId] ?? 0) + 1;
          }
        } else {
          likesToDelete.push({ postId, userId,postStatus: PostStatus.PUBLISHED });
          if(postId){
            postLikeCountChanges[postId] = (postLikeCountChanges[postId] ?? 0) - 1;
          }
          else if (iterationId){
            iterationLikeCountChanges[iterationId] = (iterationLikeCountChanges[iterationId] ?? 0) - 1;
          }
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
      const updatePostLikeCountPromises = Object.entries(postLikeCountChanges).map(
        async ([postId,likeCountChange]) => {
          if (likeCountChange !== 0) {
            await prisma.post.update({
              where: { id: postId },
              data: { likeCount: { increment: likeCountChange } },
            });
          }
        }
      );
      const updateIterationLikeCountPromises = Object.entries(iterationLikeCountChanges).map(
        async ([iterationId,likeCountChange]) => {
          if (likeCountChange !== 0) {
            await prisma.iterations.update({
              where: { id: iterationId },
              data: { likeCount: { increment: likeCountChange } },
            });
          }
        }
      );
  

      await Promise.all(updatePostLikeCountPromises);
      await Promise.all(updateIterationLikeCountPromises);

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
        postStatus: yup.string().required(),
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
            postStatus: input.postStatus.toUpperCase() as PostStatus,
          },
          select: {
            postId: true,
            iterationId: true,
          },
        });
        if(input.postStatus === PostStatus.PUBLISHED.toString().toUpperCase()){
          const likedPostIds = userLikes.map((like) => like.postId).filter((postId) => postId !== null);
          return likedPostIds;
        }
        const likedIterationIds = userLikes.map((like) => like.iterationId).filter((iterationId) => iterationId !== null);
        return likedIterationIds;
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),
  getUserLikedPost: publicProcedure
    .input(
      yup.object({
        userEmail: yup.string().email().required(),
        postStatus: yup.string().required(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { userEmail } = input;

        const userDetails = await getUserDetails(userEmail);

        const likedPost = await prisma.like.findMany({
          where: {
            userId: userDetails.id,
            postStatus: input.postStatus.toUpperCase() as PostStatus,
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

        const formattedLikedPost = likedPost.map((like) => like.post).filter((post) => post !== null);

        return formattedLikedPost;
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),
});
