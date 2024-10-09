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
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  }

  toast.error(`Error: ${errorMessage}`);
};

const handleError = (error: unknown) => {
  console.log("Error", error);

  if (isClerkAPIResponseError(error)) {
    console.log("asdasd");

    handleClerkError(error.errors[0]);
  } else {
    handleGeneralError(error); // Fallback for non-Clerk errors } };
  }
};
export { handleClerkError, handleGeneralError, handleError };
