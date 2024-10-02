import { profile } from "console";
import * as Yup from "yup";

export const signUpFormSchemaDetails = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .required("Name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*#?&]/,
      "Password must contain at least one special character",
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  birthdate: Yup.date()
    .max(new Date(), "Date of birth can't be in the future")
    .required("Birthdate is required"),
  // profile is not required
  profile: Yup.string(),
});

export const signUpFormSchemaInterest = Yup.object().shape({
  interests: Yup.array()
    .min(1, "Please select at least one interest")
    .required("Interests are required"),
});

export const signUpFormSchemaRole = Yup.object().shape({
  role: Yup.string().required("Select a Role to continue"),
});
