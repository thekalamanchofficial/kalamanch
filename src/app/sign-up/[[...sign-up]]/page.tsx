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

import FormStepper from "~/assets/svg/FormStepper.svg";

export default function Page() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);

  const [formData, setFormData] = useState<FormData>({} as FormData);

  const [formStep, setFormStep] = useState<SignUpFormStages>(
    SignUpFormStages.DETAILS,
  );

  const mutation = trpc.user.addUser.useMutation();

  const handleNext = async (data: FormDataPartial): Promise<void> => {
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
      console.error("Error creating user:", error);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      if (signUpAttempt.status === SignUpFormStatus.complete) {
        try {
          await toast.promise(
            (async () => {
              await setActive({ session: signUpAttempt.createdSessionId });
              const res = await addUserToDB();
              console.log(res);

              if (res != undefined) router.push("/");
              else throw new Error("Error creating user");
            })(),
            {
              pending: `${STATIC_TEXTS.DETAILS_FORM.MESSAGES.PENDING}`,
              success: `${STATIC_TEXTS.DETAILS_FORM.MESSAGES.SUCCESS}`,
              error: `${STATIC_TEXTS.DETAILS_FORM.MESSAGES.ERROR}`,
            },
          );
        } catch (error) {
          console.error("Error during the signup process:", error);
        }
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2));
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

      setVerifying(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (verifying) {
    return (
      <OTPVerification otp={otp} setOtp={setOtp} onVerify={handleVerify} />
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
              <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300"></div>
              <div className="absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 transition-all duration-500"></div>
              <div className="relative z-10 grid h-10 w-10 place-items-center rounded-full font-bold text-white transition-all duration-300">
                <FormStepper />
                <div className="absolute -bottom-[2rem] w-max text-center">
                  <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-gray-700 antialiased">
                    {STATIC_TEXTS.FORM_STEP1}
                  </h6>
                </div>
              </div>
              <div className="relative z-10 grid h-10 w-10 place-items-center rounded-full font-bold text-white transition-all duration-300">
                <FormStepper />
                <div className="absolute -bottom-[2rem] w-max text-center">
                  <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-gray-700 antialiased">
                    {STATIC_TEXTS.FORM_STEP2}
                  </h6>
                </div>
              </div>
              <div className="relative z-10 grid h-10 w-10 place-items-center rounded-full font-bold text-gray-900 transition-all duration-300">
                <FormStepper />
                <div className="absolute -bottom-[2rem] w-max text-center">
                  <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-gray-700 antialiased">
                    {STATIC_TEXTS.FORM_STEP3}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-3">
          {formStep === SignUpFormStages.DETAILS ? (
            <Details onNext={handleNext} onPrev={handlePrev} data={formData} />
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
