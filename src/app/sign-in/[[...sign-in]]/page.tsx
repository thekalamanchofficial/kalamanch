"use client";

import { SignUpButton, useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { GoogleSVG, LogoSVG } from "~/assets/svg/svg";
import SignInForm from "~/app/_components/SignIn/SignInForm";
import { FormDataSignIn } from "~/app/_utils/Types/formTypes";
import { appTitle, appDescription } from "~/assets/static";
import { signInFormStages } from "~/assets/static";

const SignInPage = () => {
  const [signInState, setSignInState] = useState(signInFormStages.withGoogle);
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
            throw new Error("SignIn is not loaded");
          }

          const signInAttempt = await signIn.create({
            identifier: email,
            password,
          });

          if (signInAttempt.status === "complete") {
            await setActive({ session: signInAttempt.createdSessionId });
            router.push("/"); // Redirect after successful login
          } else {
            console.error(JSON.stringify(signInAttempt, null, 2));
            throw new Error("Login attempt was not completed successfully."); // Throw an error to trigger the error toast
          }
        })(),
        {
          pending: "Logging in, please wait...", // Message while the promise is pending
          success: "Login successful! Redirecting...", // Message on success
          error: "Login failed. Please check your credentials.", // Message on error
        },
      )
      .catch((error) => {
        console.error("Error during the login process:", error);
      });
  };

  const handleGoogleLogin = async () => {
    if (!isLoaded) return;
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/",
      redirectUrlComplete: "/",
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-secondary">
      {signInState === signInFormStages.withGoogle ? (
        <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-16 rounded-lg bg-white px-6 py-14 md:aspect-auto">
          <div className="stepper flex w-full items-center justify-center gap-2">
            <LogoSVG />
            <h1 className="text-3xl font-semibold text-brand-primary">
              {appTitle}
            </h1>
          </div>
          <div className="flex w-full flex-col items-center justify-start gap-4">
            <span>
              <h1 className="px-2 text-2xl font-medium text-font-primary">
                {appDescription}
              </h1>
            </span>
            <button
              className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-primary px-2 py-2 text-white"
              onClick={handleGoogleLogin}
            >
              <GoogleSVG />

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
                &nbsp;and&nbsp;
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
                setSignInState(signInFormStages.withEmail);
              }}
            >
              <h1 className="text-xl font-semibold">Sign in </h1>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-2 rounded-lg bg-white px-6 py-14 md:aspect-auto">
          <div className="stepper flex w-full items-center justify-center gap-2">
            <LogoSVG />
            <h1 className="text-3xl font-semibold text-brand-primary">
              {appTitle}
            </h1>
          </div>
          <button
            className="mt-6 flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-primary px-2 py-2 text-white"
            onClick={handleGoogleLogin}
          >
            <GoogleSVG />
            <h1 className="text-xl">Signin with Google</h1>
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
