export const enum SignUpFormStages {
  DETAILS = "DETAILS",
  INTEREST = "INTEREST",
  OTP_VERIFICATION = "OTP_VERIFICATION",
}

export const enum SignUpFormStatus {
  complete = "complete",
}

export const enum SignInFormStages {
  WITH_EMAIL = "withEmail",
  WITH_GOOGLE = "withGoogle",
}

export const INTEREST_ARRAY = [
  "Technology",
  "Science",
  "Arts",
  "Literature",
  "Philosophy",
  "History",
  "Politics",
  "Economics",
  "Society",
  "Culture",
  "Sports",
  "Health",
  "Education",
];

export const STEPS = [
  {
    label: "Create Profile",
    stepNumber: 0,
  },
  {
    label: "Add Interests",
    stepNumber: 1,
  },
  {
    label: "Verification",
    stepNumber: 2,
  },
];
