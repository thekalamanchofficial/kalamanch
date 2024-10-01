export const validateStep1 = (values: {
  email: string;
  name: string;
  birthdate: string | Date;
  password: string;
  confirmPassword: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Email validation
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(values.email)
  ) {
    errors.email = "Invalid email format.";
  }

  // Name validation
  if (!values.name) {
    errors.name = "Name is required.";
  } else if (!/^[A-Za-z\s]+$/.test(values.name)) {
    errors.name = "Name can only contain letters and spaces.";
  } else if (values.name.length < 2 || values.name.length > 50) {
    errors.name = "Name must be between 2 and 50 characters.";
  }

  // Date of birth validation
  const birthDate = new Date(values.birthdate);
  const today = new Date();
  if (!values.birthdate || values.birthdate == "") {
    errors.birthdate = "Date of birth is required.";
  } else if (birthDate >= today) {
    errors.birthdate = "Date of birth cannot be in the future.";
  } else if (today.getFullYear() - birthDate.getFullYear() < 13) {
    errors.birthdate = "You must be at least 13 years old.";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Password must contain at least one uppercase letter.";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Password must contain at least one lowercase letter.";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Password must contain at least one number.";
  } else if (!/[!@#$%^&*]/.test(values.password)) {
    errors.password = "Password must contain at least one special character.";
  }

  // Confirm password validation
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm password is required.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  // Check if there are any errors
  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors: isValid ? {} : { ...errors, firstError: Object.values(errors)[0] },
  };
};
