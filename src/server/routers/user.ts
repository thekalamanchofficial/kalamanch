import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";

import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";

const userSchema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  birthdate: yup.date().nullable().default(null),
  profile: yup.string().optional(),
  education: yup.array(yup.string()).optional().default([]),
  professionalAchievements: yup.string().optional().default(""),
  bio: yup.string().optional().default(""),
  interests: yup.array(yup.string()).default([]),
  followers: yup.array(yup.string()).default([]),
  following: yup.array(yup.string()).default([]),
  bookmarks: yup.array(yup.string()).default([]),
});
const cleanArray = (array?: (string | undefined)[]): string[] =>
  array?.filter((item): item is string => item !== undefined) ?? [];

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      handleError(error);
    }
  }),
  getUserDetails: publicProcedure
    .input(yup.string().email())
    .query(async ({ input }) => {
      const userDetails = await prisma.user.findUnique({
        where: { email: input },
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
        interests: input.interests?.filter(
          (interest): interest is string => interest !== undefined,
        ),
      },
    });
    return user;
  }),
  updateUser: publicProcedure
    .input(
      yup.object({
        name: yup.string(),
        email: yup.string().email().required(),
        bio: yup.string().optional(),
        interests: yup.array(yup.string()).required().min(1),
        birthdate: yup.date(),
        education: yup.array(yup.string()).optional(),
        achievements: yup.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.update({
        where: { email: input.email },
        data: {
          name: input.name,
          bio: input.bio,
          birthdate: input.birthdate,
          education: input.education?.filter(
            (edu): edu is string => edu !== undefined,
          ),
          interests: input.interests?.filter(
            (interest): interest is string => interest !== undefined,
          ),
          professionalCredentials: input.achievements,
        },
      });
      return user;
    }),
  getUserFollowings: publicProcedure
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
  followUser: publicProcedure
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
                set: followerUser.followers.filter(
                  (id) => id !== currentUserId,
                ),
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
  searchUsersSortedByFollowing: publicProcedure
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
});
