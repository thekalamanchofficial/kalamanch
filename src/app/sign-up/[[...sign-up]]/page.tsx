"use client";
import React from "react";

import Details from "~/app/_components/signUp/Details";

import { SignUpFormStages, STEPS } from "~/app/sign-up/_config/config";
import OTPVerification from "~/app/_components/signUp/OtpForm";

import { STATIC_TEXTS } from "~/app/_components/static/staticText";

import CheckPending from "~/assets/svg/CheckPending.svg";
import CheckComplete from "~/assets/svg/CheckComplete.svg";
import { useSignUpPage } from "../_hooks/useSignUpPage";
import {
  Grid2 as Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

const StepperStartIcon = () => <CheckPending />;
const StepperEndIcon = () => <CheckComplete />;

export default function Page() {
  const {
    formData,
    profileFile,
    setProfileFile,
    imagePreview,
    setImagePreview,
    formStep,
    formStepNumber,
    handleNext,
    handlePrev,
    otp,
    setOtp,
    verifying,
  } = useSignUpPage();

  return (
    <Grid
      display="flex"
      flexDirection="column"
      gap={2}
      pt={3}
      justifyItems="center"
      alignItems="center"
      sx={{ backgroundColor: "background.default" }}
      container
      minHeight="100vh"
    >
      <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
        <Typography variant="h1" fontSize="2em" fontWeight="bold">
          {STATIC_TEXTS.FORM_HEADING}
        </Typography>
      </Grid>
      <Grid
        display="flex"
        width="100%"
        maxWidth="824px"
        px={6}
        py={4}
        flexDirection="column"
        sx={{
          backgroundColor: "background.paper",
          justifyItems: "center",
          alignItems: "center",
        }}
        size={{ xs: 12 }}
      >
        <Stepper
          sx={{ width: "100%", mb: 4 }}
          alternativeLabel
          activeStep={formStepNumber}
        >
          {STEPS.map((step, index) => {
            const isCompleted = step.stepNumber <= formStepNumber;
            return (
              <Step key={index} completed={isCompleted}>
                <StepLabel
                  StepIconComponent={
                    isCompleted ? StepperEndIcon : StepperStartIcon
                  }
                  sx={{ borderColor: "blue" }}
                >
                  {step.label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {formStep === SignUpFormStages.DETAILS ? (
          <Details
            onNext={handleNext}
            onPrev={handlePrev}
            data={formData}
            profileFile={profileFile}
            setProfileFile={setProfileFile}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        ) : null}
        {formStep === SignUpFormStages.OTP_VERIFICATION ? (
          <OTPVerification
            otp={otp}
            setOtp={setOtp}
            onNext={handleNext}
            verifying={verifying}
            onPrev={handlePrev}
          />
        ) : null}
      </Grid>
    </Grid>
  );
}
