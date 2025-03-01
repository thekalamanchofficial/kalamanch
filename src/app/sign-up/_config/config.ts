export const enum SignUpFormStages {
  DETAILS = "DETAILS",
  OTP_VERIFICATION = "OTP_VERIFICATION",
}

export const enum SignUpFormStatus {
  complete = "complete",
}

export const enum SignInFormStages {
  WITH_EMAIL = "withEmail",
  WITH_GOOGLE = "withGoogle",
}

export const STEPS = [
  {
    label: "Create Profile",
    stepNumber: 0,
  },
  {
    label: "Verification",
    stepNumber: 1,
  },
];
