import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";
import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";

const featuredPostSchema = yup.object({
  postId: yup.string().required(),
  title: yup.string().required(),
  authorName: yup.string().required(),
  authorId: yup.string().required(),
  authorProfile: yup.string().required(),
});

export const featuredPostRouter = router({
  addFeaturedPost: publicProcedure
    .input(featuredPostSchema)
    .mutation(async ({ input }) => {
      try {
        const { postId, title, authorName, authorProfile, authorId } = input;
        const featuredPost = await prisma.featuredPost.create({
          data: {
            postId,
            title,
            authorName,
            authorProfile,
            authorId,
          },
        });
        return featuredPost;
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),

  getFeaturedPosts: publicProcedure
    .input(
      yup.object({
        limit: yup.number().min(1).default(5),
        skip: yup.number().min(0).default(0),
      }),
    )
    .query(async ({ input }) => {
      const { limit, skip } = input;
      try {
        let hasMore = false;

        const count = await prisma.featuredPost.count();

        if (count > limit + skip) {
          hasMore = true;
        }

        const featuredPosts = await prisma.featuredPost.findMany({
          include: {
            post: {
              select: {
                likeCount: true,
              },
            },
          },
          take: limit,
          skip: skip,
        });

        const featuredPostWithLikeCount = featuredPosts.map(
          (featuredPost: {
            id: string;
            postId: string;
            title: string;
            authorName: string;
            authorId: string;
            authorProfile: string;
            post: { likeCount: number };
          }) => ({
            id: featuredPost.id,
            postId: featuredPost.postId,
            title: featuredPost.title,
            authorName: featuredPost.authorName,
            authorId: featuredPost.authorId,
            authorProfile: featuredPost.authorProfile,
            likeCount: 0,
          }),
        );
        return {
          featuredPosts: featuredPostWithLikeCount,
          hasMorePost: hasMore,
        };
      } catch (error) {
        // handleError(error);
        throw error;
      }
    }),

  deleteFeaturedPost: publicProcedure
    .input(
      yup.object({
        id: yup.string().required(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const { id } = input;
        await prisma.featuredPost.delete({
          where: {
            postId: id,
          },
        });
        return { message: "Featured post deleted successfully." };
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),
});
