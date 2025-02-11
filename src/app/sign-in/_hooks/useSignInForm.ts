import { useForm, type UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "../_schema/schema";
import { type FormDataSignIn } from "../_types/types";

export const useSignInForm = (): UseFormReturn<FormDataSignIn> =>
  useForm({ mode: "onChange", resolver: yupResolver(signInFormSchema) });
