import React from "react";
import { useContentFormInterest } from "~/app/sign-up/_hooks/useContentForm";
import { Controller } from "react-hook-form";
import { type FormDataInterest } from "~/app/sign-up/_types/types";
import { INTEREST_ARRAY } from "~/app/sign-up/_config/config";

interface InterestsFormProps {
  onNext: (data: FormDataInterest) => Promise<void>;
}

const Interests: React.FC<InterestsFormProps> = ({ onNext }) => {
  const { handleSubmit, trigger, control } = useContentFormInterest();

  const handleNext = async (data: FormDataInterest) => {
    const isValid = await trigger();
    if (isValid) {
      await onNext(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleNext)} className="w-full">
      <div className="w-full px-10">
        <div className="mb-3 flex flex-col">
          <h1 className="text-3xl font-medium text-font-primary">
            What are your interests?
          </h1>
          <h1 className="text-lg font-medium text-font-secondary">
            We will use this to help customize the experience
          </h1>
          <div className="relative mb-[200px] mt-6 flex h-auto w-full flex-wrap gap-2">
            <Controller
              name="interests"
              control={control}
              defaultValue={[]}
              render={({ field: { onChange, value }, fieldState }) => (
                <>
                  {INTEREST_ARRAY.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      value={value}
                      onClick={() => {
                        const newValue = value.includes(interest)
                          ? value.filter((item) => item !== interest)
                          : [...value, interest];
                        onChange(newValue);
                      }}
                      className={`pill inline-block rounded-full bg-gray-200 px-4 py-2 text-sm text-gray-800 ${
                        value.includes(interest)
                          ? "border border-brand-primary bg-[#fafbff] text-brand-primary"
                          : "bg-gray-100 text-font-primary"
                      }`}
                    >
                      {interest} {value.includes(interest) && "✕"}
                    </button>
                  ))}
                  {fieldState.error && (
                    <span className="absolute -bottom-20 -right-10 text-red-500">
                      {fieldState.error.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit" // Use type="submit" for form submission
              className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Interests;
