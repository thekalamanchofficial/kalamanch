import { NextResponse } from "next/server";
import { inngest } from "../../../inngest/client"; // Import our client

// Opt out of caching; every request should send a new event
export const dynamic = "force-dynamic";

// Create a simple async Next.js API route handler
export async function GET() {
  // Send your event payload to Inngest
  await inngest.send({
    name: "test/syncUser",
    data: {
      email_addresses: [{ email_address: "testUser@example.com" }],
      first_name: "testUser",
      last_name: "testUser",
      unsafe_metadata: {
        birthdate: "2024-12-20T08:53:50.545Z",
      },
    },
  });

  return NextResponse.json({ message: "Event sent!" });
}
