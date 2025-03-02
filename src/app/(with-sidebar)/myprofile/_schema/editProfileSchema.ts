import * as Yup from "yup";

const interestsSchema = Yup.object().shape({
  genres: Yup.array()
    .of(Yup.string().defined())
    .required(),
  tags: Yup.array()
    .of(Yup.string().defined())
    .required(),
});

export const editProfileSchema = Yup.object().shape({
  name: Yup.string().required(),
  bio: Yup.string().required(),
  birthdate: Yup.string().required(),
  education: Yup.array().of(Yup.string().defined()).required(),
  readingInterests: interestsSchema.required(),
  writingInterests: interestsSchema.required(),
});
