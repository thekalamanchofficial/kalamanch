import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SignUpFormStages, SignUpFormStatus } from "../_config/config";
import { trpc } from "~/server/client";
import { type FormDataPartial, type FormData } from "../_types/types";
import { handleError } from "~/app/_utils/handleError";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { toast } from "react-toastify";

type UseSignUpPage = () => UseSignUpPageReturn;

type UseSignUpPageReturn = {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  verifying: boolean;
  formData: FormData;
  profileFile: File | undefined;
  setProfileFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
  formStep: SignUpFormStages;
  formStepNumber: number;
  handleNext: (data?: FormDataPartial) => Promise<void>;
  handlePrev: () => Promise<void>;
  handleVerify: (e: React.FormEvent) => Promise<void>;
};

export const useSignUpPage: UseSignUpPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const [formData, setFormData] = useState<FormData>({} as FormData);
  const [profileFile, setProfileFile] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formStep, setFormStep] = useState<SignUpFormStages>(
    SignUpFormStages.DETAILS,
  );
  const [formStepNumber, setFormStepNumber] = useState<number>(0);

  const mutation = trpc.user.addUser.useMutation();

  const finalSubmit = async () => {
    if (!isLoaded) return;

    const emailAddress = formData.email;
    const password = formData.password;

    try {
      await signUp.create({
        emailAddress,
        password,
        unsafeMetadata: {
          name: formData.name,
          birthdate: formData.birthdate,
          profile: formData.profile,
          interests: formData.interests,
        },
      });
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (err: unknown) {
      handleError(err);
    }
  };

  const addUserToDB = async () => {
    const data = {
      email: formData.email,
      name: formData.name,
      birthdate: formData.birthdate,
      profile: formData.profile,
      interests: formData.interests,
    };

    try {
      const user = await mutation.mutateAsync(data);
      return user;
    } catch (error) {
      handleError(error);
    }
  };

  const handleNext = async (data?: FormDataPartial): Promise<void> => {
    setFormStepNumber((prev) => prev + 1);
    setFormData((prev) => ({ ...prev, ...data }));

    if (formStep === SignUpFormStages.DETAILS) {
      setFormStep(SignUpFormStages.INTEREST);
    } else if (formStep === SignUpFormStages.INTEREST) {
      await finalSubmit();
      setFormStep(SignUpFormStages.OTP_VERIFICATION);
    } else if (formStep === SignUpFormStages.OTP_VERIFICATION) {
      await handleVerify();
    }
  };
  const handlePrev = async () => {
    setFormStepNumber((prev) => prev - 1);
    if (formStep === SignUpFormStages.DETAILS) {
      router.push("/"); // start from begining
    } else if (formStep === SignUpFormStages.INTEREST) {
      setFormStep(SignUpFormStages.DETAILS); // go back to details
    } else if (formStep === SignUpFormStages.OTP_VERIFICATION) {
      router.push("/"); // cancel sign up
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;
    try {
      setVerifying(true);
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: otp,
      });

      if (signUpAttempt.status === SignUpFormStatus.complete) {
        const toastId = toast.loading(
          `${STATIC_TEXTS.DETAILS_FORM.MESSAGES.PENDING}`,
        );

        setActive({ session: signUpAttempt.createdSessionId })
          .then(async () => {
            const res = await addUserToDB();
            if (res != undefined) {
              toast.success(`${STATIC_TEXTS.DETAILS_FORM.MESSAGES.SUCCESS}`);
              router.push("/");
            }
          })
          .catch((err) => {
            handleError(err);
          })
          .finally(() => {
            toast.dismiss(toastId);
            setVerifying(false);
          });
      }
    } catch (err) {
      handleError(err);
      setVerifying(false);
    }
  };

  return {
    otp,
    setOtp,
    verifying,
    formData,
    profileFile,
    setProfileFile,
    imagePreview,
    setImagePreview,
    formStep,
    formStepNumber,
    handleNext,
    handlePrev,
    handleVerify,
  };
};
