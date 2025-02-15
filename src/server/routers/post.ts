import type { PostType } from "@prisma/client";
import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";
import { inngest } from "~/inngest/client";
import prisma from "~/server/db";
import { protectedProcedure, router } from "../trpc";

const postSchema = yup.object({
  content: yup.string().required("Content is required."),
  postDetails: yup
    .object({
      title: yup.string().required("Title is required."),
      targetAudience: yup.array(yup.string()).required("Target audience is required."),
      postType: yup.string().required("Post type is required."),
      actors: yup.array(yup.string()).optional(),
      tags: yup.array(yup.string()).optional(),
      thumbnailDetails: yup
        .object({
          url: yup.string().optional(),
          content: yup.string().optional().nullable(),
          title: yup.string().optional().nullable(),
        })
        .required(),
    })
    .required("Post details are required."),
  authorId: yup.string().required("Author ID is required."),
  authorName: yup.string().required("Author name is required."),
  authorProfileImageUrl: yup.string().optional(),
});

const updatePostContentSchema = yup.object({
  content: yup.string().required("Content is required."),
  id: yup.string().required("ID is required."),
});

const updatePostDetailsSchema = yup.object({
  id: yup.string().required("ID is required."),
  postDetails: yup.object({
    title: yup.string().required("Title is required."),
    targetAudience: yup.array(yup.string()).required("Target audience is required."),
    postType: yup.string().required("Post type is required."),
    actors: yup.array(yup.string()).optional(),
    tags: yup.array(yup.string()).optional(),
    thumbnailDetails: yup
      .object({
        url: yup.string().optional(),
        content: yup.string().optional().nullable(),
        title: yup.string().optional().nullable(),
      })
      .required(),
  }),
});
const sharePostSchema = yup.object({
  postId: yup.string().required(),
  userEmail: yup.string().email().required(),
  emails: yup.array(yup.string().email().required()).required(),
});
const cleanArray = (array?: (string | undefined)[]): string[] =>
  array?.filter((item): item is string => item !== undefined) ?? [];

// Todo: Add a better way to get Post with isBookmarked and isLiked flags by user
export const postRouter = router({
  getPosts: protectedProcedure
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
            hasSome: interests.filter((interest): interest is string => interest !== undefined),
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
            likes: true,
          },
        });

        const totalPosts = await prisma.post.count({
          where: query,
        });

        let hasMorePosts;

        if (skip < totalPosts && totalPosts > limit) {
          hasMorePosts = true;
        } else {
          hasMorePosts = false;
        }

        return { posts, hasMorePosts };
      } catch (error) {
        throw error;
      }
    }),

  addPost: protectedProcedure.input(postSchema).mutation(async ({ input }) => {
    try {
      const sanitizedInput = {
        ...input,
        postDetails: {
          ...input.postDetails,
          targetAudience: cleanArray(input.postDetails.targetAudience),
          actors: cleanArray(input.postDetails.actors),
          tags: cleanArray(input.postDetails.tags),
        },
      };

      const post = await prisma.post.create({
        data: {
          content: sanitizedInput.content,
          authorId: sanitizedInput.authorId,
          authorName: sanitizedInput.authorName,
          authorProfileImageUrl: sanitizedInput.authorProfileImageUrl ?? "",
          postDetails: {
            title: sanitizedInput.postDetails.title,
            targetAudience: sanitizedInput.postDetails.targetAudience,
            postType: sanitizedInput.postDetails.postType.toUpperCase() as PostType,
            actors: sanitizedInput.postDetails.actors,
            tags: sanitizedInput.postDetails.tags,
            thumbnailDetails: {
              url: sanitizedInput.postDetails.thumbnailDetails.url ?? "",
              content: sanitizedInput.postDetails.thumbnailDetails.content ?? null,
              title: sanitizedInput.postDetails.thumbnailDetails.title ?? null,
            },
          },
          likes: { create: [] },
          bids: { create: [] },
          comments: { create: [] },
        },
      });

      return post;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to create the post.");
    }
  }),
  deletePost: protectedProcedure.input(yup.string()).mutation(async ({ input: postId }) => {
    try {
      const post = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return post;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to delete the post.");
    }
  }),
  getPost: protectedProcedure.input(yup.string()).query(async ({ input: postId }) => {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      return post;
    } catch (error) {
      handleError(error);
      throw new Error("Failed to fetch the post.");
    }
  }),
  updatePostContent: protectedProcedure
    .input(updatePostContentSchema)
    .mutation(async ({ input }) => {
      try {
        const post = await prisma.post.update({
          where: {
            id: input.id,
          },
          data: {
            content: input.content,
          },
        });
        return post;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to update the post.");
      }
    }),
  updatePostDetails: protectedProcedure
    .input(updatePostDetailsSchema)
    .mutation(async ({ input }) => {
      try {
        const sanitizedInput = {
          ...input,
          postDetails: {
            ...input.postDetails,
            targetAudience: cleanArray(input.postDetails.targetAudience),
            actors: cleanArray(input.postDetails.actors),
            tags: cleanArray(input.postDetails.tags),
          },
        };

        const post = await prisma.post.update({
          where: {
            id: sanitizedInput.id,
          },
          data: {
            postDetails: {
              title: sanitizedInput.postDetails.title,
              targetAudience: sanitizedInput.postDetails.targetAudience,
              postType: sanitizedInput.postDetails.postType as PostType,
              actors: sanitizedInput.postDetails.actors,
              tags: sanitizedInput.postDetails.tags,
              thumbnailDetails: {
                url: sanitizedInput.postDetails.thumbnailDetails.url ?? "",
                content: sanitizedInput.postDetails.thumbnailDetails.content,
                title: sanitizedInput.postDetails.thumbnailDetails.title,
              },
            },
          },
        });
        return post;
      } catch (error) {
        handleError(error);
        throw new Error("Failed to update the post.");
      }
    }),
  sharePost: protectedProcedure.input(sharePostSchema).mutation(async ({ input }) => {
    try {
      const { postId, userEmail, emails } = input;

      await inngest.send({
        name: "post/post.share",
        data: {
          postId,
          userEmail,
          emails,
        },
      });
    } catch (error) {
      // handleError(error);
      console.log(error);
      throw error;
    }
  }),
});
