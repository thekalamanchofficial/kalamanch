import type { Genre, Tag } from "@prisma/client";
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
            title: true,
            authorName: true,
            authorId: true,
            authorProfileImageUrl: true,
            likeCount: true,
            thumbnailDetails: {
              select: {
                url: true,
                content: true,
                title: true,
              },
            },
            genres: true,
            tags: true,
          },
          take: limit,
          skip: skip,
        });

        const featuredPostWithLikeCount = featuredPosts.map(
          (featuredPost: {
            id: string;
            title: string;
            authorName: string;
            authorId: string;
            authorProfileImageUrl?: string | null;
            likeCount: number;
            genres: Genre[];
            tags: Tag[];
            thumbnailDetails: {
              url: string;
              content?: string | null;
              title?: string | null;
            };
          }) => ({
            id: featuredPost.id,
            title: featuredPost.title,
            authorName: featuredPost.authorName,
            authorId: featuredPost.authorId,
            authorProfileImageUrl: featuredPost.authorProfileImageUrl ?? "",
            likeCount: featuredPost.likeCount,
            genres: featuredPost.genres,
            tags: featuredPost.tags,
            thumbnailDetails: {
              url: featuredPost.thumbnailDetails.url,
              content: featuredPost.thumbnailDetails.content,
              title: featuredPost.thumbnailDetails.title,
            },
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
