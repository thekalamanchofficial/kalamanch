import { Controller, useFormContext, type FieldErrors } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import { type EditProfileDetails } from "../../../types/types";

type BioFieldProps = {
  errors: FieldErrors<EditProfileDetails>;
  defaultValue: string;
}

export const BioField: React.FC<BioFieldProps> = ({ errors, defaultValue }) => {
  const { control } = useFormContext<EditProfileDetails>();

  return (
    <Controller
      control={control}
      name="bio"
      defaultValue={defaultValue}
      render={({ field: { value, onChange } }) => (
        <FormControl fullWidth>
          <TextField
            type="text"
            value={value}
            onChange={onChange}
            id="bio"
            label="Bio"
            placeholder="Enter your bio"
            helperText={errors?.bio?.message}
            error={!!errors?.bio?.message}
            variant="outlined"
            fullWidth
            sx={{
              mb: 2,
              "& .MuiInputBase-inputMultiline": { minHeight: 64 },
            }}
            multiline
          />
        </FormControl>
      )}
    />
  );
};
