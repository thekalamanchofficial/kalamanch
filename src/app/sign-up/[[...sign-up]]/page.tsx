"use client";
import React from "react";

import Details from "~/app/_components/signUp/Details";
import Role from "~/app/_components/signUp/Role";
import Interests from "~/app/_components/signUp/Interests";

import { SignUpFormStages, STEPS } from "~/app/sign-up/_config/config";
import OTPVerification from "~/app/_components/signUp/OtpForm";

import { STATIC_TEXTS } from "~/app/_components/static/staticText";

import Check from "~/assets/svg/Check.svg";
import CheckColored from "~/assets/svg/CheckColored.svg";
import { useSignUpPage } from "../_hooks/useSignUpPage";
import { Step, StepLabel, Stepper } from "@mui/material";

export default function Page() {
  const {
    handleVerify,
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
    verifyStarted,
    verifying,
  } = useSignUpPage();

  if (verifyStarted) {
    return (
      <OTPVerification
        otp={otp}
        setOtp={setOtp}
        onVerify={handleVerify}
        verifying={verifying}
      />
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center bg-brand-secondary py-3">
      <h1 className="mb-4 mt-4 text-4xl font-semibold text-font-primary">
        {STATIC_TEXTS.FORM_HEADING}
      </h1>
      <div className="flex max-h-[950px] w-full max-w-3xl flex-col items-center gap-y-12 rounded-lg bg-white px-6 py-4 md:aspect-auto">
        <div className="stepper flex h-full w-full items-center justify-center gap-1">
          <div className="h-full w-full px-24 py-4">
            {/* <div className="relative flex h-full w-full items-center justify-between">
              <div
                className={`absolute left-0 top-2/4 h-0.5 w-1/2 -translate-y-2/4 transition-all duration-500 ${formStep == SignUpFormStages.INTEREST || formStep == SignUpFormStages.ROLE ? "bg-brand-primary" : "bg-gray-300"}`}
              ></div>
              <div
                className={`absolute right-0 top-2/4 h-0.5 w-1/2 -translate-y-2/4 transition-all duration-500 ${formStep == SignUpFormStages.ROLE ? "bg-brand-primary" : "bg-gray-300"}`}
              ></div>
              {STATIC_TEXTS.FORM_STEPS.map((step, index) => {
                const isActivated = formStep.toString() == step.keyName;
                const isBehind = formStepNumber > index;

                return (
                  <div
                    key={index}
                    className={`relative z-10 grid h-10 w-10 place-items-center rounded-full border border-brand-primary font-bold transition-all duration-300 ${isActivated || isBehind ? "bg-brand-primary text-white" : "bg-white text-brand-primary"} }`}
                  >
                    {isActivated || isBehind ? <Check /> : <CheckColored />}
                    <div className="absolute -bottom-[2rem] w-max text-center">
                      <h6
                        className={`block text-base leading-relaxed tracking-normal text-gray-700 antialiased ${isActivated ? "font-extrabold" : "font-medium"}`}
                      >
                        {step.value}
                      </h6>
                    </div>
                  </div>
                );
              })}
            </div> */}
            <Stepper>
              {STEPS.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-3">
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

          {formStep === SignUpFormStages.INTEREST ? (
            <Interests
              onNext={handleNext}
              onPrev={handlePrev}
              data={formData}
            />
          ) : null}

          {formStep === SignUpFormStages.ROLE ? (
            <Role onNext={handleNext} onPrev={handlePrev} data={formData} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
