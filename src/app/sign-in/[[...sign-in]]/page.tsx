"use client";

import { SignUpButton, useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm();

  const [isSignUp, setIsSignUp] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    login();
  };

  const login = async () => {
    if (!isLoaded) {
      return;
    }

    let email = getValues("email");
    let password = getValues("password");

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-secondary">
      {!isSignUp ? (
        <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-16 rounded-lg bg-white px-6 py-14 md:aspect-auto">
          <div className="stepper flex w-full items-center justify-center gap-2">
            <svg
              width="39"
              height="38"
              viewBox="0 0 39 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_39_263)">
                <path
                  d="M33.4375 18.3926C33.4286 18.3734 33.4198 18.3542 33.4094 18.3365L28.961 10.424V4.83024C28.961 4.20393 28.7122 3.60328 28.2693 3.16041C27.8265 2.71755 27.2258 2.46875 26.5995 2.46875H12.4306C11.8043 2.46875 11.2036 2.71755 10.7607 3.16041C10.3179 3.60328 10.0691 4.20393 10.0691 4.83024V10.427L5.62062 18.3365C5.61029 18.3542 5.60144 18.3734 5.5911 18.3926C5.39838 18.7805 5.31652 19.2142 5.35454 19.6457C5.39256 20.0772 5.54899 20.4899 5.80659 20.8382L5.82283 20.8588L18.5808 37.4306C18.6911 37.5736 18.8327 37.6894 18.9948 37.7691C19.1569 37.8488 19.3351 37.8903 19.5158 37.8903C19.6964 37.8903 19.8746 37.8488 20.0367 37.7691C20.1988 37.6894 20.3405 37.5736 20.4508 37.4306L33.2072 20.8588L33.2235 20.8382C33.4811 20.4899 33.6375 20.0771 33.6753 19.6455C33.713 19.2139 33.6307 18.7803 33.4375 18.3926ZM26.5995 4.83024V9.55322H12.4306V4.83024H26.5995ZM19.515 21.3607C19.1647 21.3607 18.8223 21.2568 18.531 21.0622C18.2398 20.8676 18.0128 20.5909 17.8787 20.2673C17.7447 19.9437 17.7096 19.5876 17.7779 19.244C17.8463 18.9004 18.015 18.5849 18.2627 18.3372C18.5104 18.0895 18.8259 17.9208 19.1695 17.8525C19.5131 17.7841 19.8692 17.8192 20.1928 17.9532C20.5164 18.0873 20.793 18.3143 20.9877 18.6056C21.1823 18.8968 21.2861 19.2392 21.2861 19.5895C21.2861 20.0593 21.0995 20.5098 20.7674 20.8419C20.4352 21.1741 19.9848 21.3607 19.515 21.3607ZM20.6958 33.2419V23.5495C21.6471 23.2658 22.4645 22.6493 22.9985 21.8125C23.5326 20.9758 23.7476 19.9748 23.6043 18.9925C23.461 18.0102 22.9689 17.1124 22.2181 16.4631C21.4672 15.8138 20.5077 15.4565 19.515 15.4565C18.5224 15.4565 17.5629 15.8138 16.812 16.4631C16.0611 17.1124 15.569 18.0102 15.4257 18.9925C15.2824 19.9748 15.4974 20.9758 16.0315 21.8125C16.5656 22.6493 17.383 23.2658 18.3343 23.5495V33.2404L7.70759 19.4419L11.942 11.9147H27.0895L31.3225 19.4419L20.6958 33.2419Z"
                  fill="#260EB9"
                />
              </g>
              <defs>
                <clipPath id="clip0_39_263">
                  <rect
                    width="37.7838"
                    height="37.7838"
                    fill="white"
                    transform="translate(0.623291 0.107422)"
                  />
                </clipPath>
              </defs>
            </svg>
            <h1 className="text-3xl font-semibold text-brand-primary">
              Kalamanch
            </h1>
          </div>
          <div className="flex w-full flex-col items-center justify-start gap-4">
            <span>
              <h1 className="px-2 text-2xl font-medium text-font-primary">
                Join Today, Start Writing
              </h1>
            </span>
            <button
              className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-primary px-2 py-2 text-white"
              onClick={() => {
                if (!isLoaded) return;
                signIn.authenticateWithRedirect({
                  strategy: "oauth_google",
                  redirectUrl: "/",
                  redirectUrlComplete: "/",
                });
              }}
            >
              <svg
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.5" width="32" height="32" rx="16" fill="white" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.7968 16.2191C25.7968 15.5324 25.7352 14.8722 25.6208 14.2383H16.5V17.9843H21.7119C21.4874 19.1948 20.8051 20.2205 19.7794 20.9072V23.337H22.9092C24.7404 21.6511 25.7968 19.1684 25.7968 16.2191Z"
                  fill="#4285F4"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.4996 25.6841C19.1144 25.6841 21.3065 24.8169 22.9088 23.3378L19.779 20.908C18.9119 21.489 17.8026 21.8324 16.4996 21.8324C13.9773 21.8324 11.8424 20.1288 11.0809 17.8398H7.84546V20.3489C9.43895 23.5139 12.714 25.6841 16.4996 25.6841Z"
                  fill="#34A853"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.0811 17.8414C10.8874 17.2604 10.7774 16.6397 10.7774 16.0014C10.7774 15.3632 10.8874 14.7425 11.0811 14.1614V11.6523H7.84572C7.18984 12.9597 6.81567 14.4388 6.81567 16.0014C6.81567 17.5641 7.18984 19.0432 7.84572 20.3505L11.0811 17.8414Z"
                  fill="#FBBC05"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.4996 10.1681C17.9214 10.1681 19.198 10.6567 20.2016 11.6163L22.9792 8.8387C21.3021 7.27602 19.11 6.31641 16.4996 6.31641C12.714 6.31641 9.43895 8.48655 7.84546 11.6515L11.0809 14.1606C11.8424 11.8716 13.9773 10.1681 16.4996 10.1681Z"
                  fill="#EA4335"
                />
              </svg>

              <h1 className="text-xl">Signup with Google</h1>
            </button>
            <SignUpButton>
              <button className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-secondary px-2 py-2 text-brand-primary">
                <h1 className="text-xl font-semibold">Create my account </h1>
              </button>
            </SignUpButton>
            <div className="w-1/2">
              <p className="w-full text-center text-sm text-[#666476]">
                By logging in or creating an account, you agree to
                Kalamanch&nbsp;
                {
                  <Link
                    href="/terms"
                    className="border-b border-b-brand-primary text-brand-primary"
                  >
                    Terms of Service
                  </Link>
                }
                &nbsp; and&nbsp;
                {
                  <Link
                    href="/terms"
                    className="border-b border-b-brand-primary text-brand-primary"
                  >
                    Privacy Policy
                  </Link>
                }
                .
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-start gap-3">
            <h1 className="text-xl font-medium text-font-primary">
              Already have an account?
            </h1>
            <button
              className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-secondary px-2 py-2 text-brand-primary"
              onClick={() => {
                setIsSignUp(true);
              }}
            >
              <h1 className="text-xl font-semibold">Sign in </h1>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-2 rounded-lg bg-white px-6 py-14 md:aspect-auto">
          <div className="stepper flex w-full items-center justify-center gap-2">
            <svg
              width="39"
              height="38"
              viewBox="0 0 39 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_39_263)">
                <path
                  d="M33.4375 18.3926C33.4286 18.3734 33.4198 18.3542 33.4094 18.3365L28.961 10.424V4.83024C28.961 4.20393 28.7122 3.60328 28.2693 3.16041C27.8265 2.71755 27.2258 2.46875 26.5995 2.46875H12.4306C11.8043 2.46875 11.2036 2.71755 10.7607 3.16041C10.3179 3.60328 10.0691 4.20393 10.0691 4.83024V10.427L5.62062 18.3365C5.61029 18.3542 5.60144 18.3734 5.5911 18.3926C5.39838 18.7805 5.31652 19.2142 5.35454 19.6457C5.39256 20.0772 5.54899 20.4899 5.80659 20.8382L5.82283 20.8588L18.5808 37.4306C18.6911 37.5736 18.8327 37.6894 18.9948 37.7691C19.1569 37.8488 19.3351 37.8903 19.5158 37.8903C19.6964 37.8903 19.8746 37.8488 20.0367 37.7691C20.1988 37.6894 20.3405 37.5736 20.4508 37.4306L33.2072 20.8588L33.2235 20.8382C33.4811 20.4899 33.6375 20.0771 33.6753 19.6455C33.713 19.2139 33.6307 18.7803 33.4375 18.3926ZM26.5995 4.83024V9.55322H12.4306V4.83024H26.5995ZM19.515 21.3607C19.1647 21.3607 18.8223 21.2568 18.531 21.0622C18.2398 20.8676 18.0128 20.5909 17.8787 20.2673C17.7447 19.9437 17.7096 19.5876 17.7779 19.244C17.8463 18.9004 18.015 18.5849 18.2627 18.3372C18.5104 18.0895 18.8259 17.9208 19.1695 17.8525C19.5131 17.7841 19.8692 17.8192 20.1928 17.9532C20.5164 18.0873 20.793 18.3143 20.9877 18.6056C21.1823 18.8968 21.2861 19.2392 21.2861 19.5895C21.2861 20.0593 21.0995 20.5098 20.7674 20.8419C20.4352 21.1741 19.9848 21.3607 19.515 21.3607ZM20.6958 33.2419V23.5495C21.6471 23.2658 22.4645 22.6493 22.9985 21.8125C23.5326 20.9758 23.7476 19.9748 23.6043 18.9925C23.461 18.0102 22.9689 17.1124 22.2181 16.4631C21.4672 15.8138 20.5077 15.4565 19.515 15.4565C18.5224 15.4565 17.5629 15.8138 16.812 16.4631C16.0611 17.1124 15.569 18.0102 15.4257 18.9925C15.2824 19.9748 15.4974 20.9758 16.0315 21.8125C16.5656 22.6493 17.383 23.2658 18.3343 23.5495V33.2404L7.70759 19.4419L11.942 11.9147H27.0895L31.3225 19.4419L20.6958 33.2419Z"
                  fill="#260EB9"
                />
              </g>
              <defs>
                <clipPath id="clip0_39_263">
                  <rect
                    width="37.7838"
                    height="37.7838"
                    fill="white"
                    transform="translate(0.623291 0.107422)"
                  />
                </clipPath>
              </defs>
            </svg>
            <h1 className="text-3xl font-semibold text-brand-primary">
              Kalamanch
            </h1>
          </div>
          <button
            className="mt-6 flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-primary px-2 py-2 text-white"
            onClick={() => {
              if (!isLoaded) return;
              signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/",
                redirectUrlComplete: "/",
              });
            }}
          >
            <svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" width="32" height="32" rx="16" fill="white" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.7968 16.2191C25.7968 15.5324 25.7352 14.8722 25.6208 14.2383H16.5V17.9843H21.7119C21.4874 19.1948 20.8051 20.2205 19.7794 20.9072V23.337H22.9092C24.7404 21.6511 25.7968 19.1684 25.7968 16.2191Z"
                fill="#4285F4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.4996 25.6841C19.1144 25.6841 21.3065 24.8169 22.9088 23.3378L19.779 20.908C18.9119 21.489 17.8026 21.8324 16.4996 21.8324C13.9773 21.8324 11.8424 20.1288 11.0809 17.8398H7.84546V20.3489C9.43895 23.5139 12.714 25.6841 16.4996 25.6841Z"
                fill="#34A853"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0811 17.8414C10.8874 17.2604 10.7774 16.6397 10.7774 16.0014C10.7774 15.3632 10.8874 14.7425 11.0811 14.1614V11.6523H7.84572C7.18984 12.9597 6.81567 14.4388 6.81567 16.0014C6.81567 17.5641 7.18984 19.0432 7.84572 20.3505L11.0811 17.8414Z"
                fill="#FBBC05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.4996 10.1681C17.9214 10.1681 19.198 10.6567 20.2016 11.6163L22.9792 8.8387C21.3021 7.27602 19.11 6.31641 16.4996 6.31641C12.714 6.31641 9.43895 8.48655 7.84546 11.6515L11.0809 14.1606C11.8424 11.8716 13.9773 10.1681 16.4996 10.1681Z"
                fill="#EA4335"
              />
            </svg>
            <h1 className="text-xl">Signup with Google</h1>
          </button>
          <span className="my-4 flex w-full items-center justify-center gap-4">
            <div className="h-1 w-[100px] border-t border-font-tertiary"></div>
            <p className="text-base font-normal">or</p>
            <div className="h-1 w-[100px] border-t border-font-tertiary"></div>
          </span>

          <form onSubmit={handleSubmit(onSubmit)} className="w-2/3">
            <div className="w-full px-10">
              <div className="mb-3 flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-2 block text-base font-bold text-font-gray"
                >
                  Email address
                </label>
                <div className="relative flex">
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                    placeholder="Enter your email"
                  />
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
                  />
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

                <div className="mt-4 flex flex-col items-center justify-end gap-6">
                  <button
                    type="submit"
                    className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
                  >
                    Submit
                  </button>
                  <h1
                    onClick={() => setIsSignUp(false)}
                    className="cursor-pointer text-center text-font-secondary"
                  >
                    Need an account?{" "}
                    <span className="text-font-primary underline">
                      Sign up here.
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignInPage;
