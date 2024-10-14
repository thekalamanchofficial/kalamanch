"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useSignInPage } from "../_hooks/useSignInPage";
import { SignInFormStages } from "../_config/config";
import PenNibSVG from "~/assets/svg/PenNib.svg";
import GoogleLogo from "~/assets/svg/GoogleLogo.svg";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import Link from "next/link";
import SignInForm from "~/app/_components/signIn/SignInForm";
import { Icons } from "react-toastify";

const SignInPage = () => {
  const { signInState, setSignInState, handleLogin } = useSignInPage();
  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-secondary">
      {signInState === SignInFormStages.WITH_GOOGLE ? (
        <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-16 rounded-lg bg-white px-6 py-14 md:aspect-auto">
          <SignIn.Root>
            <Clerk.Loading>
              {(isGlobalLoading) =>
                isGlobalLoading ? (
                  <Icons.spinner />
                ) : (
                  <SignIn.Step
                    name="start"
                    className="flex w-full flex-col items-center justify-center gap-4"
                  >
                    <Clerk.Connection
                      name="google"
                      disabled={isGlobalLoading}
                      className="flex w-full flex-col items-center justify-center gap-4"
                    >
                      <Clerk.Loading scope="provider:google">
                        {(isLoading) =>
                          isLoading ? (
                            <Icons.spinner />
                          ) : (
                            <>
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
                              </div>
                              <Link
                                className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-primary px-2 py-2 text-white"
                                href="#"
                              >
                                <GoogleLogo />

                                <h1 className="text-xl">
                                  {STATIC_TEXTS.SIGNUP_GOOGLE}
                                </h1>
                              </Link>
                            </>
                          )
                        }
                      </Clerk.Loading>
                    </Clerk.Connection>
                    <Link
                      href="/sign-up"
                      className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-secondary px-2 py-2 text-brand-primary"
                    >
                      <h1 className="text-xl font-semibold">
                        {STATIC_TEXTS.CREATE_ACCOUNT}
                      </h1>
                    </Link>
                    <div className="w-1/2">
                      <p className="w-full text-center text-sm text-[#666476]">
                        {STATIC_TEXTS.DISCLAIMER}&nbsp;
                        {
                          <Link
                            href="/terms"
                            className="border-b border-b-brand-primary text-brand-primary"
                          >
                            {
                              STATIC_TEXTS.SIGNIN_FORM.LINKS_TEXT
                                .TERMS_OF_SERVICE
                            }
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
                    <div className="mt-10 flex w-full flex-col items-center justify-start gap-3">
                      <h1 className="text-xl font-medium text-font-primary">
                        {STATIC_TEXTS.SIGNIN_FORM.LINKS_TEXT.HAVE_ACCOUNT}
                      </h1>

                      <button
                        className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-secondary px-2 py-2 text-brand-primary"
                        onClick={() => {
                          setSignInState(SignInFormStages.WITH_EMAIL);
                        }}
                      >
                        <h1 className="text-xl font-semibold">
                          {STATIC_TEXTS.SIGNIN}{" "}
                        </h1>
                      </button>
                    </div>
                  </SignIn.Step>
                )
              }
            </Clerk.Loading>
          </SignIn.Root>
        </div>
      ) : null}
      {signInState === SignInFormStages.WITH_EMAIL ? (
        <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-2 rounded-lg bg-white px-6 py-14 md:aspect-auto">
          <SignIn.Root>
            <SignIn.Step
              name="start"
              className="flex w-full flex-col items-center justify-center gap-4"
            >
              <div className="stepper flex w-full items-center justify-center gap-2">
                <PenNibSVG />
                <h1 className="text-3xl font-semibold text-brand-primary">
                  {STATIC_TEXTS.APP_TITLE}
                </h1>
              </div>
              <Clerk.GlobalError className="block text-sm text-rose-400" />
              <Clerk.Connection
                name="google"
                className="flex w-full flex-col items-center justify-center gap-4"
              >
                <Clerk.Loading scope="provider:google">
                  {(isLoading) =>
                    isLoading ? (
                      <Icons.spinner />
                    ) : (
                      <>
                        <Link
                          className="mt-6 flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-primary px-2 py-2 text-white"
                          href="#"
                        >
                          <GoogleLogo />
                          <h1 className="text-xl">
                            {STATIC_TEXTS.SIGNIN_GOOGLE}
                          </h1>
                        </Link>
                      </>
                    )
                  }
                </Clerk.Loading>
              </Clerk.Connection>
              <span className="my-4 flex w-full items-center justify-center gap-4">
                <div className="h-1 w-[100px] border-t border-font-tertiary"></div>
                <p className="text-base font-normal">or</p>
                <div className="h-1 w-[100px] border-t border-font-tertiary"></div>
              </span>
            </SignIn.Step>
          </SignIn.Root>
          <SignInForm onSubmit={handleLogin} />
        </div>
      ) : null}
    </div>
  );
};

export default SignInPage;
