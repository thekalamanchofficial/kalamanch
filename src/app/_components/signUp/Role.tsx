import React from "react";
import { useSignUpRoleForm } from "~/app/sign-up/_hooks/useSignUpForm";
import { Controller } from "react-hook-form";
import {
  type FormDataPartial,
  type FormDataRole,
} from "~/app/sign-up/_types/types";
// import { ROLES } from "~/app/sign-up/_config/config";
import { STATIC_TEXTS } from "../static/staticText";

type RoleFormProps = {
  onNext: (data: FormDataRole) => Promise<void>;
  onPrev: () => void;
  data: FormDataPartial;
};

const Interests: React.FC<RoleFormProps> = ({ onNext, onPrev }) => {
  const { handleSubmit, trigger, control } = useSignUpRoleForm();

  const handleNext = async (data: FormDataRole) => {
    const isValid = await trigger();
    if (isValid) {
      await onNext(data);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleNext)} className="w-full">
      <div className="w-full px-10">
        <div className="relative mb-3 flex flex-col gap-2">
          <h1 className="text-3xl font-medium text-font-primary">
            {STATIC_TEXTS.ROLE_FORM.FORM_HEADING}
          </h1>
          <h1 className="mb-4 text-lg font-medium text-font-secondary">
            {STATIC_TEXTS.ROLE_FORM.FORM_DESCRIPTION}
          </h1>

          <Controller
            name="role"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <>
                {STATIC_TEXTS.ROLE_FORM.ROLES_INFORMATION.map((info) => (
                  <div
                    key={info.role}
                    className="mb-2 flex h-20 w-full cursor-pointer gap-6"
                    onClick={() => onChange(info.role)}
                  >
                    <div className={`flex w-1/12 items-center justify-start`}>
                      <span
                        className={`block h-14 w-14 rounded-full ${
                          value === info.role
                            ? "bg-brand-primary"
                            : "bg-brand-secondary"
                        }`}
                      ></span>
                    </div>

                    <div className="flex w-11/12 flex-col items-start justify-start">
                      <h1 className="text-lg font-semibold text-font-primary">
                        {info.title}
                      </h1>
                      <h1 className="text-base text-font-secondary">
                        {info.description}
                      </h1>
                    </div>
                  </div>
                ))}
                {fieldState.error && (
                  <span className="absolute -right-10 top-0 text-red-500">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />

          <div className="mt-8 flex items-center justify-between gap-12">
            <button
              type="submit"
              onClick={onPrev}
              className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
            >
              {STATIC_TEXTS.NAVIGATION.BACK}
            </button>
            <button
              type="submit"
              className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
            >
              {STATIC_TEXTS.NAVIGATION.SUBMIT}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Interests;
