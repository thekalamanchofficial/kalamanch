import prisma from "~/server/db";
import { inngest } from "./client";
import { sendEmail } from "~/app/_utils/sendEmail";
export const sharePostViaEmail = inngest.createFunction(
  { id: "share-post-via-email" },
  { event: "post/post.share" },
  async ({ event }) => {
    const { postId, userEmail, emails } = event.data;
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
        postContent: post.content,
        postTitle: post.postDetails.title,
        postUrl: `https://kalamanch.org/post/${postId}`,
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
