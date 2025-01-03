import * as Yup from "yup";

export const createPostFormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  targetAudience: Yup.array().optional(),
  thumbnailUrl: Yup.string().optional(),
  postType: Yup.string().optional(),
  tags: Yup.array().of(Yup.string().required()).optional(),
  actors: Yup.array().of(Yup.string().required()).optional(),
});
