import * as Yup from "yup";

const interestsSchema = Yup.object().shape({
  genres: Yup.array()
    .of(Yup.string().required("Genre is required"))
    .min(1, "At least one genre is required")
    .required("Genres are required"),
  tags: Yup.array()
    .of(Yup.string().required("Tag is required"))
    .min(1, "At least one tag is required")
    .required("Tags are required"),
});

export const editProfileSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name must be at least 2 characters long").required("Name is required"),
  birthdate: Yup.date()
    .max(new Date(), "Date of birth can't be in the future")
    .required("Birthdate is required"),
  bio: Yup.string().optional(),
  readingInterests: interestsSchema.required("Reading interests are required"),
  writingInterests: interestsSchema.required("Writing interests are required"),
  education: Yup.array().optional(),
  professionalAchievements: Yup.string().optional(),
});
