import prisma from "~/server/db";
import { inngest } from "./client";
import { sendEmail } from "~/app/_utils/sendEmail";
import type { EventPayload, FailureEventArgs } from "inngest";
import type { SharePostPayload } from "./types";

const onFailure = async ({ event, error: _error }: FailureEventArgs<EventPayload<SharePostPayload["data"]>>) => {
  const originalEventData = event?.data?.event?.data;
  if (!originalEventData) {
    throw new Error(
      "Failed to send failure notification email: original event data not found",
    );
  }
  const { postId, userEmail, emails } = originalEventData;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kalamanch.org";

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { postDetails: true },
  });

  const sender = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { name: true, email: true },
  });

  const senderName = sender?.name ?? "";
  const postTitle = post?.postDetails?.title ?? "Post";

  try {
    await sendEmail({
      to: userEmail,
      subject: `Failed to Share Post: ${postTitle}`,
      template: "share-post-failure",
      context: {
        senderName,
        failedEmails: emails,
        postTitle,
        postUrl: `${baseUrl}/posts/${postId}`,
      },
    });
  } catch (notificationError) {
    console.error(
      `Error sending failure notification email to ${userEmail}:`,
      notificationError,
    );
  }
};

export const sharePostViaEmail = inngest.createFunction(
  { id: "share-post-via-email", retries: 1, onFailure },
  { event: "post/post.share" },
  async ({ event }) => {
    const { postId, userEmail, emails } = event.data;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kalamanch.org";

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new Error(`Post with ID ${postId} not found.`);
    }

    const sender = await prisma.user.findUnique({
      where: { email: userEmail },
      select: { name: true, email: true },
    });

    if (!sender) {
      throw new Error(`User with ID ${userEmail} not found.`);
    }

    const mailOptions = {
      to: emails,
      subject: `${sender.name} shared a post with you`,
      template: "share-post",
      context: {
        senderName: sender.name,
        authorName: post.authorName,
        postTitle: post.postDetails.title,
        postUrl: `${baseUrl}/posts/${postId}`,
        tags: post.postDetails.tags,
      },
    };

    try {
      await sendEmail(mailOptions);
    } catch (error) {
      console.error("Error sending emails:", error);
      throw error;
    }
  },
);
