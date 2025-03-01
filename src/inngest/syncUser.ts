import prisma from "~/server/db";
import { inngest } from "./client";

export const syncUser = inngest.createFunction(
  { id: "sync-user-from-clerk" }, // ←The 'id' is an arbitrary string used to identify the function in the dashboard
  { event: "clerk/user.created" }, // ← This is the function's triggering event
  async ({ event }) => {
    const email = event.data.email_addresses[0]?.email_address;
    const name = event.data.first_name ?? event.data.unsafe_metadata.name;
    const profileImageUrl = event.data.unsafe_metadata.profile as string;

    if (!email) {
      throw new Error("Email not found when syncing user");
    }

    if (!name || typeof name !== "string") {
      throw new Error("Name not found");
    }

    await prisma.user.create({
      data: {
        email,
        name,
        birthdate: (event.data.unsafe_metadata.birthdate as Date) ?? null,
        readingInterests: {
          genres: [],
          tags: [],
        },
        writingInterests: {
          genres: [],
          tags: [],
        },
        following: [],
        followers: [],
        bookmarks: [],
        profileImageUrl: profileImageUrl ?? "",
      },
    });
  },
);
