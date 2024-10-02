"use client";
import { useState, KeyboardEvent, ChangeEvent, FocusEvent } from "react";
import React, { useRef } from "react";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { trpc } from "~/server/client";
import { toast } from "react-toastify";
import {
  useContentFormDetails,
  useContentFormInterest,
  useContentFormRole,
} from "~/app/_utils/Hooks/useContentForm";
import { Controller } from "react-hook-form";
import {
  CalendarSVG,
  EmailSVG,
  PasswordSVG,
  UploadSVG,
} from "~/assets/svg/svg";

export default function Page() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!e || !e.key || e.target) return;

    if (
      !/^[0-9]{1}$/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !e.metaKey
    ) {
      e.preventDefault();
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      const index = inputRefs.current.indexOf(e.target);
      if (index > 0) {
        setOtp((prevOtp) => [
          ...prevOtp.slice(0, index - 1),
          "",
          ...prevOtp.slice(index),
        ]);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const index = inputRefs.current.indexOf(target);
    if (target.value) {
      setOtp((prevOtp) => [
        ...prevOtp.slice(0, index),
        target.value,
        ...prevOtp.slice(index + 1),
      ]);
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const interestsIndex = [
    "Animals",
    "Art",
    "Books",
    "Comedy",
    "Culture",
    "Education",
    "Food",
    "Health",
    "History",
    "Music",
    "Nature",
    "News",
    "Politics",
    "Science",
    "Sports",
    "Technology",
    "Travel",
    "TV",
    "Video Games",
  ];
  const information = [
    {
      title: " Turn Your writings into a Legacy",
      desc: "Write, sell, or buy poems with complete ownership and make your words last forever.",
      role: "A",
    },
    {
      title: "A Place Where Every Poem is Valued",
      desc: "Join a community where you can share, sell, or invest in poetry that touches hearts.",
      role: "B",
    },
    {
      title: "Buy and Sell Poetry Easily",
      desc: "Support poets or own a poem—trade poetry with ease and make it a valuable asset.",
      role: "C",
    },
  ];

  const {
    register: registerDetails,
    handleSubmit: handleSubmitDetails,
    trigger: triggerDetails,
    control: controlDetails,
    getValues: getValuesDetails,
    watch: watchDetails,
    setValue: setValueDetails,
  } = useContentFormDetails();

  const {
    register: registerInterest,
    handleSubmit: handleSubmitInterest,
    trigger: triggerInterest,
    getValues: getValuesInterest,
    watch: watchInterest,
    setValue: setValueInterest,
    control: controlInterest,
  } = useContentFormInterest();

  const {
    register: registerRole,
    handleSubmit: handleSubmitRole,
    trigger: triggerRole,
    getValues: getValuesRole,
    watch: watchRoles,
    setValue: setValueRole,
    control: controlRole,
  } = useContentFormRole();

  const router = useRouter();

  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);

  const { isLoaded, signUp, setActive } = useSignUp();

  const [verifying, setVerifying] = useState(false);
  const mutation = trpc.user.addUser.useMutation();

  const toggleInterest = (interest: String) => {
    const currentInterests = getValuesInterest("interests");
    if (currentInterests.includes(interest)) {
      setValueInterest(
        "interests",
        currentInterests.filter((item: String) => item !== interest),
      );
    } else {
      setValueInterest("interests", [...currentInterests, interest]);
    }
  };

  const handleNext = async (e: React.FormEvent) => {
    if (formNo === 1) {
      const isValid = await triggerDetails();
      if (isValid && formNo !== undefined) setFormNo(formNo + 1);
    } else if (formNo === 2) {
      const isValid = await triggerInterest();
      if (isValid && formNo !== undefined) setFormNo(formNo + 1);
    } else if (formNo === 3) {
      const isValid = await triggerRole();
      if (isValid && formNo !== undefined) finalSubmit();
    }
  };

  const addUserToDB = async () => {
    const data = {
      email: getValuesDetails("email"),
      name: getValuesDetails("name"),
      birthdate: new Date(getValuesDetails("birthdate")).toISOString(),
      profilePicture: "",
      interests: getValuesInterest("interests"),
      role: getValuesRole("role"),
    };
    console.log("Data:", data);

    try {
      const user = await mutation.mutateAsync(data);
      console.log("User created:", user);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const finalSubmit = async () => {
    if (!isLoaded) return;

    let emailAddress = getValuesDetails("email");
    let password = getValuesDetails("password");

    try {
      await signUp.create({
        emailAddress,
        password,
        unsafeMetadata: {
          name: getValuesDetails("name"),
          birthdate: getValuesDetails("birthdate"),
          interests: getValuesInterest("interests"),
        },
      });

      // Send the user an email with the verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    let code = otp.join("");
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        try {
          toast.promise(
            (async () => {
              await setActive({ session: signUpAttempt.createdSessionId });
              await addUserToDB();
              router.push("/"); // Redirect after successful registration
            })(),
            {
              pending: "Request in progress, please wait...", // Message while the promise is pending
              success: "Signup successful! Redirecting...", // Message on success
              error: "An error occurred during the signup process.", // Message on error
            },
          );
        } catch (error) {
          console.error("Error during the signup process:", error);
        }
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  if (verifying) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-brand-secondary py-3">
        <h1 className="mb-4 mt-4 text-4xl font-semibold text-font-primary">
          Verify your email
        </h1>
        <div className="flex h-[450px] w-full max-w-2xl flex-col items-center gap-y-12 rounded-lg bg-white px-6 py-2 md:aspect-auto">
          <div className="my-3 flex h-full w-full flex-col items-center justify-center gap-3">
            <form
              onSubmit={handleVerify}
              className="flex flex-col items-center justify-center"
            >
              <label
                id="code"
                className="mb-2 block text-base font-bold text-font-gray"
              >
                Enter your verification code
              </label>
              <p className="mb-4 text-sm font-light">
                Please enter the 6 digit code we sent to your email address
              </p>
              <div className="mb-6 flex gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="shadow-xs border-stroke text-gray-5 dark:border-dark-3 flex w-[64px] items-center justify-center rounded-lg border bg-white p-2 text-center text-2xl font-medium outline-none sm:text-4xl dark:bg-white/5"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-1/2 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-brand-secondary py-3">
      <h1 className="mb-4 mt-4 text-4xl font-semibold text-font-primary">
        Let's get started
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
                    Create Profile
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
                    Add Interests
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
                    Ready To Go
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-3">
          {formNo === 1 && (
            <form onSubmit={handleSubmitDetails(handleNext)} className="w-full">
              <div className="w-full px-10">
                <div className="mb-3 flex flex-col">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-base font-bold text-font-gray"
                  >
                    Your name
                  </label>

                  <Controller
                    control={controlDetails}
                    name="name"
                    render={({ field, fieldState }) => (
                      <div className="relative flex">
                        <input
                          {...registerDetails("name", { required: true })}
                          type="text"
                          id="name"
                          className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                          placeholder="Write your name"
                        />
                        {fieldState.error && (
                          <span className="absolute right-0 top-2/3 mb-3 mt-1 text-red-500">
                            {fieldState.error.message}
                          </span>
                        )}
                        <span className="absolute right-0 top-2 inline-flex items-center rounded-s-md px-3 text-sm text-gray-900">
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96451 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM6.945 18.5156C7.48757 17.6671 8.23501 16.9688 9.11843 16.4851C10.0019 16.0013 10.9928 15.7478 12 15.7478C13.0072 15.7478 13.9982 16.0013 14.8816 16.4851C15.765 16.9688 16.5124 17.6671 17.055 18.5156C15.6097 19.6397 13.831 20.2499 12 20.2499C10.169 20.2499 8.39032 19.6397 6.945 18.5156ZM9 11.25C9 10.6567 9.17595 10.0766 9.5056 9.58329C9.83524 9.08994 10.3038 8.70542 10.852 8.47836C11.4001 8.2513 12.0033 8.19189 12.5853 8.30764C13.1672 8.4234 13.7018 8.70912 14.1213 9.12868C14.5409 9.54824 14.8266 10.0828 14.9424 10.6647C15.0581 11.2467 14.9987 11.8499 14.7716 12.3981C14.5446 12.9462 14.1601 13.4148 13.6667 13.7444C13.1734 14.0741 12.5933 14.25 12 14.25C11.2044 14.25 10.4413 13.9339 9.87868 13.3713C9.31607 12.8087 9 12.0456 9 11.25ZM18.165 17.4759C17.3285 16.2638 16.1524 15.3261 14.7844 14.7806C15.5192 14.2019 16.0554 13.4085 16.3184 12.5108C16.5815 11.6132 16.5582 10.6559 16.252 9.77207C15.9457 8.88825 15.3716 8.12183 14.6096 7.5794C13.8475 7.03696 12.9354 6.74548 12 6.74548C11.0646 6.74548 10.1525 7.03696 9.39044 7.5794C8.62839 8.12183 8.05432 8.88825 7.74805 9.77207C7.44179 10.6559 7.41855 11.6132 7.68157 12.5108C7.94459 13.4085 8.4808 14.2019 9.21563 14.7806C7.84765 15.3261 6.67147 16.2638 5.835 17.4759C4.77804 16.2873 4.0872 14.8185 3.84567 13.2464C3.60415 11.6743 3.82224 10.0658 4.47368 8.61478C5.12512 7.16372 6.18213 5.93192 7.51745 5.06769C8.85276 4.20346 10.4094 3.74367 12 3.74367C13.5906 3.74367 15.1473 4.20346 16.4826 5.06769C17.8179 5.93192 18.8749 7.16372 19.5263 8.61478C20.1778 10.0658 20.3959 11.6743 20.1543 13.2464C19.9128 14.8185 19.222 16.2873 18.165 17.4759Z"
                              fill="#4D5565"
                            />
                          </svg>
                        </span>
                      </div>
                    )}
                  />
                  <label
                    htmlFor="password"
                    className="mb-2 block text-base font-bold text-font-gray"
                  >
                    Password
                  </label>
                  <Controller
                    control={controlDetails}
                    name="password"
                    render={({ field, fieldState }) => (
                      <div className="relative flex">
                        <input
                          {...field}
                          type="password"
                          id="password"
                          className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                          placeholder="Enter password"
                        />
                        {fieldState.error && (
                          <span className="absolute right-0 top-2/3 mb-3 mt-1 text-red-500">
                            {fieldState.error.message}
                          </span>
                        )}
                        <span className="absolute right-0 top-2 inline-flex items-center rounded-s-md px-3 text-sm text-gray-900">
                          <PasswordSVG />
                        </span>
                      </div>
                    )}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-base font-bold text-font-gray"
                  >
                    Confirm Password
                  </label>
                  <Controller
                    control={controlDetails}
                    name="confirmPassword"
                    render={({ field, fieldState }) => (
                      <div className="relative flex">
                        <input
                          {...field}
                          type="password"
                          id="confirmPassword"
                          className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                          placeholder="Enter password"
                        />
                        {fieldState.error && (
                          <span className="absolute right-0 top-2/3 mb-3 mt-1 text-red-500">
                            {fieldState.error.message}
                          </span>
                        )}
                        <span className="absolute right-0 top-2 inline-flex items-center rounded-s-md px-3 text-sm text-gray-900">
                          <PasswordSVG />
                        </span>
                      </div>
                    )}
                  />

                  <label
                    htmlFor="email"
                    className="mb-2 block text-base font-bold text-font-gray"
                  >
                    Your email
                  </label>
                  <Controller
                    control={controlDetails}
                    name="email"
                    render={({ field, fieldState }) => (
                      <div className="relative flex">
                        <input
                          type="email"
                          {...registerDetails("email", { required: true })}
                          id="email"
                          className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                          placeholder="Enter your email"
                        />
                        {fieldState.error && (
                          <span className="absolute right-0 top-2/3 mb-3 mt-1 text-red-500">
                            {fieldState.error.message}
                          </span>
                        )}
                        <span className="absolute right-0 top-2 inline-flex items-center rounded-s-md px-3 text-sm text-gray-900">
                          <EmailSVG />
                        </span>
                      </div>
                    )}
                  />

                  <label
                    htmlFor="birthdate"
                    className="mb-2 block text-base font-bold text-font-gray"
                  >
                    Your birthdate
                  </label>
                  <Controller
                    control={controlDetails}
                    name="birthdate"
                    render={({ field, fieldState }) => (
                      <div className="relative flex">
                        <input
                          type="date"
                          {...registerDetails("birthdate", { required: true })}
                          id="birthdate"
                          className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                          placeholder="Enter your birthdate"
                        />
                        {fieldState.error && (
                          <span className="absolute right-0 top-2/3 mb-3 mt-1 text-red-500">
                            {fieldState.error.message}
                          </span>
                        )}
                        <span className="absolute right-0 top-2 inline-flex items-center rounded-s-md px-3 text-sm text-gray-900">
                          <CalendarSVG />
                        </span>
                      </div>
                    )}
                  />

                  <label
                    htmlFor="profile"
                    className="mb-2 block text-base font-bold text-font-gray"
                  >
                    Your profile picture
                  </label>
                  <div className="relative flex flex-col items-start justify-center">
                    <input
                      type="file"
                      id="profile"
                      {...registerDetails("profile", {
                        required: "Profile picture is required",
                      })} // Validation for profile picture
                      className="hidden" // Hides the actual input
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setValueDetails("profile", e.target.files[0]);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("profile")?.click()
                      }
                    >
                      <UploadSVG />
                    </button>
                    {watchDetails("profile") && (
                      <div className="text-font-primary">
                        {(watchDetails("profile") as unknown as File)?.name}
                      </div>
                    )}
                    <svg
                      width="190"
                      height="2"
                      viewBox="0 0 190 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="my-4"
                    >
                      <path d="M0 1H190" stroke="#E0DEE6" />
                    </svg>
                    <button
                      type="button"
                      className="mb-4 ml-3 border-b border-b-brand-primary text-brand-primary"
                    >
                      <h1>Choose from avatars</h1>
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="submit"
                      className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {formNo === 2 && (
            <form
              onSubmit={handleSubmitInterest(handleNext)}
              className="w-full"
            >
              <div className="w-full px-10">
                <div className="mb-3 flex flex-col">
                  <h1 className="text-3xl font-medium text-font-primary">
                    What are your interests?
                  </h1>
                  <h1 className="text-lg font-medium text-font-secondary">
                    We will use this to help customize the experience
                  </h1>
                  <div className="relative mb-[200px] mt-6 flex h-auto w-full flex-wrap gap-2">
                    <Controller
                      name="interests"
                      control={controlInterest}
                      defaultValue={[]}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <>
                          {interestsIndex.map((interest) => (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => {
                                const newValue = value.includes(interest)
                                  ? value.filter((item) => item !== interest)
                                  : [...value, interest];
                                onChange(newValue);
                              }}
                              className={`pill inline-block rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-800 ${
                                value.includes(interest)
                                  ? "border border-brand-primary bg-[#fafbff] text-brand-primary"
                                  : "bg-gray-100 text-font-primary"
                              }`}
                            >
                              {interest} {value.includes(interest) && "✕"}
                            </button>
                          ))}
                          {fieldState.error && (
                            <span className="absolute -bottom-20 -right-10 text-red-500">
                              {fieldState.error.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="submit" // Use type="submit" for form submission
                      className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {formNo === 3 && (
            <form onSubmit={handleSubmitRole(handleNext)} className="w-full">
              <div className="w-full px-10">
                <div className="relative mb-3 flex flex-col gap-2">
                  <h1 className="text-3xl font-medium text-font-primary">
                    You are ready to go!
                  </h1>
                  <h1 className="mb-4 text-lg font-medium text-font-secondary">
                    We hope that you will have a wonderful time at Kalamanch.
                  </h1>

                  <Controller
                    name="role"
                    control={controlRole}
                    rules={{ required: "Please select a role" }}
                    render={({ field, fieldState }) => (
                      <>
                        {information.map((info) => (
                          <div
                            key={info.role}
                            className="mb-2 flex h-20 w-full cursor-pointer gap-6"
                            onClick={() => field.onChange(info.role)}
                          >
                            <div
                              className={`flex w-1/12 items-center justify-start`}
                            >
                              <span
                                className={`block h-14 w-14 rounded-full ${
                                  field.value === info.role
                                    ? "bg-brand-primary"
                                    : "bg-brand-secondary"
                                }`}
                              ></span>
                            </div>

                            <div className="flex w-11/12 flex-col items-start justify-start">
                              <h1 className="text-lg font-semibold text-font-primary">
                                {info.title}
                              </h1>
                              <h1 className="text-base text-font-secondary">
                                {info.desc}
                              </h1>
                            </div>
                          </div>
                        ))}
                        {fieldState.error && (
                          <span className="absolute -right-10 top-0 text-red-500">
                            {fieldState.error.message}
                          </span>
                        )}
                      </>
                    )}
                  />

                  <div className="mt-8 flex items-center justify-center">
                    <button
                      type="submit"
                      className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
