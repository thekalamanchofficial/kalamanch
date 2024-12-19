export type FormDataDetails = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  profile?: string;
  birthdate: Date;
};

export type SignUpFormData = {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  profile?: string;
  birthdate: Date;
  interests: string[];
};
