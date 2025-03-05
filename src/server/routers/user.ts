import { clerkClient, currentUser } from "@clerk/nextjs/server";
import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";
import prisma from "~/server/db";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const userSchema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  birthdate: yup.date().nullable().default(null),
  profile: yup.string().optional(),
  education: yup.array(yup.string()).optional().default([]),
  bio: yup.string().optional().default(""),
  readingInterests: yup.object({
    genres: yup.array(yup.string()).default([]),
    tags: yup.array(yup.string()).default([]),
  }),
  writingInterests: yup.object({
    genres: yup.array(yup.string()).default([]),
    tags: yup.array(yup.string()).default([]),
  }),
  followers: yup.array(yup.string()).default([]),
  following: yup.array(yup.string()).default([]),
});
const updateUserSchema = yup.object({
  name: yup.string(),
  email: yup.string().email().required(),
  bio: yup.string().optional(),
  readingInterests: yup.object({
    genres: yup.array(yup.string()).required().min(1),
    tags: yup.array(yup.string()).required().min(1),
  }),
  writingInterests: yup.object({
    genres: yup.array(yup.string()).required().min(1),
    tags: yup.array(yup.string()).required().min(1),
  }),
  birthdate: yup.date(),
  education: yup.array(yup.string()).optional(),
});
const cleanArray = (array?: (string | undefined)[]): string[] =>
  array?.filter((item): item is string => item !== undefined) ?? [];

export const userRouter = router({
  getUsers: protectedProcedure.query(async () => {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      handleError(error);
    }
  }),

  getUserDetails: publicProcedure.input(yup.string().email()).query(async ({ input }) => {
    if (!input) {
      throw new Error("Email is required");
    }
    const userDetails = await prisma.user.findUnique({
      where: { email: input },
      include: {
        posts: true,
      },
    });

    return userDetails;
  }),

  getUserDetailsById: publicProcedure.input(yup.string().required()).query(async ({ input }) => {
    if (!input) {
      throw new Error("User ID is required");
    }
    const userDetails = await prisma.user.findUnique({
      where: { id: input },
      include: {
        posts: true,
      },
    });
    return userDetails;
  }),

  addUser: publicProcedure.input(userSchema).mutation(async ({ input }) => {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        birthdate: input.birthdate,
        profileImageUrl: input.profile ?? "",
        readingInterests: {
          genres: input.readingInterests.genres.filter(
            (genre): genre is string => genre !== undefined,
          ),
          tags: input.readingInterests.tags.filter((tag): tag is string => tag !== undefined),
        },
        writingInterests: {
          genres: input.writingInterests.genres.filter(
            (genre): genre is string => genre !== undefined,
          ),
          tags: input.writingInterests.tags.filter((tag): tag is string => tag !== undefined),
        },
      },
    });
    return user;
  }),

  updateUser: protectedProcedure.input(updateUserSchema).mutation(async ({ input }) => {
    const clerkUser = await currentUser();

    if (clerkUser) {
      await clerkClient.users.updateUserMetadata(clerkUser.id, {
        publicMetadata: {
          readingInterests: input.readingInterests,
          writingInterests: input.writingInterests,
          bio: input.bio,
          education: input.education,
          birthdate: input.birthdate,
        },
      });
    }

    return {
      message: "User updated successfully",
      user: clerkUser,
    };
  }),

  getUserFollowings: protectedProcedure
    .input(
      yup.object({
        userEmail: yup.string().email().required(),
      }),
    )
    .query(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { email: input.userEmail },
      });
      return user?.following;
    }),

  followUser: protectedProcedure
    .input(
      yup.object({
        currentUserEmail: yup.string().email().required(),
        followerId: yup.string().required(),
      }),
    )
    .mutation(async ({ input }) => {
      const currentUserDetails = await prisma.user.findUnique({
        where: { email: input.currentUserEmail },
      });

      const currentUserId = currentUserDetails?.id;
      const { followerId } = input;

      if (currentUserId === followerId) {
        return {
          message: "Invalid Operation. You cannot follow yourself",
        };
      }

      try {
        const currentUser = await prisma.user.findUnique({
          where: { id: currentUserId },
        });

        const followerUser = await prisma.user.findUnique({
          where: { id: followerId },
        });

        if (!currentUser) {
          throw new Error("User not found");
        }

        if (!followerUser) {
          throw new Error("User not found");
        }

        const isFollowing = currentUser.following.includes(followerId);

        if (isFollowing) {
          await prisma.user.update({
            where: { id: currentUserId },
            data: {
              following: {
                set: currentUser.following.filter((id) => id !== followerId),
              },
            },
          });

          await prisma.user.update({
            where: { id: followerId },
            data: {
              followers: {
                set: followerUser.followers.filter((id) => id !== currentUserId),
              },
            },
          });

          return { message: "Unfollowed" };
        } else {
          await prisma.user.update({
            where: { id: currentUserId },
            data: {
              following: {
                push: followerId,
              },
            },
          });

          await prisma.user.update({
            where: { id: followerId },
            data: {
              followers: {
                push: currentUserId,
              },
            },
          });

          return { message: "Followed" };
        }
      } catch (error) {
        handleError(error);
        console.log(error);
      }
    }),

  searchUsersSortedByFollowing: protectedProcedure
    .input(
      yup.object({
        searchTerm: yup.string().default(""),
        skip: yup.number().default(0),
        limit: yup.number().default(10),
        userFollowing: yup.array(yup.string()).default([]),
      }),
    )
    .query(async ({ input }) => {
      const { searchTerm, skip, limit, userFollowing } = input;

      const searchResults = await prisma.user.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  name: {
                    contains: searchTerm,
                    mode: "insensitive", // Case-insensitive search
                  },
                },
                {
                  email: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
              ],
            },
            { id: { in: cleanArray(userFollowing) } },
          ],
        },
        skip,
        take: limit,
        orderBy: [
          {
            name: "asc",
          },
        ],
      });

      if (searchResults?.length >= limit) {
        return searchResults;
      }
      const newSkip = skip + searchResults?.length;
      const newLimit = limit - searchResults?.length;

      const remainingResults = await prisma.user.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  name: {
                    contains: searchTerm,
                    mode: "insensitive", // Case-insensitive search
                  },
                },
                {
                  email: {
                    contains: searchTerm,
                    mode: "insensitive",
                  },
                },
              ],
            },
            { id: { notIn: cleanArray(userFollowing) } },
          ],
        },
        skip: newSkip,
        take: newLimit,
        orderBy: [
          {
            name: "asc",
          },
        ],
      });
      searchResults.push(...remainingResults);
      return searchResults;
    }),

  updateProfileImageUrl: protectedProcedure
    .input(
      yup.object({
        profileImageUrl: yup.string().required(),
        userId: yup.string().required(),
      }),
    )
    .mutation(async ({ input }) => {
      const fileExtension = input.profileImageUrl.split(".").pop()?.toLowerCase() ?? "jpeg";
      const response = await fetch(input.profileImageUrl);
      const blob = await response.blob();
      const file = new File([blob], `profile.${fileExtension}`, {
        type: `image/${fileExtension}`,
      });

      const clerkUser = await currentUser();
      if (clerkUser) {
        await clerkClient.users.updateUserProfileImage(clerkUser.id, {
          file,
        });
      }
      return { message: "Profile image updated successfully" };
    }),

  updateCoverImageUrl: protectedProcedure
    .input(
      yup.object({
        coverImageUrl: yup.string().optional().nullable(),
        userId: yup.string().required(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: { id: input.userId },
        data: {
          coverImageUrl: input.coverImageUrl,
        },
      });
      return user;
    }),

  searchProfiles: publicProcedure
    .input(
      yup.object({
        searchQuery: yup.string().required(),
        limit: yup.number().default(5),
      }),
    )
    .query(async ({ input }) => {
      const profiles = await prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: input.searchQuery,
                mode: "insensitive",
              },
            },
            {
              bio: {
                contains: input.searchQuery,
                mode: "insensitive",
              },
            },
          ],
        },
        take: input.limit,
        orderBy: {
          name: "asc",
        },
        select: {
          id: true,
          name: true,
          bio: true,
          profileImageUrl: true,
        },
      });

      return profiles;
    }),
});
