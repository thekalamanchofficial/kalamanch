"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "~/server/client";
import { useUser } from "~/context/userContext";

type SendForReviewReturn = {
    sendForReviewDialogOpen: boolean;
    setSendForReviewDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleSendForReview: (selectedUsersForReview: string[], iterationId: string | undefined) => Promise<void>;
}

export const useSendForReview = ():SendForReviewReturn => {
  const { user } = useUser();
  const [sendForReviewDialogOpen, setSendForReviewDialogOpen] = useState(false);
  const handleSendForReviewMutation = trpc.draftPostIterationReview.saveDraftPostIterationReviewers.useMutation();

  const handleSendForReview = async (selectedUsersForReview: string[], iterationId: string | undefined) => {
    setSendForReviewDialogOpen(false);
    if (!iterationId) return;
    try {
      await handleSendForReviewMutation.mutateAsync({
        requesterId: user?.id ?? "",
        iterationId,
        reviewers: selectedUsersForReview,
      });
      toast.success("Sent for review successfully");
    } catch (error) {
      toast.error("Failed to send for review");
      console.error(error);
    }
  };

  return {
    sendForReviewDialogOpen,
    setSendForReviewDialogOpen,
    handleSendForReview,
  };
};
