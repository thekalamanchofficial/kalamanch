"use client";

import { SignInButton, SignUpButton, useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

const SignInPage = () => {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-secondary">
      <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-16 rounded-lg bg-white px-6 py-14 md:aspect-auto">
        <div className="stepper flex w-full items-center justify-center gap-2">
          <svg
            width="39"
            height="38"
            viewBox="0 0 39 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_39_263)">
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.7968 16.2191C25.7968 15.5324 25.7352 14.8722 25.6208 14.2383H16.5V17.9843H21.7119C21.4874 19.1948 20.8051 20.2205 19.7794 20.9072V23.337H22.9092C24.7404 21.6511 25.7968 19.1684 25.7968 16.2191Z"
                fill="#4285F4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.4996 25.6841C19.1144 25.6841 21.3065 24.8169 22.9088 23.3378L19.779 20.908C18.9119 21.489 17.8026 21.8324 16.4996 21.8324C13.9773 21.8324 11.8424 20.1288 11.0809 17.8398H7.84546V20.3489C9.43895 23.5139 12.714 25.6841 16.4996 25.6841Z"
                fill="#34A853"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.0811 17.8414C10.8874 17.2604 10.7774 16.6397 10.7774 16.0014C10.7774 15.3632 10.8874 14.7425 11.0811 14.1614V11.6523H7.84572C7.18984 12.9597 6.81567 14.4388 6.81567 16.0014C6.81567 17.5641 7.18984 19.0432 7.84572 20.3505L11.0811 17.8414Z"
                fill="#FBBC05"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
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
              By logging in or creating an account, you agree to Kalamanch&nbsp;
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
          <SignInButton>
            <button className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-secondary px-2 py-2 text-brand-primary">
              <h1 className="text-xl font-semibold">Sign in </h1>
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
