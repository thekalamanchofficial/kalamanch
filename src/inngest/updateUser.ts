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

    const readingInterests = (event.data.public_metadata.readingInterests as {
      genres: string[];
      tags: string[];
    }) ?? {
      genres: [],
      tags: [],
    };
    const writingInterests = (event.data.public_metadata.writingInterests as {
      genres: string[];
      tags: string[];
    }) ?? {
      genres: [],
      tags: [],
    };

    await prisma.user.update({
      where: { email },
      data: {
        readingInterests,
        writingInterests,
      },
    });
  },
);
