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

  const addUserToDB = async () => {
    const data = {
      email: formData.email,
      name: formData.name,
      birthdate: formData.birthdate,
      profilePicture: formData.profile,
      interests: formData.interests,
      role: formData.role,
    };

    try {
      const user = await mutation.mutateAsync(data);
      console.log("User created:", user);
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
              await addUserToDB();
              router.push("/");
            })(),
            {
              pending: "Request in progress, please wait...",
              success: "Signup successful! Redirecting...",
              error: "An error occurred during the signup process.",
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
          profile: formData?.profile,
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
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 14C0.75 6.68223 6.68223 0.75 14 0.75C21.3178 0.75 27.25 6.68223 27.25 14C27.25 21.3178 21.3178 27.25 14 27.25C6.68223 27.25 0.75 21.3178 0.75 14Z"
                    fill="white"
                  />
                  <path
                    d="M0.75 14C0.75 6.68223 6.68223 0.75 14 0.75C21.3178 0.75 27.25 6.68223 27.25 14C27.25 21.3178 21.3178 27.25 14 27.25C6.68223 27.25 0.75 21.3178 0.75 14Z"
                    stroke="#4F46E5"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20.3535 9.85403L12.3535 17.854C12.3071 17.9005 12.252 17.9374 12.1913 17.9626C12.1306 17.9877 12.0655 18.0007 11.9998 18.0007C11.9341 18.0007 11.869 17.9877 11.8083 17.9626C11.7476 17.9374 11.6925 17.9005 11.646 17.854L8.14604 14.354C8.05222 14.2602 7.99951 14.133 7.99951 14.0003C7.99951 13.8676 8.05222 13.7403 8.14604 13.6465C8.23986 13.5527 8.36711 13.5 8.49979 13.5C8.63247 13.5 8.75972 13.5527 8.85354 13.6465L11.9998 16.7934L19.646 9.14653C19.7399 9.05271 19.8671 9 19.9998 9C20.1325 9 20.2597 9.05271 20.3535 9.14653C20.4474 9.24035 20.5001 9.3676 20.5001 9.50028C20.5001 9.63296 20.4474 9.76021 20.3535 9.85403Z"
                    fill="#260EB9"
                  />
                </svg>

                <div className="absolute -bottom-[2rem] w-max text-center">
                  <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-gray-700 antialiased">
                    {STATIC_TEXTS.FORM_STEP1}
                  </h6>
                </div>
              </div>
              <div className="relative z-10 grid h-10 w-10 place-items-center rounded-full font-bold text-white transition-all duration-300">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 14C0.75 6.68223 6.68223 0.75 14 0.75C21.3178 0.75 27.25 6.68223 27.25 14C27.25 21.3178 21.3178 27.25 14 27.25C6.68223 27.25 0.75 21.3178 0.75 14Z"
                    fill="white"
                  />
                  <path
                    d="M0.75 14C0.75 6.68223 6.68223 0.75 14 0.75C21.3178 0.75 27.25 6.68223 27.25 14C27.25 21.3178 21.3178 27.25 14 27.25C6.68223 27.25 0.75 21.3178 0.75 14Z"
                    stroke="#4F46E5"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20.3535 9.85403L12.3535 17.854C12.3071 17.9005 12.252 17.9374 12.1913 17.9626C12.1306 17.9877 12.0655 18.0007 11.9998 18.0007C11.9341 18.0007 11.869 17.9877 11.8083 17.9626C11.7476 17.9374 11.6925 17.9005 11.646 17.854L8.14604 14.354C8.05222 14.2602 7.99951 14.133 7.99951 14.0003C7.99951 13.8676 8.05222 13.7403 8.14604 13.6465C8.23986 13.5527 8.36711 13.5 8.49979 13.5C8.63247 13.5 8.75972 13.5527 8.85354 13.6465L11.9998 16.7934L19.646 9.14653C19.7399 9.05271 19.8671 9 19.9998 9C20.1325 9 20.2597 9.05271 20.3535 9.14653C20.4474 9.24035 20.5001 9.3676 20.5001 9.50028C20.5001 9.63296 20.4474 9.76021 20.3535 9.85403Z"
                    fill="#260EB9"
                  />
                </svg>

                <div className="absolute -bottom-[2rem] w-max text-center">
                  <h6 className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-gray-700 antialiased">
                    {STATIC_TEXTS.FORM_STEP2}
                  </h6>
                </div>
              </div>
              <div className="relative z-10 grid h-10 w-10 place-items-center rounded-full font-bold text-gray-900 transition-all duration-300">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 14C0.75 6.68223 6.68223 0.75 14 0.75C21.3178 0.75 27.25 6.68223 27.25 14C27.25 21.3178 21.3178 27.25 14 27.25C6.68223 27.25 0.75 21.3178 0.75 14Z"
                    fill="white"
                  />
                  <path
                    d="M0.75 14C0.75 6.68223 6.68223 0.75 14 0.75C21.3178 0.75 27.25 6.68223 27.25 14C27.25 21.3178 21.3178 27.25 14 27.25C6.68223 27.25 0.75 21.3178 0.75 14Z"
                    stroke="#4F46E5"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20.3535 9.85403L12.3535 17.854C12.3071 17.9005 12.252 17.9374 12.1913 17.9626C12.1306 17.9877 12.0655 18.0007 11.9998 18.0007C11.9341 18.0007 11.869 17.9877 11.8083 17.9626C11.7476 17.9374 11.6925 17.9005 11.646 17.854L8.14604 14.354C8.05222 14.2602 7.99951 14.133 7.99951 14.0003C7.99951 13.8676 8.05222 13.7403 8.14604 13.6465C8.23986 13.5527 8.36711 13.5 8.49979 13.5C8.63247 13.5 8.75972 13.5527 8.85354 13.6465L11.9998 16.7934L19.646 9.14653C19.7399 9.05271 19.8671 9 19.9998 9C20.1325 9 20.2597 9.05271 20.3535 9.14653C20.4474 9.24035 20.5001 9.3676 20.5001 9.50028C20.5001 9.63296 20.4474 9.76021 20.3535 9.85403Z"
                    fill="#260EB9"
                  />
                </svg>

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
            <Details onNext={handleNext} />
          ) : null}

          {formStep === SignUpFormStages.INTEREST ? (
            <Interests onNext={handleNext} />
          ) : null}

          {formStep === SignUpFormStages.ROLE ? (
            <Role onNext={handleNext} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
