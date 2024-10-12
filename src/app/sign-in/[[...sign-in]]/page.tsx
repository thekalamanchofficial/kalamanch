"use client";

import Link from "next/link";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import SignInForm from "~/app/_components/signIn/SignInForm";
import { SignInFormStages } from "~/app/sign-in/_config/config";
import PenNibSVG from "~/assets/svg/PenNib.svg";
import GoogleLogo from "~/assets/svg/GoogleLogo.svg";
import { useSignInPage } from "../_hooks/useSignInPage";
import { FormattedMessage, IntlProvider } from "react-intl";
import intlMessages from "~/app/_i18n";
import { I18nKeys } from "~/app/_i18n/keys";

const locale = "en";

const SignInPage = () => {
  const {
    signInState,
    setSignInState,
    handleLogin,
    handleGoogleSignUp,
    handleGoogleSignIn,
    handleCreateAccount,
  } = useSignInPage();

  return (
    <IntlProvider locale={locale} messages={intlMessages[locale]}>
      <div className="flex h-full w-full items-center justify-center bg-brand-secondary">
        {signInState === SignInFormStages.WITH_GOOGLE ? (
          <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-16 rounded-lg bg-white px-6 py-14 md:aspect-auto">
            <div className="stepper flex w-full items-center justify-center gap-2">
              <PenNibSVG />
              <h1 className="text-3xl font-semibold text-brand-primary">
                <FormattedMessage id={I18nKeys.Kalamanch} />
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
                onClick={handleGoogleSignUp}
              >
                <GoogleLogo />

                <h1 className="text-xl">{STATIC_TEXTS.SIGNUP_GOOGLE}</h1>
              </button>
              <button
                className="flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-secondary px-2 py-2 text-brand-primary"
                onClick={handleCreateAccount}
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
                <h1 className="text-xl font-semibold">
                  {STATIC_TEXTS.SIGNIN}{" "}
                </h1>
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
              onClick={handleGoogleSignIn}
            >
              <GoogleLogo />
              <h1 className="text-xl">{STATIC_TEXTS.SIGNIN_GOOGLE}</h1>
            </button>
            <span className="my-4 flex w-full items-center justify-center gap-4">
              <div className="h-1 w-[100px] border-t border-font-tertiary"></div>
              <p className="text-base font-normal">or</p>
              <div className="h-1 w-[100px] border-t border-font-tertiary"></div>
            </span>

            <SignInForm onSubmit={handleLogin} />
          </div>
        )}
      </div>
    </IntlProvider>
  );
};

export default SignInPage;
