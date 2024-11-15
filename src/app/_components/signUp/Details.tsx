import React, { useRef, useState } from "react";
import { useSignUpDetailsForm } from "~/app/sign-up/_hooks/useSignUpForm";
import { Controller } from "react-hook-form";
import {
  type FormDataPartial,
  type FormDataDetails,
} from "~/app/sign-up/_types/types";

import UploadIcon from "~/assets/svg/UploadIcon.svg";
import DeleteIcon from "@mui/icons-material/Delete";

import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import {
  FormControl,
  Grid2 as Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

type DetailsFormProps = {
  onNext: (data: FormDataDetails) => Promise<void>;
  onPrev: () => void;
  data?: FormDataPartial;
  profileFile?: File;
  setProfileFile: (file?: File) => void;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
};

const DetailsForm: React.FC<DetailsFormProps> = ({
  onNext,
  onPrev,
  data,
  setProfileFile,
  imagePreview,
  setImagePreview,
}) => {
  const {
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useSignUpDetailsForm();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const datepicekrAnchor = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const handleDeleteImage = () => {
    setProfileFile(undefined);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
          defaultValue={(data as FormDataDetails)?.birthdate ?? dayjs()}
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

        <Typography variant="caption">
          {STATIC_TEXTS.DETAILS_FORM.LABELS.PROFILE}
        </Typography>
        <Controller
          name="profile"
          control={control}
          render={({ field: { onChange } }) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                maxWidth: 200,
                justifyContent: "space-between",
              }}
            >
              <Avatar
                src={imagePreview ?? ""}
                alt="Profile Preview"
                sx={{ width: 90, height: 90, mb: 2 }}
              />
              <input
                accept="image/*"
                type="file"
                ref={fileInputRef} // Attach the ref to the input
                style={{ display: "none" }}
                onChange={(event) => {
                  const file = event?.target?.files?.[0];
                  if (file) {
                    onChange(file);
                    const reader = new FileReader();
                    setProfileFile(file);
                    reader.onloadend = () => {
                      setImagePreview(reader?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {!imagePreview ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<UploadIcon />}
                  onClick={handleButtonClick}
                  size="small"
                  sx={{ minHeight: "32px" }}
                >
                  {STATIC_TEXTS.DETAILS_FORM.UPLOAD_FILE.UPLOAD_BUTTON}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon color="disabled" />}
                  onClick={handleDeleteImage}
                  size="small"
                  sx={{
                    minHeight: "32px",
                    backgroundColor: (theme) => theme.palette.grey[100],
                    borderColor: (theme) => theme.palette.grey[300],
                    color: (theme) => theme.palette.grey[700],
                  }}
                >
                  {STATIC_TEXTS.DETAILS_FORM.UPLOAD_FILE.DELETE_BUTTON}
                </Button>
              )}
            </Box>
          )}
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
