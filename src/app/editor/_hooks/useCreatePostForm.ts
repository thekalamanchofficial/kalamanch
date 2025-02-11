import { useForm, type UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPostFormSchema } from "../_schema/createPostFormSchema";
import { type CreatePostFormType } from "../types/types";

export const useCreatePostForm = ({
  defaultValues,
}: {
  defaultValues: CreatePostFormType;
}): UseFormReturn<CreatePostFormType> =>
  useForm({
    mode: "onChange",
    resolver: yupResolver(createPostFormSchema),
    defaultValues,
  });
