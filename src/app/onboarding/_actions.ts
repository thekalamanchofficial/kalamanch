"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

type OnboardingSubmitData = {
  genres: string[];
  tags: string[];
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
        genres: formData.genres,
        tags: formData.tags,
      },
    });

    return {
      message: res.publicMetadata,
    };
  } catch {
    return { error: "There was an error updating the user metadata." };
  }
};
