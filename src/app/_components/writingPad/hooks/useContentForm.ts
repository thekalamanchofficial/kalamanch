import { useForm, type UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contentFormSchema } from "../formSchema/schema";

type ContentForm = () => UseFormReturn<{ content: string }>;

export const useContentForm: ContentForm = () =>
  useForm<{ content: string }>({ mode: "onChange", resolver: yupResolver(contentFormSchema) });
