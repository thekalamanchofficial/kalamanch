import { useForm, type UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contentFormSchema } from "../formSchema/schema";

type ContentFormProps = {
  defaultValues: {
    content: string;
    title: string;
  };
};

type ContentForm = (props: ContentFormProps) => UseFormReturn<{ content: string; title: string }>;

export const useContentForm: ContentForm = ({ defaultValues }) =>
  useForm<{ content: string; title: string }>({
    mode: "onChange",
    resolver: yupResolver(contentFormSchema),
    defaultValues,
  });
