import { serve } from "inngest/next";
import { contactUsViaEmail } from "~/inngest/contactUs";
import { sharePostViaEmail } from "~/inngest/sharePost";
import { syncUser } from "~/inngest/syncUser";
import { updateUser } from "~/inngest/updateUser";
import { inngest } from "../../../inngest/client";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUser, updateUser, sharePostViaEmail, contactUsViaEmail],
});
