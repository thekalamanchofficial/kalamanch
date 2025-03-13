import type { EventPayload, FailureEventArgs } from "inngest";
import { sendEmail } from "~/app/_utils/sendEmail";
import { inngest } from "./client";
import type { ContactUsPayload } from "./types";

const onFailure = async ({
  event,
  error: _error,
}: FailureEventArgs<EventPayload<ContactUsPayload["data"]>>) => {
  const originalEventData = event?.data?.event?.data;
  if (!originalEventData) {
    throw new Error("Failed to send failure notification email: original event data not found");
  }
  const { userEmail, message, name } = originalEventData;

  try {
    await sendEmail({
      to: userEmail,
      subject: `Failed to contact Kalamnch`,
      template: "contact-us-failure",
      context: {
        message,
        name,
        senderEmail: userEmail,
      },
    });
  } catch (notificationError) {
    console.error(`Error sending failure notification email to ${userEmail}:`, notificationError);
  }
};

export const contactUsViaEmail = inngest.createFunction(
  { id: "contact-us-via-email", retries: 1, onFailure },
  { event: "contact/conatct-us" },
  async ({ event }) => {
    const { message, userEmail, name } = event.data;

    const mailOptions = {
      to: process.env.EMAIL_FROM!,
      subject: `${name} sent a message`,
      template: "contact-us",
      text: message,
      context: {
        message,
        userEmail,
        senderEmail: userEmail,
        name,
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
