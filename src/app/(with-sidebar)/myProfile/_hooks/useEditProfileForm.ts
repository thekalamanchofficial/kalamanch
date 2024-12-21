import { yupResolver } from "@hookform/resolvers/yup";
import { type UseFormReturn, useForm } from "react-hook-form";
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
