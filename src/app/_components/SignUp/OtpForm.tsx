// OTPVerification.tsx
import React from "react";
import OtpInput from "react-otp-input";

type OTPVerificationProps = {
  otp: string;
  setOtp: (otp: string) => void;
  onVerify: (e: React.FormEvent) => Promise<void>;
};

const OTPVerification: React.FC<OTPVerificationProps> = ({
  otp,
  setOtp,
  onVerify,
}) => {
  const handleVerify = async (e: React.FormEvent) => {
    await onVerify(e);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-brand-secondary py-3">
      <h1 className="mb-4 mt-4 text-4xl font-semibold text-font-primary">
        Verify your email
      </h1>
      <div className="flex h-[450px] w-full max-w-2xl flex-col items-center gap-y-12 rounded-lg bg-white px-6 py-2 md:aspect-auto">
        <div className="my-3 flex h-full w-full flex-col items-center justify-center gap-3">
          <form
            onSubmit={handleVerify}
            className="flex flex-col items-center justify-center"
          >
            <label
              id="code"
              className="mb-2 block text-base font-bold text-font-gray"
            >
              Enter your verification code
            </label>
            <p className="mb-4 text-sm font-light">
              Please enter the 6 digit code we sent to your email address
            </p>
            <div className="mb-6 flex gap-2">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputStyle={{ width: "2.5rem" }}
                renderSeparator={<span className="mx-2 text-xl"> </span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="h-12 rounded-md border-2 border-gray-300 text-center text-2xl transition duration-150 ease-in-out"
                  />
                )}
              />
            </div>
            <button
              type="submit"
              className="w-1/2 rounded-sm bg-brand-primary px-3 py-2 text-lg text-white"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
