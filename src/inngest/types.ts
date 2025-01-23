import type { UserJSON } from "@clerk/nextjs/server";

export type ClerkUserEventPayload = {
  data: UserJSON;
};


export type SharePostPayload = {
  data: {
    postId: string;
    userEmail: string;
    emails: string[];
  };
};

export type Events = {
  "clerk/user.created": ClerkUserEventPayload;
  "clerk/user.updated": ClerkUserEventPayload;
  "post/post.share": SharePostPayload;
  "inngest/function.failed": SharePostPayload | ClerkUserEventPayload;
};