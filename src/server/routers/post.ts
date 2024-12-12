import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";

import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";

const postSchema = yup.object({
  content: yup.string().required(),
  title: yup.string().required(),
  authorId: yup.string().required(),
  authorName: yup.string().required(),
  authorProfile: yup.string().optional(),
  media: yup
    .object({
      thumbnailPicture: yup.array(yup.string()).optional(),
      thumbnailContent: yup.string().optional(),
      thumbnailTitle: yup.string().optional(),
    })
    .required(),
  tags: yup.array(yup.string()).optional(),
  likeCount: yup.number().optional().default(0),
  likes: yup
    .array(
      yup.object({
        userId: yup.string().required("User ID is required for like"),
        createdAt: yup.date().optional(),
      }),
    )
    .optional(),
  comments: yup
    .array(
      yup.object({
        userId: yup.string().required("User ID is required for comment"),
        name: yup.string().required("Name is required for comment"),
        content: yup.string().required("Comment content is required"),
        createdAt: yup.date().optional(),
      }),
    )
    .optional(),
  bids: yup
    .array(
      yup.object({
        userId: yup.string().required("User ID is required for bid"),
        amount: yup
          .number()
          .required("Bid amount is required")
          .positive("Bid amount must be positive"),
        createdAt: yup.date().optional(),
      }),
    )
    .optional(),
  hasMorePosts: yup.boolean().optional(),
});

export const postRouter = router({
  getPosts: publicProcedure
    .input(
      yup.object({
        limit: yup.number().min(1).default(5),
        skip: yup.number().min(0).default(0),
        interests: yup.array(yup.string()).optional(),
        authorId: yup.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { limit, skip, interests, authorId } = input;

        const query: { tags?: { hasSome: string[] }; authorId?: string } = {};

        if (interests && interests.length > 0) {
          query.tags = {
            hasSome: interests.filter(
              (interest): interest is string => interest !== undefined,
            ),
          };
        }

        if (authorId) {
          query.authorId = authorId;
        }

        const posts = await prisma.post.findMany({
          where: query,
          take: limit,
          skip: skip,
          orderBy: {
            createdAt: "desc",
          },
          include: {
            comments: {
              include: {
                replies: true,
              },
            },
          },
        });
        const totalPosts = await prisma.post.count({});

        let hasMorePosts;

        if (skip < totalPosts) {
          hasMorePosts = true;
        } else {
          hasMorePosts = false;
        }

        return { posts, hasMorePosts };
      } catch (error) {
        throw error;
      }
    }),

  addPost: publicProcedure.input(postSchema).mutation(async ({ input }) => {
    try {
      const posts = await prisma.post.create({
        data: {
          content: input.content,
          authorId: input.authorId,
          authorName: input.authorName,
          title: input.title ?? "",
          authorProfile: input.authorProfile ?? "",
          tags:
            input.tags?.filter((tag): tag is string => tag !== undefined) ?? [],
          media: {
            thumbnailPicture: input.media?.thumbnailPicture?.filter(
              (pic): pic is string => pic !== undefined,
            ),
            thumbnailContent: input.media?.thumbnailContent ?? "",
            thumbnailTitle: input.media?.thumbnailTitle ?? "",
          },
          likes: {
            create: [],
          },
          bids: {
            create: [],
          },
          comments: {
            create: [],
          },
        },
      });
      return posts;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }),
});
