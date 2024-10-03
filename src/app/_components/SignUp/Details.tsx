import React, { useRef } from "react";
import { useContentFormDetails } from "~/app/_utils/Hooks/useContentForm";
import { Controller } from "react-hook-form";
import { PasswordSVG, EmailSVG, UserSVG } from "~/assets/svg/svg";
import { FormDataDetails } from "~/app/_utils/Types/formTypes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

interface DetailsFormProps {
  onNext: (data: FormDataDetails) => Promise<void>;
}

const DetailsForm: React.FC<DetailsFormProps> = ({ onNext }) => {
  const {
    register: registerDetails,
    handleSubmit: handleSubmitDetails,
    trigger: triggerDetails,
    control: controlDetails,
    getValues: getValuesDetails,
    watch: watchDetails,
    setValue: setValueDetails,
  } = useContentFormDetails();

  const handleNext = async (data: FormDataDetails) => {
    console.log(getValuesDetails());
    const isValid = await triggerDetails();
    if (isValid) {
      onNext(data);
    }
  };

  return (
    <form onSubmit={handleSubmitDetails(handleNext)} className="w-full">
      <div className="w-full px-10">
        <div className="mb-3 flex flex-col">
          <label
            htmlFor="name"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            Your name
          </label>

          <Controller
            control={controlDetails}
            name="name"
            defaultValue=""
            render={({ field: { value, onChange }, fieldState }) => (
              <div className="relative flex">
                <input
                  type="text"
                  id="name"
                  value={value}
                  onChange={onChange}
                  className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                  placeholder="Write your name"
                />
                {fieldState.error && (
                  <span className="absolute right-0 top-2/3 mb-3 mt-1 text-red-500">
                    {fieldState.error.message}
                  </span>
                )}
                <span className="absolute right-0 top-2 inline-flex items-center rounded-s-md px-3 text-sm text-gray-900">
                  <UserSVG />
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
            control={controlDetails}
            name="password"
            defaultValue=""
            render={({ field: { value, onChange }, fieldState }) => (
              <div className="relative flex">
                <input
                  type="password"
                  value={value}
                  onChange={onChange}
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
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            Confirm Password
          </label>
          <Controller
            control={controlDetails}
            name="confirmPassword"
            defaultValue=""
            render={({ field: { value, onChange }, fieldState }) => (
              <div className="relative flex">
                <input
                  type="password"
                  value={value}
                  onChange={onChange}
                  id="confirmPassword"
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

          <label
            htmlFor="email"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            Your email
          </label>
          <Controller
            control={controlDetails}
            name="email"
            defaultValue=""
            render={({ field: { value, onChange }, fieldState }) => (
              <div className="relative flex">
                <input
                  type="email"
                  value={value}
                  onChange={onChange}
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
            htmlFor="birthdate"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            Your birthdate
          </label>
          <Controller
            control={controlDetails}
            name="birthdate"
            defaultValue={undefined}
            render={({ field: { onChange, value }, fieldState }) => {
              return (
                <div className="relative flex">
                  {/* <input
                    type="date"
                    value={dayjs(value).format("DD/MM/YYYY")}
                    onChange={onChange}
                    id="birthdate"
                    className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900 placeholder:text-font-tertiary"
                  /> */}
                  <DatePicker
                    onChange={onChange}
                    placeholderText="Select a date"
                    value={value ? dayjs(value).format("DD-MM-YYYY") : ""}
                    dateFormat={"dd/MM/yyyy"}
                    selected={value}
                    className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900"
                  />

                  {fieldState.error && (
                    <span className="absolute right-0 top-2/3 mb-3 mt-1 text-red-500">
                      {fieldState.error.message}
                    </span>
                  )}
                  {/* <span className="absolute right-0 top-2 inline-flex items-center rounded-s-md px-3 text-sm text-gray-900">
                    <CalendarSVG />
                  </span> */}
                </div>
              );
            }}
          />

          <label
            htmlFor="profile"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            Your profile picture
          </label>
          {/* <div className="relative flex flex-col items-start justify-center">
            <input
              type="file"
              id="profile"              
                required: "Profile picture is required",
              })} // Validation for profile picture
              className="hidden" // Hides the actual input
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  if (e.target.files && e.target.files[0]) {
                    setValueDetails(
                      "profile",
                      URL.createObjectURL(e.target.files[0]),
                    );
                  }
                }
              }}
            />
            <button
              type="button"
              onClick={() => document.getElementById("profile")?.click()}
            >
              <UploadSVG />
            </button>
            {watchDetails("profile") && (
              <div className="text-font-primary">
                {(watchDetails("profile") as unknown as File)?.name}
              </div>
            )}
            <svg
              width="190"
              height="2"
              viewBox="0 0 190 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="my-4"
            >
              <path d="M0 1H190" stroke="#E0DEE6" />
            </svg>
            <button
              type="button"
              className="mb-4 ml-3 border-b border-b-brand-primary text-brand-primary"
            >
              <h1>Choose from avatars</h1>
            </button>
          </div> */}

          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
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

export default DetailsForm;
