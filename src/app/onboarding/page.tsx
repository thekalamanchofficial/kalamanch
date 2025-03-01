"use client";

import * as React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useGenresTags } from "../editor/_hooks/useGenreTags";
import { completeOnboarding } from "./_actions";
import { Onboarding, type OnboardingDataType } from "./_components/Onboarding";

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();
  const { genres, tags, isGenresLoading, isTagsLoading } = useGenresTags();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = React.useCallback(
    async (data: OnboardingDataType) => {
      try {
        setIsSubmitting(true);
        const combinedData = {
          readingGenres: Array.from(new Set(data.readingGenres)),
          readingTags: Array.from(new Set(data.readingTags)),
          writingGenres: Array.from(new Set(data.writingGenres)),
          writingTags: Array.from(new Set(data.writingTags)),
        };

        const res = await completeOnboarding(combinedData);

        if (!res?.message) {
          throw new Error("Failed to complete onboarding");
        }

        await user?.reload();
        router.push("/");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Onboarding error:", error.message);
        } else {
          console.error("Onboarding error:", String(error));
        }
        toast.error("Failed to complete onboarding");
      } finally {
        setIsSubmitting(false);
      }
    },
    [router, user],
  );

  return (
    <Onboarding
      onSubmit={handleSubmit}
      genres={genres}
      tags={tags}
      isGenresLoading={isGenresLoading}
      isTagsLoading={isTagsLoading}
      isSubmitting={isSubmitting}
    />
  );
}
