import { useRouter } from "next/navigation";
import { type FormDataSignIn } from "../_types/types";
import { handleError } from "~/app/_utils/handleError";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { SignInFormStages } from "../_config/config";
import { useState } from "react";
import { toast } from "react-toastify";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";

type UseSignInPage = () => UseSignInPageReturn;

type UseSignInPageReturn = {
  signInState: SignInFormStages;
  setSignInState: React.Dispatch<React.SetStateAction<SignInFormStages>>;
  handleLogin: (data: FormDataSignIn) => Promise<void>;
  handleGoogleSignUp: () => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
  handleCreateAccount: () => Promise<void>;
};

export const useSignInPage: UseSignInPage = () => {
  const [signInState, setSignInState] = useState(SignInFormStages.WITH_GOOGLE);
  const { isLoaded: isLoadedSignin, signIn, setActive } = useSignIn();
  const { isLoaded: isLoadedSignup, signUp } = useSignUp();

  const router = useRouter();

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
            await setActive({ session: signInAttempt.createdSessionId });
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

  const handleGoogleSignUp = async () => {
    if (!isLoadedSignup) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (signupError) {
      handleError(signupError);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoadedSignin) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (signinError) {
      handleError(signinError);
    }
  };

  const handleCreateAccount = async () => {
    router.replace("/sign-up");
  };

  return {
    signInState,
    setSignInState,
    handleLogin,
    handleGoogleSignUp,
    handleGoogleSignIn,
    handleCreateAccount,
  };
};
