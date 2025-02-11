import { useForm, type UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpFormSchemaDetails } from "../_schema/schema";
import { type FormDataDetails } from "../_types/types";

export const useSignUpDetailsForm = (): UseFormReturn<FormDataDetails> =>
  useForm({ mode: "onChange", resolver: yupResolver(signUpFormSchemaDetails) });
