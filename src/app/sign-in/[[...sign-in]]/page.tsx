"use client";

import { SignUpButton, useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { GoogleSVG, LogoSVG } from "~/assets/svg/svg";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
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

    toast
      .promise(
        (async () => {
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

  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-secondary">
      {!isSignUp ? (
        <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-16 rounded-lg bg-white px-6 py-14 md:aspect-auto">
          <div className="stepper flex w-full items-center justify-center gap-2">
            <LogoSVG />
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
            <LogoSVG />
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
            <GoogleSVG />
            <h1 className="text-xl">Signin with Google</h1>
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
