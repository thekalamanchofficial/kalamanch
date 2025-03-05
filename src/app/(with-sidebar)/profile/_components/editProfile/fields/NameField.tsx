import { Controller, useFormContext } from "react-hook-form";
import { FormControl, TextField } from "@mui/material";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { type EditProfileDetails } from "../../../types/types";

type NameFieldProps = {
  defaultValue: string;
}

export const NameField: React.FC<NameFieldProps> = ({ defaultValue }) => {
  const { control } = useFormContext<EditProfileDetails>();

  return (
    <Controller
      control={control}
      name="name"
      defaultValue={defaultValue}
      render={({ field: { value } }) => (
        <FormControl fullWidth>
          <TextField
            type="text"
            value={value}
            id="name"
            label={STATIC_TEXTS.DETAILS_FORM.LABELS.NAME}
            variant="outlined"
            fullWidth
            disabled
            sx={{
              "& .Mui-disabled": {
                WebkitTextFillColor: "#101828 !important",
                cursor: "not-allowed",
              },
            }}
          />
        </FormControl>
      )}
    />
  );
};
