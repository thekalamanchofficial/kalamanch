import { yupResolver } from "@hookform/resolvers/yup";
import { type UseFormReturn, useForm } from "react-hook-form";
import { type FormDataSignIn } from "../_types/types";
import { signInFormSchema } from "../_schema/schema";

export const useSignInForm = (): UseFormReturn<FormDataSignIn> =>
  useForm({ mode: "onChange", resolver: yupResolver(signInFormSchema) });
