import * as yup from "yup";

export const contentFormSchema = yup.object().shape({
  content: yup.string().min(1).required("Content is required"),
  title: yup.string().required("Title is required"),
});
