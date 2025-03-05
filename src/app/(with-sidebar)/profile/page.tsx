import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { trpcServer } from "~/app/_trpc/server";
import Profile from "./_components/profile/Profile";

const page = async () => {
  const userTrpcProcedure = trpcServer.user;
  const clerkUser = await currentUser();

  if (!clerkUser?.primaryEmailAddress?.emailAddress) {
    redirect("/sign-in");
  }

  const userDetails = await userTrpcProcedure.getUserDetails(
    clerkUser.primaryEmailAddress?.emailAddress,
  );

  if (!userDetails) {
    redirect("/sign-in");
  }

  const isOwner = clerkUser?.primaryEmailAddress?.emailAddress === userDetails?.email;

  return <Profile userDetails={userDetails} isOwner={isOwner} />;
};

export default page;
