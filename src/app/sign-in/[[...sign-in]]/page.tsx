"use client";

import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import SignInForm from "~/app/_components/signIn/SignInForm";
import { type FormDataSignIn } from "~/app/sign-in/_types/types";
import { SignInFormStages } from "~/app/sign-in/_config/config";
import PenNibSVG from "~/assets/svg/PenNib.svg";
import GoogleLogo from "~/assets/svg/GoogleLogo.svg";

const SignInPage = () => {
  const [signInState, setSignInState] = useState(SignInFormStages.WITH_GOOGLE);
  const { isLoaded, signIn, setActive } = useSignIn();

  const router = useRouter();

  const onSubmit = async (data: FormDataSignIn) => {
    await login(data);
  };

  const login = async (data: FormDataSignIn) => {
    const email = data.email;
    const password = data.password;

    toast
      .promise(
        (async () => {
          if (!signIn) {
            throw new Error("Sign In is not loaded");
          }

          const signInAttempt = await signIn.create({
            identifier: email,
            password,
          });

          if (signInAttempt.status === "complete") {
            await setActive({ session: signInAttempt.createdSessionId });
            router.push("/");
          } else {
            console.error(JSON.stringify(signInAttempt, null, 2));
            throw new Error(STATIC_TEXTS.SIGNIN_FORM.MESSAGES.ERROR_LOGIN);
          }
        })(),
        {
          pending: `${STATIC_TEXTS.SIGNIN_FORM.MESSAGES.PENDING}...`,
          success: `${STATIC_TEXTS.SIGNIN_FORM.MESSAGES.SUCCESS}`,
          error: `${STATIC_TEXTS.SIGNIN_FORM.MESSAGES.ERROR}`,
        },
      )
      .catch((error) => {
        console.error("Error during the login process:", error);
      });
  };

  const handleGoogleLogin = async () => {
    if (!isLoaded) return;
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/",
      redirectUrlComplete: "/",
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-secondary">
      {signInState === SignInFormStages.WITH_GOOGLE ? (
        <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-16 rounded-lg bg-white px-6 py-14 md:aspect-auto">
          <div className="stepper flex w-full items-center justify-center gap-2">
            <PenNibSVG />
            <h1 className="text-3xl font-semibold text-brand-primary">
              {STATIC_TEXTS.APP_TITLE}
            </h1>
          </div>
          <div className="flex w-full flex-col items-center justify-start gap-4">
            <span>
              <h1 className="px-2 text-2xl font-medium text-font-primary">
                {STATIC_TEXTS.APP_DESCRIPTION}
              </h1>
            </span>
            <button
              className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-primary px-2 py-2 text-white"
              onClick={handleGoogleLogin}
            >
              <GoogleLogo />

              <h1 className="text-xl">{STATIC_TEXTS.SIGNUP_GOOGLE}</h1>
            </button>
            <button
              className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-secondary px-2 py-2 text-brand-primary"
              onClick={() => {
                router.replace("/sign-up");
              }}
            >
              <h1 className="text-xl font-semibold">
                {STATIC_TEXTS.CREATE_ACCOUNT}{" "}
              </h1>
            </button>
            <div className="w-1/2">
              <p className="w-full text-center text-sm text-[#666476]">
                {STATIC_TEXTS.DISCLAIMER}&nbsp;
                {
                  <Link
                    href="/terms"
                    className="border-b border-b-brand-primary text-brand-primary"
                  >
                    {STATIC_TEXTS.SIGNIN_FORM.LINKS_TEXT.TERMS_OF_SERVICE}
                  </Link>
                }
                &nbsp;{STATIC_TEXTS.AND}&nbsp;
                {
                  <Link
                    href="/terms"
                    className="border-b border-b-brand-primary text-brand-primary"
                  >
                    {STATIC_TEXTS.SIGNIN_FORM.LINKS_TEXT.PRIVACY_POLICY}
                  </Link>
                }
                .
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-start gap-3">
            <h1 className="text-xl font-medium text-font-primary">
              {STATIC_TEXTS.SIGNIN_FORM.LINKS_TEXT.HAVE_ACCOUNT}
            </h1>
            <button
              className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-secondary px-2 py-2 text-brand-primary"
              onClick={() => {
                setSignInState(SignInFormStages.WITH_EMAIL);
              }}
            >
              <h1 className="text-xl font-semibold">{STATIC_TEXTS.SIGNIN} </h1>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-2 rounded-lg bg-white px-6 py-14 md:aspect-auto">
          <div className="stepper flex w-full items-center justify-center gap-2">
            <PenNibSVG />
            <h1 className="text-3xl font-semibold text-brand-primary">
              {STATIC_TEXTS.APP_TITLE}
            </h1>
          </div>
          <button
            className="mt-6 flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-primary px-2 py-2 text-white"
            onClick={handleGoogleLogin}
          >
            <GoogleLogo />
            <h1 className="text-xl">{STATIC_TEXTS.SIGNIN_GOOGLE}</h1>
          </button>
          <span className="my-4 flex w-full items-center justify-center gap-4">
            <div className="h-1 w-[100px] border-t border-font-tertiary"></div>
            <p className="text-base font-normal">or</p>
            <div className="h-1 w-[100px] border-t border-font-tertiary"></div>
          </span>

          <SignInForm onSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
};

export default SignInPage;
