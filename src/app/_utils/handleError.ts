import { toast } from "react-toastify";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { type ClerkAPIError } from "@clerk/types";

const handleClerkError = (error: ClerkAPIError | undefined) => {
  const errorMessage = error?.longMessage ?? "Unknown Clerk error occurred.";
  toast.error(errorMessage);
};

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
  if (isClerkAPIResponseError(error)) {
    handleClerkError(error.errors[0]);
  } else {
    handleGeneralError(error); // Fallback for non-Clerk errors
  }
};

export { handleClerkError, handleGeneralError, handleError };
