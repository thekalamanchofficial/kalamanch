import { yupResolver } from "@hookform/resolvers/yup";
import { type UseFormReturn, useForm } from "react-hook-form";
import {
  signUpFormSchemaDetails,
  signUpFormSchemaInterest,
  signUpFormSchemaRole,
} from "../_schema/schema";

import {
  type FormDataDetails,
  type FormDataInterest,
  type FormDataRole,
} from "../_types/types";

export const useSignUpDetailsForm = (): UseFormReturn<FormDataDetails> =>
  useForm({ mode: "onChange", resolver: yupResolver(signUpFormSchemaDetails) });

export const useSignUpInterestForm = (): UseFormReturn<FormDataInterest> =>
  useForm({
    mode: "onChange",
    resolver: yupResolver(signUpFormSchemaInterest),
  });

export const useSignUpRoleForm = (): UseFormReturn<FormDataRole> =>
  useForm({ mode: "onChange", resolver: yupResolver(signUpFormSchemaRole) });
