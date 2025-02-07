import React, { useRef, useState } from "react";
import { useSignUpDetailsForm } from "~/app/sign-up/_hooks/useSignUpForm";
import { Controller } from "react-hook-form";
import { type FormDataDetails } from "~/app/sign-up/_types/types";

import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import {
  FormControl,
  Grid2 as Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type DetailsFormProps = {
  onNext: (data: FormDataDetails) => Promise<void>;
  onPrev: () => void;
  data?: FormDataDetails;
  profileImageUrl: string | null;
  setProfileImageUrl: (preview: string | null) => void;
};

const DetailsForm: React.FC<DetailsFormProps> = ({
  onNext,
  onPrev,
  data,
}) => {
  const {
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useSignUpDetailsForm();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const datepicekrAnchor = useRef<HTMLInputElement | null>(null);

  const handleNext = async (data: FormDataDetails) => {
    const isValid = await trigger();
    if (isValid) {
      await onNext(data);
    }
  };

  const onDatepickerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    datepicekrAnchor.current = e.currentTarget;
    setOpenDatePicker((open) => !open);
  };

  return (
    <Grid container width="100%" px={2} maxWidth="568px">
      <Grid display="flex" width="100%" flexDirection="column" mb={3}>
        <Controller
          control={control}
          name="name"
          defaultValue={data && "name" in data ? data.name : ""}
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
                sx={{ mb: 2 }}
              />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="email"
          defaultValue={data && "email" in data ? data.email : ""}
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <TextField
                type="email"
                value={value}
                onChange={onChange}
                id="email"
                label={STATIC_TEXTS.DETAILS_FORM.LABELS.EMAIL}
                placeholder="Enter your email"
                helperText={errors?.email?.message}
                error={!!errors?.email?.message}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="password"
          defaultValue={data && "password" in data ? data.password : ""}
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <TextField
                type="password"
                value={value}
                onChange={onChange}
                id="password"
                label={STATIC_TEXTS.DETAILS_FORM.LABELS.PASSWORD}
                placeholder="Choose a password"
                helperText={errors?.password?.message}
                error={!!errors?.password?.message}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          defaultValue={
            data && "confirmPassword" in data ? data.confirmPassword : ""
          }
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <TextField
                type="text"
                value={value}
                onChange={onChange}
                id="confirmPassword"
                label={STATIC_TEXTS.DETAILS_FORM.LABELS.CONFIRM_PASSWORD}
                placeholder="Enter password"
                helperText={errors?.confirmPassword?.message}
                error={!!errors?.confirmPassword?.message}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name="birthdate"
          defaultValue={data?.birthdate}
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
        <Grid justifyContent="space-between" display="flex" width="100%" mt={2}>
          <Button
            type="button"
            onClick={onPrev}
            variant="contained"
            size="large"
            sx={{ width: "150px" }}
          >
            <Typography variant="h6">{STATIC_TEXTS.NAVIGATION.BACK}</Typography>
          </Button>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{ width: "150px" }}
            onClick={handleSubmit(handleNext)}
          >
            <Typography variant="h6">{STATIC_TEXTS.NAVIGATION.NEXT}</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailsForm;
