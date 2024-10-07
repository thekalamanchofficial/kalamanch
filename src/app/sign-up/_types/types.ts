export type FormDataDetails = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  profile?: string;
  birthdate: Date;
};

export type FormDataInterest = {
  interests: string[];
};

export type FormDataRole = {
  role: string;
};

export type FormData = FormDataDetails & FormDataInterest & FormDataRole;

export type FormDataPartial = FormDataDetails | FormDataInterest | FormDataRole;
