import { useState } from "react";
import { Controller, useFormContext, type FieldErrors } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { type Dayjs } from "dayjs";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { type EditProfileDetails } from "../../../types/types";

interface BirthdateFieldProps {
  errors: FieldErrors<EditProfileDetails>;
  defaultValue: string;
}

export const BirthdateField: React.FC<BirthdateFieldProps> = ({ errors, defaultValue }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const { control } = useFormContext<EditProfileDetails>();

  const onDatepickerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setOpenDatePicker((open) => !open);
  };

  return (
    <Controller
      control={control}
      name="birthdate"
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            onChange={(newValue: Dayjs | null) => onChange(newValue)}
            value={dayjs(value)}
            open={openDatePicker}
            onOpen={() => setOpenDatePicker(true)}
            onClose={() => setOpenDatePicker(false)}
            label={STATIC_TEXTS.DETAILS_FORM.LABELS.BIRTHDATE}
            disableFuture={true}
            slotProps={{
              popper: { placement: "bottom-end" },
              textField: {
                helperText: errors?.birthdate?.message,
                error: !!errors?.birthdate?.message,
                onClick: () => setOpenDatePicker(true),
                onKeyDown: onDatepickerKeyDown,
                variant: "outlined",
                placeholder: "DD/MM/YYYY",
                fullWidth: true,
                InputLabelProps: { shrink: true },
              },
              desktopPaper: {
                sx: {
                  "& .MuiPickersDay-root": {
                    minHeight: "36px",
                    mb: 1,
                  },
                },
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
