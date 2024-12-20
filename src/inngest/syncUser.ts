/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "~/server/db";
import { inngest } from "./client";

export const syncUser = inngest.createFunction(
  { id: "sync-user-from-clerk" }, // ←The 'id' is an arbitrary string used to identify the function in the dashboard
  { event: "clerk/user.created" }, // ← This is the function's triggering event
  async ({ event }) => {
    const email = event.data.email_addresses[0]?.email_address;
    const name = event.data.first_name ?? event.data.unsafe_metadata.name;
    await prisma.user.create({
      data: {
        email,
        name,
        birthdate: (event.data.unsafe_metadata.birthdate as Date) ?? null,
        interests: [],
        following: [],
        followers: [],
        bookmarks: [],
      },
    });
  },
);
