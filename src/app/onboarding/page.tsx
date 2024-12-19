"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "./_actions";
import { Onboarding, type OnboardingDataType } from "./_components/Onboarding";

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (data: OnboardingDataType) => {
    const res = await completeOnboarding(data);

    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload();
      router.push("/");
    }
  };
  return <Onboarding onSubmit={handleSubmit} />;
}
