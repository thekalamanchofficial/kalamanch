import { toast } from "react-toastify";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { type ClerkAPIError } from "@clerk/types";
import { TRPCClientError } from "@trpc/client";

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

  toast.error(errorMessage);
};

const handleTRPCError = (error: unknown) => {
  if (
    error instanceof TRPCClientError &&
    error.message.includes(
      "Unique constraint failed on the constraint: `User_email_key`",
    )
  ) {
    toast.error(
      "This email is already registered. Please use a different email or login.",
    );
  } else {
    toast.error("An error occurred. Please try again.");
  }
};

const handleError = (error: unknown) => {
  if (isClerkAPIResponseError(error)) {
    handleClerkError(error.errors[0]);
  } else if (error instanceof TRPCClientError) {
    handleTRPCError(error);
  } else {
    handleGeneralError(error);
  }
};
export { handleClerkError, handleGeneralError, handleError };
