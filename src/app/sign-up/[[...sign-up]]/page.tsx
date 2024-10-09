"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { trpc } from "~/server/client";
import { toast } from "react-toastify";

import Details from "~/app/_components/signUp/Details";
import Role from "~/app/_components/signUp/Role";
import Interests from "~/app/_components/signUp/Interests";

import {
  type FormData,
  type FormDataPartial,
} from "~/app/sign-up/_types/types";

import { SignUpFormStages } from "~/app/sign-up/_config/config";
import OTPVerification from "~/app/_components/signUp/OtpForm";

import { SignUpFormStatus } from "~/app/sign-up/_config/config";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";

import Check from "~/assets/svg/Check.svg";
import CheckColored from "~/assets/svg/CheckColored.svg";
import {
  handleClerkError,
  handleError,
  handleGeneralError,
} from "~/app/_utils/handleError";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

export default function Page() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifyStarted, setVerifyStarted] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [formData, setFormData] = useState<FormData>({} as FormData);

  const [profileFile, setProfileFile] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formStep, setFormStep] = useState<SignUpFormStages>(
    SignUpFormStages.DETAILS,
  );
  const [formStepNumber, setFormStepNumber] = useState<number>(0);

  const mutation = trpc.user.addUser.useMutation();

  const handleNext = async (data: FormDataPartial): Promise<void> => {
    setFormStepNumber((prev) => prev + 1);
    setFormData((prev) => ({ ...prev, ...data }));

    if (formStep === SignUpFormStages.DETAILS) {
      setFormStep(SignUpFormStages.INTEREST);
    } else if (formStep === SignUpFormStages.INTEREST) {
      setFormStep(SignUpFormStages.ROLE);
    } else if (formStep === SignUpFormStages.ROLE) {
      await finalSubmit();
    }
  };
  const handlePrev = async () => {
    setFormStepNumber((prev) => prev - 1);
    if (formStep === SignUpFormStages.DETAILS) {
      router.push("/");
    } else if (formStep === SignUpFormStages.INTEREST) {
      setFormStep(SignUpFormStages.DETAILS);
    } else if (formStep === SignUpFormStages.ROLE) {
      setFormStep(SignUpFormStages.INTEREST);
    }
  };

  const addUserToDB = async () => {
    const data = {
      email: formData.email,
      name: formData.name,
      birthdate: formData.birthdate,
      profile: formData.profile,
      interests: formData.interests,
      role: formData.role,
    };

    try {
      const user = await mutation.mutateAsync(data);
      return user;
    } catch (error) {
      handleGeneralError(error);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      setVerifying(true);
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      if (signUpAttempt.status === SignUpFormStatus.complete) {
        try {
          await toast.promise(
            (async () => {
              await setActive({ session: signUpAttempt.createdSessionId });
              const res = await addUserToDB();
              if (res != undefined) router.push("/");
            })(),
            {
              pending: `${STATIC_TEXTS.DETAILS_FORM.MESSAGES.PENDING}`,
              success: `${STATIC_TEXTS.DETAILS_FORM.MESSAGES.SUCCESS}`,
              error: `${STATIC_TEXTS.DETAILS_FORM.MESSAGES.ERROR}`,
            },
          );
        } catch (error) {
          handleClerkError(error);
        }
      } else {
        handleError("Error verifying email address");
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        toast.error(err?.errors?.[0]?.message);
      }
    } finally {
      setVerifying(false);
    }
  };

  const finalSubmit = async () => {
    if (!isLoaded) return;

    const emailAddress = formData.email;
    const password = formData.password;

    try {
      await signUp.create({
        emailAddress,
        password,
        unsafeMetadata: {
          name: formData.name,
          birthdate: formData.birthdate,
          profile: formData.profile,
          interests: formData.interests,
          role: formData.role,
        },
      });
      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setVerifyStarted(true);
    } catch (err: unknown) {
      handleClerkError(err);
    }
  };

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
    <div className="flex h-full w-full flex-col items-center justify-center bg-brand-secondary py-3">
      <h1 className="mb-4 mt-4 text-4xl font-semibold text-font-primary">
        {STATIC_TEXTS.FORM_HEADING}
      </h1>
      <div className="flex aspect-square h-auto max-h-[950px] w-full max-w-3xl flex-col items-center gap-y-12 rounded-lg bg-white px-6 py-4 md:aspect-auto">
        <div className="stepper flex w-full items-center justify-center gap-1">
          <div className="w-full px-24 py-4">
            <div className="relative flex w-full items-center justify-between">
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
            </div>
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
