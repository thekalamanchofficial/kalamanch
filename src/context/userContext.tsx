"use client";

import { createContext, useContext } from "react";
import { useClerk } from "@clerk/nextjs";
import { type UserSchema } from "~/app/(with-sidebar)/myprofile/types/types";
import { trpc } from "../server/client";

export const UserContext = createContext<{
  user: UserSchema | null;
  isLoading: boolean;
}>({
  user: null,
  isLoading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useClerk();
  const userMutation = trpc.user;

  const { data: user, isLoading: isUserLoading } = userMutation.getUserDetails.useQuery(
    clerkUser?.primaryEmailAddress?.emailAddress,
    {
      enabled: !!clerkUser?.primaryEmailAddress?.emailAddress,
    },
  );

  return (
    <UserContext.Provider value={{ user: user ?? null, isLoading: isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
