import { useRouter } from "next/navigation";
import { type FormDataSignIn } from "../_types/types";
import { handleError } from "~/app/_utils/handleError";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { SignInFormStages } from "../_config/config";
import { useState } from "react";
import { toast } from "react-toastify";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { type ClerkAPIError, type OAuthStrategy } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

type UseSignInPage = () => UseSignInPageReturn;

type UseSignInPageReturn = {
  signInState: SignInFormStages;
  setSignInState: React.Dispatch<React.SetStateAction<SignInFormStages>>;
  handleLogin: (data: FormDataSignIn) => Promise<void>;
  handleSSOLogin: (strategy: OAuthStrategy) => Promise<null | undefined>;
  ssoLoginErrors?: ClerkAPIError[];
};

export const useSignInPage: UseSignInPage = () => {
  const [signInState, setSignInState] = useState(SignInFormStages.WITH_GOOGLE);
  const { signIn, setActive: setActiveSignIn } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();
  const [ssoLoginErrors, setSSOLoginErrors] = useState<ClerkAPIError[]>();

  const router = useRouter();

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/",
    });
  };

  const handleSSOLogin = async (strategy: OAuthStrategy) => {
    if (!signIn || !signUp) return null;
    try {
      setSSOLoginErrors(undefined);

      const userExistsButNeedsToSignIn =
        signUp.verifications.externalAccount.status === "transferable" &&
        signUp.verifications.externalAccount.error?.code ===
          "external_account_exists";

      if (userExistsButNeedsToSignIn) {
        const res = await signIn.create({ transfer: true });

        if (res.status === "complete") {
          await setActiveSignUp({
            session: res.createdSessionId,
          });
        }
      }

      const userNeedsToBeCreated =
        signIn.firstFactorVerification.status === "transferable";

      if (userNeedsToBeCreated) {
        const res = await signUp.create({
          transfer: true,
        });

        if (res.status === "complete") {
          await setActiveSignUp({
            session: res.createdSessionId,
          });
        }
      } else {
        await signInWith(strategy);
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setSSOLoginErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleLogin = async (data: FormDataSignIn) => {
    await login(data);
  };

  const login = async (data: FormDataSignIn) => {
    const email = data.email;
    const password = data.password;

    toast
      .promise(
        (async () => {
          if (!signIn) {
            throw new Error(
              STATIC_TEXTS.SIGNIN_FORM.MESSAGES.SIGNIN_NOT_LOADED,
            );
          }

          const signInAttempt = await signIn.create({
            identifier: email,
            password,
          });

          if (signInAttempt.status === "complete") {
            await setActiveSignIn({ session: signInAttempt.createdSessionId });
            router.push("/");
          } else {
            handleError(STATIC_TEXTS.SIGNIN_FORM.MESSAGES.ERROR_LOGIN);
          }
        })(),
        {
          pending: `${STATIC_TEXTS.SIGNIN_FORM.MESSAGES.PENDING}...`,
          success: `${STATIC_TEXTS.SIGNIN_FORM.MESSAGES.SUCCESS}`,
        },
      )
      .catch((error) => {
        handleError(error);
      });
  };

  return {
    signInState,
    setSignInState,
    handleLogin,
    handleSSOLogin,
    ssoLoginErrors,
  };
};
