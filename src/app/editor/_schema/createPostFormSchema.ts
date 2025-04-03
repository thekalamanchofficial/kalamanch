import * as Yup from "yup";

export const createPostFormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  showThumbnail: Yup.boolean().default(false).optional(),
  thumbnailUrl: Yup.string().when("showThumbnail", {
    is: true,
    then: (schema) => schema.required("Thumbnail image is required"),
    otherwise: (schema) => schema.optional(),
  }),
  thumbnailTitle: Yup.string().when("showThumbnail", {
    is: true,
    then: (schema) => schema.required("Thumbnail title is required"),
    otherwise: (schema) => schema.optional(),
  }),
  thumbnailDescription: Yup.string().when("showThumbnail", {
    is: true,
    then: (schema) => schema.required("Thumbnail description is required"),
    otherwise: (schema) => schema.optional(),
  }),
  genres: Yup.array().optional(),
  postTypeId: Yup.string().optional(),
  tags: Yup.array().of(Yup.string().required()).optional(),
  actors: Yup.array().of(Yup.string().required()).optional(),
});
