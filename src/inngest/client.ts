import { EventSchemas, Inngest } from "inngest";
import { UserJSON } from "@clerk/nextjs/server";

type ClerkUserEventPayload = {
  data: UserJSON;
};


type SharePostPayload = {
  data: {
    postId: string;
    userEmail: string;
    emails: string[];
  };
};

type Events = {
  "clerk/user.created": ClerkUserEventPayload;
  "clerk/user.updated": ClerkUserEventPayload;
  "post/post.share": SharePostPayload;
};

// Create a client to send and receive events
export const inngest = new Inngest({
  id: "kalamanch",
  schemas: new EventSchemas().fromRecord<Events>(),
});
