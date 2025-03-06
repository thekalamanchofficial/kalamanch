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
        bio: (event.data.public_metadata.bio as string) ?? null,
        education: (event.data.public_metadata.education as string[]) ?? null,
        birthdate: (event.data.public_metadata.birthdate as string) ?? null,
        readingInterests,
        writingInterests,
        profileImageUrl: event.data.image_url ?? null,
        updatedAt: new Date(),
      },
    });
  },
);
