import { publicProcedure, router } from "../trpc";
import prisma from "~/server/db";

import * as yup from "yup";
import { handleError } from "~/app/_utils/handleError";

const userSchema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  birthdate: yup.date().required(),
  profile: yup.string().optional(),
  interests: yup.array(yup.string()),
  followers: yup.array(yup.string()).default([]),
  following: yup.array(yup.string()).default([]),
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
});
