"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = clerkClient();

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        applicationName: formData.get("applicationName"),
        applicationType: formData.get("applicationType"),
      },
    });

    return {
      message: res.publicMetadata,
      user: {
        email: res.emailAddresses?.[0]?.emailAddress,
        name: res.firstName,
      },
    };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
