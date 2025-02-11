import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";
import prisma from "~/server/db";
import { protectedProcedure, router } from "../trpc";

export const featuredPostRouter = router({
  getFeaturedPosts: protectedProcedure
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

        const count = await prisma.post.count({
          where: {
            isFeatured: true,
          },
        });

        if (count > limit + skip) {
          hasMore = true;
        }

        const featuredPosts = await prisma.post.findMany({
          where: {
            isFeatured: true,
          },
          select: {
            id: true,
            postDetails: {
              select: {
                title: true,
              },
            },
            authorName: true,
            authorId: true,
            authorProfileImageUrl: true,
            likeCount: true,
          },
          take: limit,
          skip: skip,
        });

        const featuredPostWithLikeCount = featuredPosts.map(
          (featuredPost: {
            id: string;
            postDetails: {
              title: string;
            };
            authorName: string;
            authorId: string;
            authorProfileImageUrl?: string | null;
            likeCount: number;
          }) => ({
            id: featuredPost.id,
            title: featuredPost.postDetails?.title,
            authorName: featuredPost.authorName,
            authorId: featuredPost.authorId,
            authorProfileImageUrl: featuredPost.authorProfileImageUrl ?? "",
            likeCount: featuredPost.likeCount,
          }),
        );
        return {
          featuredPosts: featuredPostWithLikeCount,
          hasMore,
        };
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),
});
