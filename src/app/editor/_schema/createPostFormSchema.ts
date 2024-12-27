import * as Yup from "yup";

export const createPostFormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  targetAudience: Yup.array()
    .min(1, "Select at least one target audience")
    .required(),
  thumbnailUrl: Yup.string().required("Thumbnail is required"),
  postType: Yup.string().required("Post Type is required"),
  tags: Yup.array().min(1, "At least one interests are required").required(),
  actors: Yup.array().default([]),
});
