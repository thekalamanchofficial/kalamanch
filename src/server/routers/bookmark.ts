import { protectedProcedure, router } from "../trpc";
import prisma from "~/server/db";

import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";
import getUserDetails from "../utils/getUserDetails";

const bulkBookmarkSchema = yup.object({
  userEmail: yup.string().email().required(),
  bookmarks: yup
    .array()
    .of(
      yup.object({
        postId: yup.string().required("Post ID is required"),
        bookmarked: yup.boolean().required("Bookmarked field is required"),
      }),
    )
    .required("Bookmarks array is required"),
});
const bookmarkPaginationSchema = yup.object({
  limit: yup.number().min(1).max(100).nullable(),
  cursor: yup.string().nullable(),
  userEmail: yup.string().email().required(),
});

export const bookmarkRouter = router({
  bulkBookmarkPost: protectedProcedure
    .input(bulkBookmarkSchema)
    .mutation(async ({ input }) => {
      try {
        if (!input) {
          return { message: "No input provided for bulk bookmark operations." };
        }

        const { id: userId, bookmarks: existingBookmarks } =
          await getUserDetails(input.userEmail);

        const bookmarksToAdd: string[] = [];
        const bookmarksToRemove: string[] = [];

        for (const { postId, bookmarked } of input.bookmarks) {
          if (bookmarked) {
            bookmarksToAdd.push(postId);
          } else {
            bookmarksToRemove.push(postId);
          }
        }

        const existingBookmarksSet = new Set(existingBookmarks);
        const bookmarksToRemoveSet = new Set(bookmarksToRemove);

        for (const bookmark of bookmarksToRemoveSet) {
          existingBookmarksSet.delete(bookmark);
        }

        for (const bookmark of bookmarksToAdd) {
          existingBookmarksSet.add(bookmark);
        }

        const updatedBookmarks = Array.from(existingBookmarksSet);

        await prisma.user.update({
          where: { id: userId },
          data: { bookmarks: updatedBookmarks },
        });

        return { message: "Bulk bookmark operations completed successfully." };
      } catch (error) {
        handleError(error);
        throw error;
      }
    }),

  getUserBookmarkPosts: protectedProcedure
    .input(bookmarkPaginationSchema)
    .query(async ({ ctx: _, input }) => {
      try {
        const limit = input.limit ?? null;
        const userEmail = input.userEmail;
        const { cursor } = input;

        if (!userEmail) {
          throw new Error("User email is required");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: userEmail,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const bookmarkedPosts = await prisma.post.findMany({
          take: limit ? limit + 1 : undefined,
          where: {
            id: {
              in: user?.bookmarks,
            },
          },
          cursor: cursor ? { id: cursor } : undefined,
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

        let nextCursor: typeof cursor | null = null;
        if (limit && bookmarkedPosts.length > limit) {
          const nextItem = bookmarkedPosts.pop();
          nextCursor = nextItem?.id ?? null;
        }

        return {
          items: bookmarkedPosts,
          nextCursor,
        };
      } catch (error) {
        handleError(error);
        throw new Error("Failed to fetch bookmarked posts.");
      }
    }),
});
