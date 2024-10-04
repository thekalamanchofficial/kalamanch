import React, { type FormEvent } from "react";
import { useContentFormSignIn } from "~/app/sign-in/_hooks/useContentForm";
import { Controller } from "react-hook-form";
import { PasswordSVG, EmailSVG } from "~/assets/svg/svg";
import { type FormDataSignIn } from "~/app/sign-in/_types/types";

interface SignInFormProps {
  onSubmit: (data: FormDataSignIn) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const { handleSubmit, trigger, control } = useContentFormSignIn();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const isValid = await trigger();
    console.log(isValid);
    if (isValid) {
      await handleSubmit(onSubmit)();
    }
  };

  return (
    <form className="w-2/3">
      <div className="w-full px-10">
        <div className="mb-3 flex flex-col">
          <label
            htmlFor="email"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            Your email
          </label>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { onChange, value }, fieldState }) => (
              <div className="relative flex">
                <input
                  type="email"
                  value={value}
                  onAbort={onChange}
                  id="email"
                  className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                  placeholder="Enter your email"
                />
                {fieldState.error && (
                  <span className="absolute right-0 top-2/3 mb-3 mt-1 text-red-500">
                    {fieldState.error.message}
                  </span>
                )}
                <span className="absolute right-0 top-2 inline-flex items-center rounded-s-md px-3 text-sm text-gray-900">
                  <EmailSVG />
                </span>
              </div>
            )}
          />

          <label
            htmlFor="password"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            Password
          </label>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({ field: { onChange, value }, fieldState }) => (
              <div className="relative flex">
                <input
                  onChange={onChange}
                  value={value}
                  type="password"
                  id="password"
                  className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                  placeholder="Enter password"
                />
                {fieldState.error && (
                  <span className="absolute right-0 top-2/3 mb-3 mt-1 text-red-500">
                    {fieldState.error.message}
                  </span>
                )}
                <span className="absolute right-0 top-2 inline-flex items-center rounded-s-md px-3 text-sm text-gray-900">
                  <PasswordSVG />
                </span>
              </div>
            )}
          />
          <div className="mt-4 flex flex-col items-center justify-end gap-6">
            <button
              type="submit"
              onClick={handleLogin}
              className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
            >
              Submit
            </button>
            <a
              href="/sign-up"
              className="cursor-pointer text-center text-font-secondary"
            >
              Need an account?&nbsp;
              <span className="text-font-primary underline">Sign up here.</span>
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
