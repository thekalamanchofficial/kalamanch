import { NextResponse } from "next/server";
import { inngest } from "../../../inngest/client"; // Import our client

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

// Create a simple async Next.js API route handler
export async function GET() {
  // Send your event payload to Inngest
  await inngest.send({
    name: "post/shared",
    data: {
      postId: "1",
      userEmail: "testUser@example.com",
      emails: ["testUser@example.com"],
    },
  });

  return NextResponse.json({ message: "Event sent!" });
}
