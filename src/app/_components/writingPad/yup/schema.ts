import * as yup from "yup";

const schema = yup.object({
  content: yup.string().min(1).required(),
});
