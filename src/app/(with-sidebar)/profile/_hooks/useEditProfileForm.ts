import { useForm, type UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileSchema } from "../_schema/editProfileSchema";
import { type EditProfileDetails } from "../types/types";

export const useEditProfileForm = ({
  defaultValues,
}: {
  defaultValues: EditProfileDetails;
}): UseFormReturn<EditProfileDetails> =>
  useForm({
    mode: "onChange",
    resolver: yupResolver(editProfileSchema),
    defaultValues,
  });
