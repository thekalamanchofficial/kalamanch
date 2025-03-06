import type { Prisma } from "@prisma/client";
import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";
import { inngest } from "~/inngest/client";
import prisma from "~/server/db";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const postSchema = yup.object({
  content: yup.string().required("Content is required."),
  title: yup.string().required("Title is required."),
  postTypeId: yup.string().optional(),
  actors: yup.array(yup.string()).optional(),
  thumbnailDetails: yup
    .object({
      url: yup.string().optional(),
      content: yup.string().optional().nullable(),
      title: yup.string().optional().nullable(),
    })
    .required(),
  authorId: yup.string().required("Author ID is required."),
  authorName: yup.string().required("Author name is required."),
  authorProfileImageUrl: yup.string().optional(),
  genres: yup.array(yup.string()).optional(),
  tags: yup.array(yup.string()).optional(),
});

const updatePostContentSchema = yup.object({
  content: yup.string().required("Content is required."),
  id: yup.string().required("ID is required."),
});

const updatePostDetailsSchema = yup.object({
  id: yup.string().required("ID is required."),
  title: yup.string().required("Title is required."),
  postType: yup.string().optional(),
  actors: yup.array(yup.string()).optional(),
  tags: yup.array(yup.string()).optional(),
  genres: yup.array(yup.string()).optional(),
  thumbnailDetails: yup
    .object({
      url: yup.string().optional(),
      content: yup.string().optional().nullable(),
      title: yup.string().optional().nullable(),
    })
    .required(),
});

const sharePostSchema = yup.object({
  postId: yup.string().required(),
  userEmail: yup.string().email().required(),
  emails: yup.array(yup.string().email().required()).required(),
});
const getTagsSchema = yup.object({
  genres: yup.array(yup.string()).optional(),
});
const createPostTypeSchema = yup.object({
  name: yup.string().required(),
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
        authorId: yup.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        // Todo: Add logic to handle interests
        const { limit, skip, authorId } = input;

        const query: { authorId?: string } = {};

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
            tags: true,
            genres: true,
            postType: true,
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
        actors: cleanArray(input.actors),
        genres: cleanArray(input.genres),
        tags: cleanArray(input.tags),
      };

      const post = await prisma.post.create({
        data: {
          content: sanitizedInput.content,
          authorId: sanitizedInput.authorId,
          authorName: sanitizedInput.authorName,
          authorProfileImageUrl: sanitizedInput.authorProfileImageUrl ?? "",
          title: sanitizedInput.title,
          actors: sanitizedInput.actors,
          thumbnailDetails: {
            url: sanitizedInput.thumbnailDetails.url ?? "",
            content: sanitizedInput.thumbnailDetails.content ?? null,
            title: sanitizedInput.thumbnailDetails.title ?? null,
          },
          likes: { create: [] },
          bids: { create: [] },
          comments: { create: [] },
          genres: {
            connect: sanitizedInput.genres?.map((genre) => ({ id: genre })) ?? [],
          },
          tags: {
            connect: sanitizedInput.tags?.map((tag) => ({ id: tag })) ?? [],
          },
          postTypeId: sanitizedInput.postTypeId ? sanitizedInput.postTypeId : null,
        },
      });

      return post;
    } catch (error) {
      // handleError(error);
      console.log(error);
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
        include: {
          tags: true,
          genres: true,
          comments: {
            include: {
              replies: true,
            },
          },
          likes: true,
          postType: true,
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
          actors: cleanArray(input.actors),
        };

        const post = await prisma.post.update({
          where: {
            id: sanitizedInput.id,
          },
          data: {
            title: sanitizedInput.title,
            actors: sanitizedInput.actors,
            thumbnailDetails: {
              url: sanitizedInput.thumbnailDetails.url ?? "",
              content: sanitizedInput.thumbnailDetails.content,
              title: sanitizedInput.thumbnailDetails.title,
            },
            postTypeId: sanitizedInput.postType,
            genres: {
              connect: sanitizedInput.genres?.map((genre) => ({ id: genre })) ?? [],
            },
            tags: {
              connect: sanitizedInput.tags?.map((tag) => ({ id: tag })) ?? [],
            },
          },
          include: {
            genres: true,
            tags: true,
            postType: true,
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

  getGenres: protectedProcedure.query(async () => {
    try {
      const genres = await prisma.genre.findMany();
      return genres;
    } catch (error) {
      console.error("Error fetching genres:", error);
      throw error;
    }
  }),

  getTags: protectedProcedure.input(getTagsSchema).query(async ({ input }) => {
    try {
      const { genres } = input;

      const whereCondition =
        genres && genres.length > 0
          ? {
              genres: {
                some: {
                  id: {
                    in: genres.filter((genre): genre is string => Boolean(genre)),
                  },
                },
              },
            }
          : undefined;

      return await prisma.tag.findMany({
        where: whereCondition,
        include: { genres: true },
      });
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  }),

  getPostTypes: protectedProcedure.query(async () => {
    try {
      const postTypes = await prisma.postType.findMany();
      return postTypes;
    } catch (error) {
      console.error("Error fetching post types:", error);
      throw error;
    }
  }),

  addPostType: protectedProcedure.input(createPostTypeSchema).mutation(async ({ input }) => {
    try {
      const postType = await prisma.postType.create({
        data: {
          name: input.name,
        },
      });
      return postType;
    } catch (error) {
      console.error("Error adding post type:", error);
      throw error;
    }
  }),

  searchPosts: publicProcedure
    .input(
      yup.object({
        searchQuery: yup.string().required(),
        limit: yup.number().default(10),
        skip: yup.number().default(0),
        sortBy: yup.string().oneOf(["recent", "popular", "relevant"]).default("recent"),
        filterType: yup.string().oneOf(["all", "posts", "people"]).default("all"),
      }),
    )
    .query(async ({ input }) => {
      // If filter type is people, return empty array
      if (input.filterType === "people") {
        return {
          posts: [],
          totalCount: 0,
          hasMore: false,
        };
      }

      // Build search query
      const where = {
        OR: [
          {
            title: {
              contains: input.searchQuery,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
          {
            content: {
              contains: input.searchQuery,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
          {
            authorName: {
              contains: input.searchQuery,
              mode: "insensitive" as Prisma.QueryMode,
            },
          },
          {
            tags: {
              some: {
                name: {
                  contains: input.searchQuery,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
            },
          },
        ],
      };

      // Get total count for pagination
      const totalCount = await prisma.post.count({ where });

      // Determine sort order based on sortBy parameter
      let orderBy: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[] = {
        createdAt: "desc",
      };

      switch (input.sortBy) {
        case "recent":
          orderBy = { createdAt: "desc" };
          break;
        case "popular":
          orderBy = [
            { likes: { _count: "desc" } },
            { comments: { _count: "desc" } },
            { createdAt: "desc" },
          ];
          break;
        case "relevant":
          // For relevance, we prioritize exact matches in title, then content
          orderBy = [{ title: "asc" }, { content: "asc" }, { createdAt: "desc" }];
          break;
        default:
          orderBy = { createdAt: "desc" };
      }

      // Fetch posts with sorting applied
      const posts = await prisma.post.findMany({
        where,
        take: input.limit,
        skip: input.skip,
        orderBy,
        select: {
          id: true,
          title: true,
          authorName: true,
          thumbnailDetails: true,
          content: true,
          tags: true,
          genres: true,
          postType: true,
          createdAt: true,
          updatedAt: true,
          authorId: true,
          authorProfileImageUrl: true,
          likes: true,
          comments: true,
          bids: true,
        },
      });

      const hasMore = totalCount > input.skip + posts.length;

      return {
        posts,
        totalCount,
        hasMore,
      };
    }),
});
