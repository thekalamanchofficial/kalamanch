import React, { type FormEvent } from "react";
import { useSignInForm } from "~/app/sign-in/_hooks/useSignInForm";
import { Controller } from "react-hook-form";
import { type FormDataSignIn } from "~/app/sign-in/_types/types";
import { STATIC_TEXTS } from "../static/staticText";
import {
  Button,
  FormControl,
  Grid2 as Grid,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";

type SignInFormProps = {
  onSubmit: (data: FormDataSignIn) => void;
};

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const {
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useSignInForm();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = await trigger();
    if (isValid) {
      await handleSubmit(onSubmit)();
    }
  };

  return (
    <Grid container width="100%" gap={2} mt={4}>
      <Grid width="100%">
        <Controller
          control={control}
          name="email"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth>
              <TextField
                type="email"
                value={value}
                onChange={onChange}
                id="email"
                label={STATIC_TEXTS.SIGNIN_FORM.LABELS.EMAIL}
                placeholder="Enter your email"
                helperText={errors?.email?.message}
                error={!!errors?.email?.message}
                variant="outlined"
                fullWidth
              />
            </FormControl>
          )}
        />
      </Grid>
      <Grid width="100%">
        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <FormControl fullWidth>
              <TextField
                type="password"
                value={value}
                onChange={onChange}
                id="password"
                label={STATIC_TEXTS.SIGNIN_FORM.LABELS.PASSWORD}
                placeholder="Enter your email"
                helperText={errors?.password?.message}
                error={!!errors?.password?.message}
                variant="outlined"
                fullWidth
              />
            </FormControl>
          )}
        />
      </Grid>
      <Grid width="100%" justifyContent="center" display="flex">
        <Button
          type="submit"
          onClick={handleLogin}
          variant="contained"
          size="large"
        >
          <Typography variant="h6">{STATIC_TEXTS.NAVIGATION.SUBMIT}</Typography>
        </Button>
      </Grid>
      <Grid
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h6">
          {STATIC_TEXTS.SIGNIN_FORM.LINKS_TEXT.NEED_ACCOUNT}&nbsp;
        </Typography>
        <Link href="/sign-up" style={{ fontWeight: "bold" }}>
          {" "}
          {STATIC_TEXTS.SIGNUP}.
        </Link>
      </Grid>
    </Grid>
  );
};

export default SignInForm;
