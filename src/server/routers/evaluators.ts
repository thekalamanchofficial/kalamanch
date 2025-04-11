import * as yup from "yup";
import { evaluateContent } from "~/app/editor/_components/evaluator/utils/utils";
import { protectedProcedure, router } from "../trpc";

const evaluatorSchema = yup.object({ content: yup.string().min(20).default("") });

export const evaluatorRouter = router({
  evaluate: protectedProcedure.input(evaluatorSchema).query(async ({ input }) => {
    try {
      return await evaluateContent(input.content);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }),
});
