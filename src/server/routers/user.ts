import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";

import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";

const userSchema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  birthdate: yup.date().nullable().default(null),
  profile: yup.string().optional(),
  interests: yup.array(yup.string()).default([]),
  followers: yup.array(yup.string()).default([]),
  following: yup.array(yup.string()).default([]),
  bookmarks: yup.array(yup.string()).default([]),
});

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      handleError(error);
    }
  }),
  addUser: publicProcedure.input(userSchema).mutation(async ({ input }) => {
    const user = await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        birthdate: input.birthdate,
        profile: input.profile,
        interests: input.interests?.filter(
          (interest): interest is string => interest !== undefined,
        ),
      },
    });
    return user;
  }),
  updateUser: publicProcedure.input(userSchema).mutation(async ({ input }) => {
    const user = await prisma.user.update({
      where: { email: input.email },
      data: {
        name: input.name,
        birthdate: input.birthdate,
        profile: input.profile,
        interests: input.interests?.filter(
          (interest): interest is string => interest !== undefined,
        ),
        following: input.following?.filter((f): f is string => f !== undefined),
        followers: input.followers?.filter((f): f is string => f !== undefined),
        bookmarks: input.bookmarks?.filter((b): b is string => b !== undefined),
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
});
