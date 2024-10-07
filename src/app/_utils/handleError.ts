import { toast } from "react-toastify";

// Clerk-specific error types
type subClerkError = {
  code: string;
  message: string;
  longMessage: string;
  meta: {
    field: string;
    value: string;
  };
};

type clerkErrorType = {
  code: string;
  clerkError: boolean;
  errors: Array<subClerkError>;
};

// Type guard to check if the error is a Clerk error
const isClerkError = (error: unknown): error is clerkErrorType => {
  return (
    typeof error === "object" &&
    error !== null &&
    "clerkError" in error &&
    Array.isArray((error as clerkErrorType).errors)
  );
};

// Handle Clerk-specific errors
const handleClerkError = (error: unknown) => {
  if (isClerkError(error)) {
    const errorMessage =
      error.errors?.[0]?.longMessage ?? "Unknown Clerk error occurred.";
    toast.error(`${errorMessage}`);
  }
};

// Handle non-Clerk (general) errors
const handleGeneralError = (error: unknown) => {
  let errorMessage = "An unexpected error occurred.";

  if (error instanceof Error) {
    // Handle standard JavaScript Error
    errorMessage = error.message;
  } else if (typeof error === "string") {
    // Handle string-based errors
    errorMessage = error;
  }

  toast.error(`Error: ${errorMessage}`);
};

// Combined error handler that first checks Clerk errors and then falls back to general errors
const handleError = (error: unknown) => {
  if (isClerkError(error)) {
    handleClerkError(error);
  } else {
    handleGeneralError(error); // Fallback for non-Clerk errors
  }
};

export { handleClerkError, handleGeneralError, handleError };
