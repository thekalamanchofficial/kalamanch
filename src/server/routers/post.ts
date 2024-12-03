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
      thumbnail_picture: yup.array(yup.string()).optional(),
      thumbnail_content: yup.string().optional(),
      thumbnail_title: yup.string().optional(),
    })
    .required(),
  tags: yup.array(yup.string()).optional(),
  likes: yup.number().optional().default(0),
  comments: yup.number().optional().default(0),
  shares: yup.number().optional().default(0),
  bids: yup.number().optional().default(0),
});

// Router definition
export const postRouter = router({
  getPosts: publicProcedure.query(async () => {
    try {
      return await prisma.post.findMany();
    } catch (error) {
      // handleError(error);
      throw error;
    }
  }),
  addPosts: publicProcedure.input(postSchema).mutation(async ({ input }) => {
    try {
      const posts = await prisma.post.create({
        data: {
          content: input.content,
          authorId: input.authorId,
          authorName: input.authorName,
          title: input.title ?? "",
          authorProfile: input.authorProfile ?? "", // Default empty string if no profile is provided
          tags:
            input.tags?.filter((tag): tag is string => tag !== undefined) ?? [],
          media: {
            thumbnail_picture: input.media?.thumbnail_picture?.filter(
              (pic): pic is string => pic !== undefined,
            ),
            thumbnail_content: input.media?.thumbnail_content ?? "",
            thumbnail_title: input.media?.thumbnail_title ?? "",
          },
          likes: input.likes ?? 0,
          bids: input.bids ?? 0,
          comments: input.comments ?? 0,
          shares: input.shares ?? 0,
        },
      });
      return posts;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }),
});
