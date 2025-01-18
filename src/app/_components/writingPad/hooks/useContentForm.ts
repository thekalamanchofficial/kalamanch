import { yupResolver } from "@hookform/resolvers/yup";
import { type UseFormReturn, useForm } from "react-hook-form";
import { contentFormSchema } from "../formSchema/schema";

type ContentForm = () => UseFormReturn<{ content: string }>;

export const useContentForm: ContentForm = () =>
  useForm<{ content: string }>({ mode: "onChange", resolver: yupResolver(contentFormSchema) });
