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
  profile: Yup.string().default(""),
});

export const signUpFormSchemaInterest = Yup.object().shape({
  interests: Yup.array()
    .min(1, "Please select at least one interest")
    .required("Interests are required"),
});

export const signUpFormSchemaRole = Yup.object().shape({
  role: Yup.string().required("Select a Role to continue"),
});

export const signInFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// import { z } from "zod";

// export type SignUpFormSchema={
//   name: string;
//   password: string;
//   confirmPassword: string;
//   email: string;
//   birthdate: Date;
//   profile: string;
// }
// // Schema for sign-up form details
// export const signUpFormSchemaDetails = z.object({
//   name: z
//     .string({ required_error: "Name is required" })
//     .min(2, { message: "Name must be at least 2 characters long" }),
//   password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters long" })
//     .regex(/[A-Z]/, {
//       message: "Password must contain at least one uppercase letter",
//     })
//     .regex(/[0-9]/, { message: "Password must contain at least one number" })
//     .regex(/[@$!%*#?&]/, {
//       message: "Password must contain at least one special character",
//     })

//   confirmPassword: z.string().refine((val, ctx) => {
//     if (val !== ctx.parent.password) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Passwords must match",
//       });
//       return false;
//     }
//     return true;
//   }),
//   email: z.string().email({ message: "Invalid email format" }),
//   birthdate: z
//     .date()
//     .max(new Date(), { message: "Date of birth can't be in the future" }),

//   profile: z.string().default("").optional(),
// });

// // Schema for interests
// export const signUpFormSchemaInterest = z.object({
//   interests: z
//     .array(z.string())
//     .min(1, { message: "Please select at least one interest" })
//     .nonempty({ message: "Interests are required" }),
// });

// // Schema for role
// export const signUpFormSchemaRole = z.object({
//   role: z.string({ required_error: "Select a Role to continue" }),
// });

// // Schema for sign-in
// export const signInFormSchema = z.object({
//   email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email format" }),
//   password: z.string({required_error: "Password is required"}),
// });
