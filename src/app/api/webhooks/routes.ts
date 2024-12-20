import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import prisma from "~/server/db";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  // eslint-disable-next-line @typescript-eslint/await-thenable
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  //   if (evt.type === "user.created") {
  //     const email = evt.data.email_addresses[0]?.email_address;
  //     const name = evt.data.first_name;
  //     if (email && name) {
  //       await prisma.user.create({
  //         data: {
  //           email,
  //           name,
  //           birthdate: (evt.data.unsafe_metadata.birthdate as Date) ?? null,
  //           interests: [],
  //           following: [],
  //           followers: [],
  //           bookmarks: [],
  //         },
  //       });
  //     }
  //   }

  //   if (evt.type === "user.updated") {
  //     const email = evt.data.email_addresses[0]?.email_address;
  //     if (email) {
  //       await prisma.user.update({
  //         where: { email: email },
  //         data: {
  //           interests: (evt.data.public_metadata.interests as string[]) ?? [],
  //         },
  //       });
  //     }
  //   }

  return new Response("Webhook received", { status: 200 });
}