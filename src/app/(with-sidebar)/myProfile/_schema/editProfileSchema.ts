import * as Yup from "yup";

export const editProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .required("Name is required"),
  birthdate: Yup.date()
    .max(new Date(), "Date of birth can't be in the future")
    .required("Birthdate is required"),
  bio: Yup.string().optional(),
  interests: Yup.array().min(1, "At least one interests are required"),
  education: Yup.array().optional(),
  professionalAchievements: Yup.string().optional(),
});
