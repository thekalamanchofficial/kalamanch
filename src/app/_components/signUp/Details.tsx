import React, { useRef } from "react";
import { useSignUpDetailsForm } from "~/app/sign-up/_hooks/useSignUpForm";
import { Controller } from "react-hook-form";
import {
  type FormDataPartial,
  type FormDataDetails,
} from "~/app/sign-up/_types/types";

import Password from "~/assets/svg/Password.svg";
import Email from "~/assets/svg/Email.svg";
import User from "~/assets/svg/User.svg";
import ProfilePhoto from "~/assets/svg/ProfilePhoto.svg";
import UploadIcon from "~/assets/svg/UploadIcon.svg";

import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import Image from "next/image";

import "react-datepicker/dist/react-datepicker.css";

import { STATIC_TEXTS } from "~/app/_components/static/staticText";

type DetailsFormProps = {
  onNext: (data: FormDataDetails) => Promise<void>;
  onPrev: () => void;
  data?: FormDataPartial;
  profileFile?: File;
  setProfileFile: (file?: File) => void;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
};

const DetailsForm: React.FC<DetailsFormProps> = ({
  onNext,
  onPrev,
  data,
  setProfileFile,
  imagePreview,
  setImagePreview,
}) => {
  const { handleSubmit, trigger, control } = useSignUpDetailsForm();

  const handleNext = async (data: FormDataDetails) => {
    const isValid = await trigger();
    if (isValid) {
      await onNext(data);
    }
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form onSubmit={handleSubmit(handleNext)} className="w-full">
      <div className="w-full px-10">
        <div className="mb-3 flex flex-col">
          <label
            htmlFor="name"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            {STATIC_TEXTS.DETAILS_FORM.LABELS.NAME}
          </label>

          <Controller
            control={control}
            name="name"
            defaultValue={data && "name" in data ? data.name : ""}
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
                  <User />
                </span>
              </div>
            )}
          />
          <label
            htmlFor="email"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            {STATIC_TEXTS.DETAILS_FORM.LABELS.EMAIL}
          </label>
          <Controller
            control={control}
            name="email"
            defaultValue={data && "email" in data ? data.email : ""}
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
                  <Email />
                </span>
              </div>
            )}
          />
          <label
            htmlFor="password"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            {STATIC_TEXTS.DETAILS_FORM.LABELS.PASSWORD}
          </label>
          <Controller
            control={control}
            name="password"
            defaultValue={data && "password" in data ? data.password : ""}
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
                  <Password />
                </span>
              </div>
            )}
          />
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            {STATIC_TEXTS.DETAILS_FORM.LABELS.CONFIRM_PASSWORD}
          </label>
          <Controller
            control={control}
            name="confirmPassword"
            defaultValue={
              data && "confirmPassword" in data ? data.confirmPassword : ""
            }
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
                  <Password />
                </span>
              </div>
            )}
          />

          <label
            htmlFor="birthdate"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            {STATIC_TEXTS.DETAILS_FORM.LABELS.BIRTHDATE}
          </label>
          <Controller
            control={control}
            name="birthdate"
            defaultValue={
              data && "birthdate" in data ? data.birthdate : undefined
            }
            render={({ field: { onChange, value }, fieldState }) => {
              return (
                <div className="relative flex">
                  <DatePicker
                    showMonthDropdown
                    showYearDropdown
                    scrollableYearDropdown
                    onChange={onChange}
                    yearDropdownItemNumber={90}
                    placeholderText="Select a date"
                    value={value ? dayjs(value).format("DD-MM-YYYY") : ""}
                    dateFormat={"dd/MM/yyyy"}
                    selected={value}
                    maxDate={new Date()}
                    className="mb-5 block w-full min-w-0 flex-1 rounded-md border border-gray-200 p-3 text-base font-light text-gray-900"
                  />

                  {fieldState.error && (
                    <span className="absolute right-0 top-2/3 mb-3 mt-1 text-red-500">
                      {fieldState.error.message}
                    </span>
                  )}
                </div>
              );
            }}
          />

          <label
            htmlFor="profile"
            className="mb-2 block text-base font-bold text-font-gray"
          >
            {STATIC_TEXTS.DETAILS_FORM.LABELS.PROFILE}
          </label>
          <div className="relative flex flex-col items-start justify-center">
            <div>
              <Controller
                name="profile"
                control={control}
                render={({ field: { onChange }, fieldState }) => (
                  <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                    <div className="group">
                      {!imagePreview ? (
                        <span
                          className="flex size-20 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-dotted border-gray-300 text-gray-400 hover:bg-gray-50 group-has-[div]:hidden dark:border-neutral-700 dark:text-neutral-600 dark:hover:bg-neutral-700/50"
                          onClick={() => {
                            fileInputRef.current?.click();
                          }}
                        >
                          <ProfilePhoto />
                        </span>
                      ) : (
                        <div className="size-24">
                          <Image
                            className="h-[90px] w-[90px] rounded-full object-cover"
                            src={imagePreview}
                            alt="Profile Preview"
                            width={90}
                            height={90}
                          />
                        </div>
                      )}
                    </div>

                    <div className="grow">
                      <div className="flex items-center gap-x-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-brand-primary px-3 py-2 text-xs font-medium text-white hover:bg-[#110eb9] focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <UploadIcon />
                          {STATIC_TEXTS.DETAILS_FORM.UPLOAD_FILE.UPLOAD_BUTTON}
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-500 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                          onClick={() => {
                            setProfileFile(undefined);
                            setImagePreview(null);
                          }}
                        >
                          {STATIC_TEXTS.DETAILS_FORM.UPLOAD_FILE.DELETE_BUTTON}
                        </button>
                      </div>
                    </div>
                    {fieldState.error && (
                      <span className="absolute right-0 top-2/3 mb-3 mt-1 text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}

                    <input
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={(e) => {
                        const files = e.target.files;

                        if (files?.[0]) {
                          onChange(files);
                          setProfileFile(files[0]);

                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setImagePreview(reader.result as string);
                          };
                          reader.readAsDataURL(files[0]);
                        }
                      }}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          <div className="mt-10 flex w-full items-center justify-between gap-8">
            <button
              type="button"
              className="w-1/3 rounded-sm bg-brand-primary px-6 py-2 text-lg text-white"
              onClick={onPrev}
            >
              {STATIC_TEXTS.NAVIGATION.BACK}
            </button>
            <button
              type="submit"
              className="w-1/3 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
            >
              {STATIC_TEXTS.NAVIGATION.NEXT}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DetailsForm;
