import React from "react";
import { useContentFormRole } from "~/app/_utils/Hooks/useContentForm";
import { Controller } from "react-hook-form";

interface RoleFormProps {
  onNext: () => void; // Expecting a function as a prop
}
const information = [
  {
    title: " Turn Your writings into a Legacy",
    desc: "Write, sell, or buy poems with complete ownership and make your words last forever.",
    role: "A",
  },
  {
    title: "A Place Where Every Poem is Valued",
    desc: "Join a community where you can share, sell, or invest in poetry that touches hearts.",
    role: "B",
  },
  {
    title: "Buy and Sell Poetry Easily",
    desc: "Support poets or own a poem—trade poetry with ease and make it a valuable asset.",
    role: "C",
  },
];

const Interests: React.FC<RoleFormProps> = ({ onNext }) => {
  const {
    register: registerRole,
    handleSubmit: handleSubmitRole,
    trigger: triggerRole,
    getValues: getValuesRole,
    watch: watchRoles,
    setValue: setValueRole,
    control: controlRole,
  } = useContentFormRole();

  const handleNext = async (data) => {
    const isValid = await triggerRole();
    if (isValid) {
      onNext(data);
    }
  };

  return (
    <form onSubmit={handleSubmitRole(onNext)} className="w-full">
      <div className="w-full px-10">
        <div className="relative mb-3 flex flex-col gap-2">
          <h1 className="text-3xl font-medium text-font-primary">
            You are ready to go!
          </h1>
          <h1 className="mb-4 text-lg font-medium text-font-secondary">
            We hope that you will have a wonderful time at Kalamanch.
          </h1>

          <Controller
            name="role"
            control={controlRole}
            rules={{ required: "Please select a role" }}
            render={({ field, fieldState }) => (
              <>
                {information.map((info) => (
                  <div
                    key={info.role}
                    className="mb-2 flex h-20 w-full cursor-pointer gap-6"
                    onClick={() => field.onChange(info.role)}
                  >
                    <div className={`flex w-1/12 items-center justify-start`}>
                      <span
                        className={`block h-14 w-14 rounded-full ${
                          field.value === info.role
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
                        {info.desc}
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

          <div className="mt-8 flex items-center justify-center">
            <button
              type="submit"
              className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Interests;
