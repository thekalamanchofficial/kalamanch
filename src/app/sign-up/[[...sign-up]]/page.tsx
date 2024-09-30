"use client";
import { useState, KeyboardEvent, ChangeEvent, FocusEvent } from "react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useSignUp } from "@clerk/nextjs";

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
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm();

  const router = useRouter();

  const toggleInterest = (interest: String) => {
    const currentInterests = getValues("interests");
    if (currentInterests.includes(interest)) {
      setValue(
        "interests",
        currentInterests.filter((item: String) => item !== interest),
      );
    } else {
      setValue("interests", [...currentInterests, interest]);
    }
  };

  const onSubmit = (data: object) => {
    finalSubmit();
  };

  const next = () => {
    const formData = getValues();
    if (formNo === 1 && formData.name && formData.email && formData.birthdate) {
      setFormNo(formNo + 1);
    } else if (formNo === 2 && formData.interests.length > 0) {
      setFormNo(formNo + 1);
    } else if (formNo === 3) {
      // finalSubmit();
    } else {
      alert("Fill the form properly");
    }
  };

  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);

  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);

  const finalSubmit = async () => {
    if (!isLoaded) return;

    let emailAddress = getValues("email");
    let password = getValues("password");

    try {
      await signUp.create({
        emailAddress,
        password,
        unsafeMetadata: {
          name: getValues("name"),
          birthdate: getValues("birthdate"),
          interests: getValues("interests"),
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
    if (!isLoaded) return;
    let code = otp.join("");
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push("/");
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
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {formNo === 1 && (
              <div className="w-full px-10">
                <div className="mb-3 flex flex-col">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-base font-bold text-font-gray"
                  >
                    Your name
                  </label>
                  <div className="relative flex">
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      id="name"
                      className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                      placeholder="Write your name"
                    />{" "}
                    {errors.name && <span>This field is required</span>}
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
                  <label
                    htmlFor="password"
                    className="mb-2 block text-base font-bold text-font-gray"
                  >
                    Password
                  </label>
                  <div className="relative flex">
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      id="password"
                      className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                      placeholder="Enter password"
                    />{" "}
                    {errors.password && <span>This field is required</span>}
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
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-base font-bold text-font-gray"
                  >
                    Confirm Password
                  </label>
                  <div className="relative flex">
                    <input
                      {...register("confirm-password", { required: true })}
                      type="password"
                      id="confirm-password"
                      className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                      placeholder="Enter password"
                    />
                    {errors.confirmPassword && (
                      <span>This field is required</span>
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
                  <label
                    htmlFor="mail"
                    className="mb-2 block text-base font-bold text-font-gray"
                  >
                    Your email
                  </label>
                  <div className="relative flex">
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      id="email"
                      className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                      placeholder="Enter your email"
                    />
                    {errors.email && <span>This field is required</span>}
                    <span className="absolute right-0 top-2 inline-flex items-center rounded-s-md px-3 text-sm text-gray-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="_1-Email"
                        data-name="1-Email"
                        width="30"
                        height="30"
                        viewBox="0 0 32 32"
                      >
                        <title>1-Email</title>
                        <path
                          d="M29,4H3A3,3,0,0,0,0,7V25a3,3,0,0,0,3,3H29a3,3,0,0,0,3-3V7A3,3,0,0,0,29,4Zm-.72,2L16,14.77,3.72,6ZM30,25a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V7.23l13.42,9.58a1,1,0,0,0,1.16,0L30,7.23Z"
                          fill="#4d5565"
                        />
                      </svg>
                    </span>
                  </div>

                  <label
                    htmlFor="birthdate"
                    className="mb-2 block text-base font-bold text-font-gray"
                  >
                    Your birthdate
                  </label>
                  <div className="relative flex">
                    <input
                      type="date"
                      {...register("birthdate", { required: true })}
                      id="birthdate"
                      className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                      placeholder="Enter your birthdate"
                    />
                    {errors.birthdate && <span>This field is required</span>}
                    <span className="absolute right-0 top-2 inline-flex items-center rounded-s-md px-3 text-sm text-gray-900">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.5 3H17.25V2.25C17.25 2.05109 17.171 1.86032 17.0303 1.71967C16.8897 1.57902 16.6989 1.5 16.5 1.5C16.3011 1.5 16.1103 1.57902 15.9697 1.71967C15.829 1.86032 15.75 2.05109 15.75 2.25V3H8.25V2.25C8.25 2.05109 8.17098 1.86032 8.03033 1.71967C7.88968 1.57902 7.69891 1.5 7.5 1.5C7.30109 1.5 7.11032 1.57902 6.96967 1.71967C6.82902 1.86032 6.75 2.05109 6.75 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM6.75 4.5V5.25C6.75 5.44891 6.82902 5.63968 6.96967 5.78033C7.11032 5.92098 7.30109 6 7.5 6C7.69891 6 7.88968 5.92098 8.03033 5.78033C8.17098 5.63968 8.25 5.44891 8.25 5.25V4.5H15.75V5.25C15.75 5.44891 15.829 5.63968 15.9697 5.78033C16.1103 5.92098 16.3011 6 16.5 6C16.6989 6 16.8897 5.92098 17.0303 5.78033C17.171 5.63968 17.25 5.44891 17.25 5.25V4.5H19.5V7.5H4.5V4.5H6.75ZM19.5 19.5H4.5V9H19.5V19.5Z"
                          fill="#4D5565"
                        />
                      </svg>
                    </span>
                  </div>
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
                      {...register("profile", {
                        required: "Profile picture is required",
                      })} // Validation for profile picture
                      className="hidden" // Hides the actual input
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setValue("profile", e.target.files[0]);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("profile")?.click()
                      }
                    >
                      <svg
                        width="194"
                        height="107"
                        viewBox="0 0 194 107"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.25 8C0.25 3.71979 3.71979 0.25 8 0.25H186C190.28 0.25 193.75 3.71979 193.75 8V99C193.75 103.28 190.28 106.75 186 106.75H8C3.71979 106.75 0.25 103.28 0.25 99V8Z"
                          fill="#F5F7FE"
                        />
                        <path
                          d="M0.25 8C0.25 3.71979 3.71979 0.25 8 0.25H186C190.28 0.25 193.75 3.71979 193.75 8V99C193.75 103.28 190.28 106.75 186 106.75H8C3.71979 106.75 0.25 103.28 0.25 99V8Z"
                          stroke="#260EB9"
                          strokeWidth="0.5"
                        />
                        <path
                          d="M104.5 24C104.5 23.6022 104.658 23.2207 104.939 22.9394C105.22 22.6581 105.602 22.5 106 22.5H109V19.5C109 19.1022 109.158 18.7207 109.439 18.4394C109.72 18.1581 110.102 18 110.5 18C110.898 18 111.279 18.1581 111.56 18.4394C111.842 18.7207 112 19.1022 112 19.5V22.5H115C115.398 22.5 115.779 22.6581 116.06 22.9394C116.342 23.2207 116.5 23.6022 116.5 24C116.5 24.3978 116.342 24.7794 116.06 25.0607C115.779 25.342 115.398 25.5 115 25.5H112V28.5C112 28.8978 111.842 29.2794 111.56 29.5607C111.279 29.842 110.898 30 110.5 30C110.102 30 109.72 29.842 109.439 29.5607C109.158 29.2794 109 28.8978 109 28.5V25.5H106C105.602 25.5 105.22 25.342 104.939 25.0607C104.658 24.7794 104.5 24.3978 104.5 24ZM116.23 34.2525C116.915 38.3261 116.288 42.512 114.439 46.206C112.59 49.8999 109.615 52.9107 105.944 54.8037C102.272 56.6966 98.0943 57.3738 94.0128 56.7374C89.9314 56.101 86.1577 54.1839 83.2368 51.263C80.3159 48.3421 78.3989 44.5685 77.7624 40.487C77.126 36.4055 77.8032 32.2274 79.6962 28.5559C81.5891 24.8844 84.5999 21.9094 88.2939 20.0606C91.9878 18.2118 96.1738 17.5847 100.247 18.27C100.637 18.3389 100.983 18.5587 101.211 18.8817C101.439 19.2046 101.531 19.6046 101.466 19.9946C101.4 20.3846 101.184 20.7331 100.863 20.9642C100.542 21.1953 100.143 21.2904 99.7523 21.2288C97.3863 20.8308 94.962 20.9531 92.6481 21.5873C90.3342 22.2215 88.1862 23.3523 86.3538 24.901C84.5213 26.4497 83.0484 28.3791 82.0374 30.5549C81.0264 32.7308 80.5017 35.1008 80.4998 37.5C80.4963 41.5391 81.9808 45.438 84.6698 48.4519C86.3427 46.0277 88.6951 44.1522 91.4311 43.0613C89.9614 41.9037 88.889 40.317 88.3629 38.5217C87.8369 36.7264 87.8834 34.8118 88.4959 33.0442C89.1084 31.2765 90.2566 29.7437 91.7807 28.6588C93.3048 27.5739 95.129 26.991 96.9998 26.991C98.8706 26.991 100.695 27.5739 102.219 28.6588C103.743 29.7437 104.891 31.2765 105.504 33.0442C106.116 34.8118 106.163 36.7264 105.637 38.5217C105.111 40.317 104.038 41.9037 102.569 43.0613C105.305 44.1522 107.657 46.0277 109.33 48.4519C112.019 45.438 113.503 41.5391 113.5 37.5C113.5 36.5778 113.423 35.6571 113.271 34.7475C113.237 34.5524 113.241 34.3524 113.284 34.159C113.328 33.9656 113.409 33.7827 113.523 33.6209C113.637 33.459 113.783 33.3214 113.95 33.216C114.118 33.1107 114.305 33.0396 114.501 33.0069C114.696 32.9742 114.896 32.9805 115.089 33.0256C115.282 33.0706 115.464 33.1534 115.625 33.2692C115.786 33.385 115.922 33.5316 116.026 33.7003C116.13 33.8691 116.199 34.0568 116.23 34.2525ZM96.9998 42C98.1865 42 99.3465 41.6481 100.333 40.9888C101.32 40.3295 102.089 39.3925 102.543 38.2961C102.997 37.1998 103.116 35.9934 102.885 34.8295C102.653 33.6656 102.082 32.5965 101.242 31.7574C100.403 30.9183 99.3342 30.3468 98.1703 30.1153C97.0065 29.8838 95.8001 30.0026 94.7037 30.4567C93.6073 30.9109 92.6703 31.6799 92.011 32.6666C91.3517 33.6533 90.9998 34.8133 90.9998 36C90.9998 37.5913 91.6319 39.1174 92.7572 40.2427C93.8824 41.3679 95.4085 42 96.9998 42ZM96.9998 54C100.662 54.0037 104.221 52.7827 107.11 50.5313C106.025 48.8342 104.53 47.4375 102.763 46.4701C100.996 45.5027 99.0142 44.9956 96.9998 44.9956C94.9854 44.9956 93.0035 45.5027 91.2367 46.4701C89.4698 47.4375 87.9749 48.8342 86.8898 50.5313C89.7786 52.7827 93.3373 54.0037 96.9998 54Z"
                          fill="#260EB9"
                        />
                        <path
                          d="M37.942 86.668C37.186 86.668 36.514 86.5093 35.926 86.192C35.3473 85.8747 34.8947 85.4407 34.568 84.89C34.2507 84.33 34.092 83.6953 34.092 82.986V76.07H35.478V82.958C35.478 83.434 35.5807 83.8587 35.786 84.232C36.0007 84.596 36.29 84.8807 36.654 85.086C37.0273 85.2913 37.4567 85.394 37.942 85.394C38.4273 85.394 38.852 85.2913 39.216 85.086C39.5893 84.8807 39.8787 84.596 40.084 84.232C40.2987 83.8587 40.406 83.434 40.406 82.958V76.07H41.792V82.986C41.792 83.6953 41.6287 84.33 41.302 84.89C40.9847 85.4407 40.5367 85.8747 39.958 86.192C39.3793 86.5093 38.7073 86.668 37.942 86.668ZM43.8928 89.3V78.954H45.1668V80.578L44.9988 80.256C45.2788 79.808 45.6614 79.4533 46.1468 79.192C46.6321 78.9213 47.1874 78.786 47.8128 78.786C48.5221 78.786 49.1568 78.9587 49.7168 79.304C50.2861 79.6493 50.7341 80.1207 51.0608 80.718C51.3874 81.306 51.5508 81.978 51.5508 82.734C51.5508 83.4713 51.3874 84.1387 51.0608 84.736C50.7341 85.3333 50.2861 85.8047 49.7168 86.15C49.1568 86.4953 48.5174 86.668 47.7988 86.668C47.1921 86.668 46.6368 86.5327 46.1328 86.262C45.6381 85.9913 45.2554 85.6087 44.9848 85.114L45.1948 84.89V89.3H43.8928ZM47.7008 85.408C48.1768 85.408 48.6014 85.2913 48.9748 85.058C49.3481 84.8247 49.6374 84.5073 49.8428 84.106C50.0574 83.6953 50.1648 83.238 50.1648 82.734C50.1648 82.2113 50.0574 81.754 49.8428 81.362C49.6374 80.9607 49.3481 80.6433 48.9748 80.41C48.6014 80.1673 48.1768 80.046 47.7008 80.046C47.2248 80.046 46.7954 80.1627 46.4128 80.396C46.0394 80.6293 45.7408 80.9513 45.5168 81.362C45.3021 81.7633 45.1948 82.2207 45.1948 82.734C45.1948 83.238 45.3021 83.6953 45.5168 84.106C45.7408 84.5073 46.0394 84.8247 46.4128 85.058C46.7954 85.2913 47.2248 85.408 47.7008 85.408ZM53.258 86.5V75.902H54.56V86.5H53.258ZM60.1643 86.668C59.4363 86.668 58.7783 86.5 58.1903 86.164C57.6023 85.8187 57.1356 85.3473 56.7903 84.75C56.4449 84.1527 56.2723 83.476 56.2723 82.72C56.2723 81.964 56.4403 81.292 56.7763 80.704C57.1216 80.116 57.5883 79.6493 58.1763 79.304C58.7643 78.9587 59.4269 78.786 60.1643 78.786C60.8923 78.786 61.5503 78.9587 62.1383 79.304C62.7263 79.64 63.1883 80.102 63.5243 80.69C63.8696 81.278 64.0423 81.9547 64.0423 82.72C64.0423 83.4853 63.8649 84.1667 63.5103 84.764C63.1556 85.352 62.6843 85.8187 62.0963 86.164C61.5176 86.5 60.8736 86.668 60.1643 86.668ZM60.1643 85.408C60.6309 85.408 61.0509 85.2913 61.4243 85.058C61.8069 84.8247 62.1056 84.5027 62.3203 84.092C62.5443 83.6813 62.6563 83.224 62.6563 82.72C62.6563 82.2067 62.5443 81.754 62.3203 81.362C62.1056 80.9607 61.8069 80.6433 61.4243 80.41C61.0509 80.1673 60.6309 80.046 60.1643 80.046C59.6883 80.046 59.2589 80.1673 58.8763 80.41C58.5029 80.6433 58.2043 80.9607 57.9803 81.362C57.7563 81.754 57.6443 82.2067 57.6443 82.72C57.6443 83.224 57.7563 83.6813 57.9803 84.092C58.2043 84.5027 58.5029 84.8247 58.8763 85.058C59.2589 85.2913 59.6883 85.408 60.1643 85.408ZM67.9524 86.668C67.4578 86.668 67.0191 86.5793 66.6364 86.402C66.2631 86.2153 65.9691 85.9633 65.7544 85.646C65.5398 85.3193 65.4324 84.946 65.4324 84.526C65.4324 84.1247 65.5164 83.7653 65.6844 83.448C65.8618 83.1213 66.1324 82.846 66.4964 82.622C66.8698 82.398 67.3364 82.2393 67.8964 82.146L70.6964 81.684V82.776L68.1904 83.196C67.7051 83.28 67.3504 83.434 67.1264 83.658C66.9118 83.882 66.8044 84.1573 66.8044 84.484C66.8044 84.792 66.9258 85.0487 67.1684 85.254C67.4204 85.4593 67.7331 85.562 68.1064 85.562C68.5824 85.562 68.9931 85.464 69.3384 85.268C69.6931 85.0627 69.9684 84.7873 70.1644 84.442C70.3698 84.0967 70.4724 83.714 70.4724 83.294V81.376C70.4724 80.9653 70.3184 80.634 70.0104 80.382C69.7118 80.1207 69.3151 79.99 68.8204 79.99C68.3911 79.99 68.0084 80.102 67.6724 80.326C67.3458 80.5407 67.1031 80.83 66.9444 81.194L65.8104 80.606C65.9504 80.2607 66.1744 79.9527 66.4824 79.682C66.7904 79.402 67.1498 79.1827 67.5604 79.024C67.9711 78.8653 68.4004 78.786 68.8484 78.786C69.4271 78.786 69.9358 78.898 70.3744 79.122C70.8131 79.3367 71.1538 79.64 71.3964 80.032C71.6484 80.4147 71.7744 80.8627 71.7744 81.376V86.5H70.5004V85.072L70.7384 85.156C70.5798 85.4547 70.3651 85.716 70.0944 85.94C69.8238 86.164 69.5064 86.3413 69.1424 86.472C68.7784 86.6027 68.3818 86.668 67.9524 86.668ZM77.2232 86.668C76.5138 86.668 75.8745 86.4953 75.3052 86.15C74.7452 85.8047 74.3018 85.3333 73.9752 84.736C73.6485 84.1387 73.4852 83.4713 73.4852 82.734C73.4852 81.978 73.6485 81.306 73.9752 80.718C74.3018 80.1207 74.7452 79.6493 75.3052 79.304C75.8745 78.9587 76.5138 78.786 77.2232 78.786C77.8485 78.786 78.4038 78.9213 78.8892 79.192C79.3745 79.4533 79.7572 79.808 80.0372 80.256L79.8272 80.578V75.902H81.1432V86.5H79.8692V84.89L80.0372 85.114C79.7758 85.6087 79.3932 85.9913 78.8892 86.262C78.3945 86.5327 77.8392 86.668 77.2232 86.668ZM77.3352 85.408C77.8112 85.408 78.2358 85.2913 78.6092 85.058C78.9825 84.8247 79.2765 84.5073 79.4912 84.106C79.7152 83.6953 79.8272 83.238 79.8272 82.734C79.8272 82.2207 79.7152 81.7633 79.4912 81.362C79.2765 80.9513 78.9825 80.6293 78.6092 80.396C78.2358 80.1627 77.8112 80.046 77.3352 80.046C76.8685 80.046 76.4438 80.1673 76.0612 80.41C75.6878 80.6433 75.3938 80.9607 75.1792 81.362C74.9645 81.754 74.8572 82.2113 74.8572 82.734C74.8572 83.238 74.9645 83.6953 75.1792 84.106C75.3938 84.5073 75.6878 84.8247 76.0612 85.058C76.4345 85.2913 76.8592 85.408 77.3352 85.408ZM85.9843 89.58C85.8163 89.58 85.6483 89.566 85.4803 89.538C85.3123 89.51 85.1536 89.4633 85.0043 89.398V88.236C85.107 88.2547 85.233 88.2733 85.3823 88.292C85.541 88.32 85.695 88.334 85.8443 88.334C86.283 88.334 86.6143 88.236 86.8383 88.04C87.0716 87.8533 87.291 87.5267 87.4963 87.06L87.9723 85.926L87.9443 87.06L84.7243 78.954H86.1383L88.6443 85.394H88.2243L90.7163 78.954H92.1583L88.7563 87.396C88.5976 87.7973 88.3923 88.1613 88.1403 88.488C87.8976 88.824 87.599 89.09 87.2443 89.286C86.8896 89.482 86.4696 89.58 85.9843 89.58ZM96.7639 86.668C96.0359 86.668 95.3779 86.5 94.7899 86.164C94.2019 85.8187 93.7352 85.3473 93.3899 84.75C93.0445 84.1527 92.8719 83.476 92.8719 82.72C92.8719 81.964 93.0399 81.292 93.3759 80.704C93.7212 80.116 94.1879 79.6493 94.7759 79.304C95.3639 78.9587 96.0265 78.786 96.7639 78.786C97.4919 78.786 98.1499 78.9587 98.7379 79.304C99.3259 79.64 99.7879 80.102 100.124 80.69C100.469 81.278 100.642 81.9547 100.642 82.72C100.642 83.4853 100.465 84.1667 100.11 84.764C99.7552 85.352 99.2839 85.8187 98.6959 86.164C98.1172 86.5 97.4732 86.668 96.7639 86.668ZM96.7639 85.408C97.2305 85.408 97.6505 85.2913 98.0239 85.058C98.4065 84.8247 98.7052 84.5027 98.9199 84.092C99.1439 83.6813 99.2559 83.224 99.2559 82.72C99.2559 82.2067 99.1439 81.754 98.9199 81.362C98.7052 80.9607 98.4065 80.6433 98.0239 80.41C97.6505 80.1673 97.2305 80.046 96.7639 80.046C96.2879 80.046 95.8585 80.1673 95.4759 80.41C95.1025 80.6433 94.8039 80.9607 94.5799 81.362C94.3559 81.754 94.2439 82.2067 94.2439 82.72C94.2439 83.224 94.3559 83.6813 94.5799 84.092C94.8039 84.5027 95.1025 84.8247 95.4759 85.058C95.8585 85.2913 96.2879 85.408 96.7639 85.408ZM105.014 86.668C104.473 86.668 103.983 86.542 103.544 86.29C103.115 86.038 102.779 85.688 102.536 85.24C102.303 84.7827 102.186 84.26 102.186 83.672V78.954H103.488V83.532C103.488 83.9053 103.563 84.232 103.712 84.512C103.871 84.792 104.085 85.0113 104.356 85.17C104.636 85.3287 104.953 85.408 105.308 85.408C105.663 85.408 105.975 85.3287 106.246 85.17C106.526 85.0113 106.741 84.7827 106.89 84.484C107.049 84.1853 107.128 83.8307 107.128 83.42V78.954H108.444V86.5H107.17V85.03L107.38 85.156C107.203 85.632 106.899 86.0053 106.47 86.276C106.05 86.5373 105.565 86.668 105.014 86.668ZM110.461 86.5V78.954H111.735V80.34L111.595 80.144C111.772 79.7147 112.043 79.3973 112.407 79.192C112.771 78.9773 113.214 78.87 113.737 78.87H114.199V80.102H113.541C113.009 80.102 112.58 80.27 112.253 80.606C111.926 80.9327 111.763 81.3993 111.763 82.006V86.5H110.461ZM117.776 89.3V78.954H119.05V80.578L118.882 80.256C119.162 79.808 119.544 79.4533 120.03 79.192C120.515 78.9213 121.07 78.786 121.696 78.786C122.405 78.786 123.04 78.9587 123.6 79.304C124.169 79.6493 124.617 80.1207 124.944 80.718C125.27 81.306 125.434 81.978 125.434 82.734C125.434 83.4713 125.27 84.1387 124.944 84.736C124.617 85.3333 124.169 85.8047 123.6 86.15C123.04 86.4953 122.4 86.668 121.682 86.668C121.075 86.668 120.52 86.5327 120.016 86.262C119.521 85.9913 119.138 85.6087 118.868 85.114L119.078 84.89V89.3H117.776ZM121.584 85.408C122.06 85.408 122.484 85.2913 122.858 85.058C123.231 84.8247 123.52 84.5073 123.726 84.106C123.94 83.6953 124.048 83.238 124.048 82.734C124.048 82.2113 123.94 81.754 123.726 81.362C123.52 80.9607 123.231 80.6433 122.858 80.41C122.484 80.1673 122.06 80.046 121.584 80.046C121.108 80.046 120.678 80.1627 120.296 80.396C119.922 80.6293 119.624 80.9513 119.4 81.362C119.185 81.7633 119.078 82.2207 119.078 82.734C119.078 83.238 119.185 83.6953 119.4 84.106C119.624 84.5073 119.922 84.8247 120.296 85.058C120.678 85.2913 121.108 85.408 121.584 85.408ZM127.141 86.5V78.954H128.415V80.34L128.275 80.144C128.452 79.7147 128.723 79.3973 129.087 79.192C129.451 78.9773 129.894 78.87 130.417 78.87H130.879V80.102H130.221C129.689 80.102 129.259 80.27 128.933 80.606C128.606 80.9327 128.443 81.3993 128.443 82.006V86.5H127.141ZM135.619 86.668C134.891 86.668 134.233 86.5 133.645 86.164C133.057 85.8187 132.591 85.3473 132.245 84.75C131.9 84.1527 131.727 83.476 131.727 82.72C131.727 81.964 131.895 81.292 132.231 80.704C132.577 80.116 133.043 79.6493 133.631 79.304C134.219 78.9587 134.882 78.786 135.619 78.786C136.347 78.786 137.005 78.9587 137.593 79.304C138.181 79.64 138.643 80.102 138.979 80.69C139.325 81.278 139.497 81.9547 139.497 82.72C139.497 83.4853 139.32 84.1667 138.965 84.764C138.611 85.352 138.139 85.8187 137.551 86.164C136.973 86.5 136.329 86.668 135.619 86.668ZM135.619 85.408C136.086 85.408 136.506 85.2913 136.879 85.058C137.262 84.8247 137.561 84.5027 137.775 84.092C137.999 83.6813 138.111 83.224 138.111 82.72C138.111 82.2067 137.999 81.754 137.775 81.362C137.561 80.9607 137.262 80.6433 136.879 80.41C136.506 80.1673 136.086 80.046 135.619 80.046C135.143 80.046 134.714 80.1673 134.331 80.41C133.958 80.6433 133.659 80.9607 133.435 81.362C133.211 81.754 133.099 82.2067 133.099 82.72C133.099 83.224 133.211 83.6813 133.435 84.092C133.659 84.5027 133.958 84.8247 134.331 85.058C134.714 85.2913 135.143 85.408 135.619 85.408ZM141.761 86.5V80.2H140.319V78.954H141.761V78.422C141.761 77.8807 141.878 77.4233 142.111 77.05C142.354 76.6767 142.671 76.392 143.063 76.196C143.464 76 143.908 75.902 144.393 75.902C144.496 75.902 144.608 75.9113 144.729 75.93C144.86 75.9393 144.967 75.9533 145.051 75.972V77.134C144.976 77.1153 144.888 77.106 144.785 77.106C144.682 77.0967 144.603 77.092 144.547 77.092C144.118 77.092 143.763 77.1947 143.483 77.4C143.212 77.6053 143.077 77.946 143.077 78.422V78.954H146.997V80.2H143.077V86.5H141.761ZM146.185 86.5V78.954H147.501V86.5H146.185ZM149.303 86.5V75.902H150.605V86.5H149.303ZM156.097 86.668C155.369 86.668 154.721 86.4953 154.151 86.15C153.582 85.8047 153.134 85.3333 152.807 84.736C152.481 84.1293 152.317 83.4527 152.317 82.706C152.317 81.95 152.476 81.278 152.793 80.69C153.12 80.102 153.559 79.64 154.109 79.304C154.669 78.9587 155.295 78.786 155.985 78.786C156.545 78.786 157.04 78.8887 157.469 79.094C157.908 79.29 158.277 79.5607 158.575 79.906C158.883 80.242 159.117 80.6293 159.275 81.068C159.443 81.4973 159.527 81.9453 159.527 82.412C159.527 82.5147 159.518 82.6313 159.499 82.762C159.49 82.8833 159.476 83 159.457 83.112H153.269V81.992H158.701L158.085 82.496C158.169 82.0107 158.123 81.5767 157.945 81.194C157.768 80.8113 157.507 80.508 157.161 80.284C156.816 80.06 156.424 79.948 155.985 79.948C155.547 79.948 155.145 80.06 154.781 80.284C154.417 80.508 154.133 80.83 153.927 81.25C153.731 81.6607 153.652 82.1507 153.689 82.72C153.652 83.2707 153.736 83.756 153.941 84.176C154.156 84.5867 154.455 84.9087 154.837 85.142C155.229 85.366 155.654 85.478 156.111 85.478C156.615 85.478 157.04 85.3613 157.385 85.128C157.731 84.8947 158.011 84.596 158.225 84.232L159.317 84.792C159.168 85.1373 158.935 85.4547 158.617 85.744C158.309 86.024 157.941 86.248 157.511 86.416C157.091 86.584 156.62 86.668 156.097 86.668Z"
                          fill="#260EB9"
                        />
                      </svg>
                    </button>{" "}
                    {watch("profile") && (
                      <div className="text-font-primary">
                        {watch("profile").name}
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
                      type="button"
                      onClick={next}
                      className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {formNo === 2 && (
              <div className="w-full px-10">
                <div className="mb-3 flex flex-col">
                  <h1 className="text-3xl font-medium text-font-primary">
                    What are your interests?
                  </h1>
                  <h1 className="text-lg font-medium text-font-secondary">
                    We will use this to help customize the experience
                  </h1>
                  <div className="mb-[200px] mt-6 flex h-auto w-full flex-wrap gap-2">
                    {interestsIndex.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`pill inline-block rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-800 ${
                          watch("interests")?.includes(interest)
                            ? "border border-brand-primary bg-[#F5F7FE] text-brand-primary"
                            : "bg-gray-100 text-font-primary"
                        }`}
                      >
                        {interest}{" "}
                        {watch("interests")?.includes(interest) && "✕"}
                      </button>
                    ))}
                    <input
                      type="hidden"
                      {...register("interests", {
                        required: "Please select at least one interest",
                      })}
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={next}
                      className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {formNo === 3 && (
              <div className="w-full px-10">
                <div className="mb-3 flex flex-col gap-2">
                  <h1 className="text-3xl font-medium text-font-primary">
                    You are ready to go!
                  </h1>
                  <h1 className="mb-4 text-lg font-medium text-font-secondary">
                    We hope that you will have a wonderful time at Kalamanch.
                  </h1>

                  {/* Display the information and roles */}
                  {information.map((info) => (
                    <div
                      key={info.role}
                      className="mb-2 flex h-20 w-full cursor-pointer gap-6"
                      onClick={() => setValue("selectedRole", info.role)} // Set the selected role on click
                    >
                      {/* Circular Div */}
                      <div className={`flex w-1/12 items-center justify-start`}>
                        <span
                          className={`block h-14 w-14 rounded-full ${
                            watch("selectedRole") === info.role
                              ? "bg-brand-primary" // Change to brand-primary when selected
                              : "bg-brand-secondary" // Default color
                          }`}
                        ></span>
                      </div>

                      {/* Role Information */}
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

                  {/* Hidden input to store the selected role */}
                  <input
                    type="hidden"
                    {...register("selectedRole", {
                      required: "Please select a role",
                    })}
                  />

                  {errors.selectedRole?.message &&
                    typeof errors.selectedRole.message === "string" && (
                      <p className="text-red-500">
                        {errors.selectedRole.message}
                      </p>
                    )}

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
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
