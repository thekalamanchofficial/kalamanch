import { PostType } from "@prisma/client";
import * as Yup from "yup";

export const createPostFormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  thumbnailUrl: Yup.string().optional(),
  thumbnailTitle: Yup.string().optional(),
  thumbnailDescription: Yup.string().optional(),
  genres: Yup.array().optional(),
  postType: Yup.mixed<PostType>().oneOf(Object.values(PostType)).optional(),
  tags: Yup.array().of(Yup.string().required()).optional(),
  actors: Yup.array().of(Yup.string().required()).optional(),
});
