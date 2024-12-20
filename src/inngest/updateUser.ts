/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prisma from "~/server/db";
import { inngest } from "./client";

export const updateUser = inngest.createFunction(
  { id: "update-user-from-clerk" }, // ←The 'id' is an arbitrary string used to identify the function in the dashboard
  { event: "clerk/user.update" }, // ← This is the function's triggering event
  async ({ event }) => {
    const email = event.data.email_addresses[0]?.email_address;
    await prisma.user.update({
      where: { email: email },
      data: {
        interests: (event.data.public_metadata.interests as string[]) ?? [],
      },
    });
  },
);
