import * as yup from "yup";
import { inngest } from "~/inngest/client";
import { protectedProcedure, router } from "../trpc";

const contactUsSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});

export const contactUsRouter = router({
  contactUs: protectedProcedure.input(contactUsSchema).mutation(async ({ input }) => {
    try {
      const { email, message, name } = input;

      await inngest.send({
        name: "contact/conatct-us",
        data: {
          userEmail: email,
          message,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }),
});
