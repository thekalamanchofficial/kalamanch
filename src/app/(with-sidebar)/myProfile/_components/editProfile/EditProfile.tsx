import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  Grid2 as Grid,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useEditProfileForm } from "~/app/(with-sidebar)/myprofile/_hook/useEditProfileForm";
import { type EditProfileDetails } from "../../types/types";
import { Controller } from "react-hook-form";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { useState } from "react";
import { INTEREST_ARRAY } from "~/app/sign-up/_config/config";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

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

  console.log(profileData);

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
          defaultValue={profileData.name}
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
          name="bio"
          defaultValue={profileData.bio}
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
        {/* <Controller
          control={control}
          name="birthdate"
          // defaultValue={profileData.birthdate} // Convert to Day.js
          render={({ field: { onChange, value } }) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(newValue) => {
                    console.log(newValue);

                    onChange(newValue); // Pass the Day.js object to react-hook-form
                  }}
                  value={value} // Ensure value is a Day.js object or null
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
        /> */}

        <Controller
          control={control}
          name="interests"
          defaultValue={profileData.interests ? [...profileData.interests] : []}
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <Typography variant="h6" gutterBottom>
                Select your interests
              </Typography>
              <Grid container spacing={1}>
                {INTEREST_ARRAY.map((interest) => {
                  const isSelected = value.includes(interest);
                  return (
                    <Grid key={interest}>
                      <Chip
                        label={interest}
                        onClick={() => {
                          if (isSelected) {
                            onChange(value.filter((item) => item !== interest));
                          } else {
                            onChange([...value, interest]);
                          }
                        }}
                        color={isSelected ? "primary" : "default"}
                        variant={isSelected ? "filled" : "outlined"}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              {errors?.interests?.message && (
                <Typography color="error" variant="body2">
                  {errors.interests.message}
                </Typography>
              )}
            </FormControl>
          )}
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
