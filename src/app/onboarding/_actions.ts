"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { type OnboardingDataType } from "./_components/Onboarding";

export const completeOnboarding = async (formData: OnboardingDataType) => {
  const { userId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = clerkClient();

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        interests: formData.interests,
      },
    });

    return {
      message: res.publicMetadata,
    };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
