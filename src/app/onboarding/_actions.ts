"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

type OnboardingSubmitData = {
  readingGenres: string[];
  readingTags: string[];
  writingGenres: string[];
  writingTags: string[];
};

export const completeOnboarding = async (formData: OnboardingSubmitData) => {
  const { userId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = clerkClient();

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        readingInterests: {
          genres: formData.readingGenres,
          tags: formData.readingTags,
        },
        writingInterests: {
          genres: formData.writingGenres,
          tags: formData.writingTags,
        },
      },
    });

    return {
      message: res.publicMetadata,
    };
  } catch {
    return { error: "There was an error updating the user metadata." };
  }
};
