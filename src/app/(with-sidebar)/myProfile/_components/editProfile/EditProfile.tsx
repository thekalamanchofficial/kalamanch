import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import { useEditProfileForm } from "../../_hooks/useEditProfileForm";
import { type EditProfileDetails } from "../../types/types";
import { Controller } from "react-hook-form";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

export type EditProfileProps = {
  open: boolean;
  handleClose: () => void;
  profileData: EditProfileDetails;
  handleProfileSave: (data: EditProfileDetails) => Promise<void>;
};
export const EditProfile: React.FC<EditProfileProps> = ({
  open,
  handleClose,
  profileData,
  handleProfileSave,
}) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useEditProfileForm({ defaultValues: profileData });

  const onDatepickerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setOpenDatePicker((open) => !open);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: "100%" }}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 744,
        },
      }}
    >
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <TextField
                type="text"
                value={value}
                onChange={onChange}
                id="name"
                label={STATIC_TEXTS.DETAILS_FORM.LABELS.NAME}
                placeholder="Enter your name"
                helperText={errors?.name?.message}
                error={!!errors?.name?.message}
                variant="outlined"
                fullWidth
                sx={{ mb: 2, mt: 2 }}
              />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="headline"
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <TextField
                type="text"
                value={value}
                onChange={onChange}
                id="headline"
                label="Headline"
                placeholder="Enter your headline"
                helperText={errors?.headline?.message}
                error={!!errors?.headline?.message}
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
        <Controller
          control={control}
          name="birthdate"
          render={({ field: { onChange, value } }) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={onChange}
                  value={value}
                  open={openDatePicker}
                  onOpen={() => setOpenDatePicker(true)}
                  onClose={() => setOpenDatePicker(false)}
                  label={STATIC_TEXTS.DETAILS_FORM.LABELS.BIRTHDATE}
                  disableFuture
                  slotProps={{
                    popper: {
                      placement: "bottom-end",
                    },
                    textField: {
                      helperText: errors?.birthdate?.message,
                      error: !!errors?.birthdate?.message,
                      onClick: () => setOpenDatePicker(true),
                      onKeyDown: onDatepickerKeyDown,
                      variant: "outlined",
                      placeholder: "DD/MM/YYYY",
                    },
                  }}
                  sx={{ mb: 2 }}
                />
              </LocalizationProvider>
            );
          }}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", padding: 3 }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{ width: "100px" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(handleProfileSave)}
          sx={{ width: "100px" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
