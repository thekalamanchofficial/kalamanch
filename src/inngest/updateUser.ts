import prisma from "~/server/db";
import { inngest } from "./client";

export const updateUser = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const email = event.data.email_addresses[0]?.email_address;

    if (!email) {
      throw new Error("Email not found when updating user");
    }

    await prisma.user.update({
      where: { email },
      data: {
        interests: (event.data.public_metadata.interests as string[]) ?? [],
      },
    });
  },
);
