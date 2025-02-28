"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useGenresTags } from "../editor/_hooks/useGenreTags";
import { completeOnboarding } from "./_actions";
import { Onboarding, type OnboardingDataType } from "./_components/Onboarding";

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();
  const { genres, tags, isGenresLoading, isTagsLoading } = useGenresTags();

  const handleSubmit = async (data: OnboardingDataType) => {
    const combinedData = {
      genres: [...new Set([...data.writingGenres, ...data.readingGenres])],
      tags: [...new Set([...data.writingTags, ...data.readingTags])],
    };

    const res = await completeOnboarding(combinedData);

    if (res?.message) {
      await user?.reload();
      router.push("/");
    }
  };

  return (
    <Onboarding
      onSubmit={handleSubmit}
      genres={genres}
      tags={tags}
      isGenresLoading={isGenresLoading}
      isTagsLoading={isTagsLoading}
    />
  );
}
