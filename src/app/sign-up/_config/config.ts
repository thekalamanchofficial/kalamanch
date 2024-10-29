export const enum SignUpFormStages {
  DETAILS = "DETAILS",
  INTEREST = "INTEREST",
  ROLE = "ROLE",
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

export const ROLES = {
  A: "Reader",
  B: "Writer",
  C: "Seller",
};

export const STEPS = [
  {
    label: "Create Profile",
    stepNumber: 0,
  },
  {
    title: "Add Interests",
    stepNumber: 1,
  },
  {
    title: "Ready to go",
    stepNumber: 2,
  },
];
