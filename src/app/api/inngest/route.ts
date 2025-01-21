import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { syncUser } from "~/inngest/syncUser";
import { updateUser } from "~/inngest/updateUser";
import { sharePostViaEmail } from "~/inngest/sharePost";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUser, updateUser, sharePostViaEmail],
});
