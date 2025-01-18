"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "../server/client";
import { UserSchema } from "~/app/(with-sidebar)/myprofile/types/types";

export const UserContext = createContext<{
  user: UserSchema | null;
  isLoading: boolean;
}>({
  user: null,
  isLoading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useClerk();
  const [user, setUser] = useState<UserSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userMutation = trpc.user

  const { data, isLoading: isUserLoading } = userMutation.getUserDetails.useQuery(clerkUser?.primaryEmailAddress?.emailAddress);

  useEffect(() => {
    if (data) {
      setUser(data);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (isUserLoading) {
      setIsLoading(true);
    }
  }, [isUserLoading]);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
