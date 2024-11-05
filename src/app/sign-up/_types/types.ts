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

export type FormData = FormDataDetails & FormDataInterest;

export type FormDataPartial = FormDataDetails | FormDataInterest;

export type SignUpFormData = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  profile?: string;
  birthdate: Date;
  interests: string[];
};
