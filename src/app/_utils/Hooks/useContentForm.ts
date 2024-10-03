import { yupResolver } from "@hookform/resolvers/yup";
import { type UseFormReturn, useForm } from "react-hook-form";
import {
  signInFormSchema,
  signUpFormSchemaDetails,
  signUpFormSchemaInterest,
  signUpFormSchemaRole,
} from "../Schema/formSchema";

type FormDataDetails = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  birthdate: Date;
  profile: string;
};

type FormDataInterest = {
  interests: string[];
};

type FormDataRole = {
  role: string;
};

type FormDataSignIn = {
  email: string;
  password: string;
};

export const useContentFormDetails = (): UseFormReturn<FormDataDetails> =>
  useForm({ mode: "onChange", resolver: yupResolver(signUpFormSchemaDetails) });

export const useContentFormInterest = (): UseFormReturn<FormDataInterest> =>
  useForm({
    mode: "onChange",
    resolver: yupResolver(signUpFormSchemaInterest),
  });

export const useContentFormRole = (): UseFormReturn<FormDataRole> =>
  useForm({ mode: "onChange", resolver: yupResolver(signUpFormSchemaRole) });

export const useContentFormSignIn = (): UseFormReturn<FormDataSignIn> =>
  useForm({ mode: "onChange", resolver: yupResolver(signInFormSchema) });
