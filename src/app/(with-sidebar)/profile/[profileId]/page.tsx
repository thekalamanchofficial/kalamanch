import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { trpcServer } from "~/app/_trpc/server";
import Profile from "../_components/profile/Profile";

const page = async ({ params }: { params: { profileId: string } }) => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    redirect("/sign-in");
  }

  const userTrpcProcedure = trpcServer.user;
  const userDetails = await userTrpcProcedure.getUserDetailsById(params.profileId);

  const isOwner = clerkUser?.primaryEmailAddress?.emailAddress === userDetails?.email;

  if (!userDetails) {
    redirect("/");
  }

  return <Profile userDetails={userDetails} isOwner={isOwner} />;
};

export default page;

export async function generateMetadata({ params }: { params: { profileId: string } }) {
  const userTrpcProcedure = trpcServer.user;
  const userDetails = await userTrpcProcedure.getUserDetailsById(params.profileId);

  if (!userDetails) {
    return {
      title: "User Profile",
      description: "User profile page",
    };
  }

  const profileImageUrl = userDetails.profileImageUrl || undefined;

  return {
    title: userDetails.name ?? "User Profile",
    description: userDetails.bio ?? "User profile page",
    openGraph: {
      title: userDetails.name ?? "User Profile",
      description: userDetails.bio ?? "User profile page",
      images: profileImageUrl ? [profileImageUrl] : undefined,
    },
    twitter: {
      title: userDetails.name ?? "User Profile",
      description: userDetails.bio ?? "User profile page",
      images: profileImageUrl ? [profileImageUrl] : undefined,
    },
    alternates: {
      canonical: `/profile/${userDetails.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: profileImageUrl
      ? {
          icon: profileImageUrl,
        }
      : undefined,
    themeColor: "#000000",
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    category: "social",
    creator: userDetails.name ?? "User",
    publisher: userDetails.name ?? "User",
    authors: [{ name: userDetails.name ?? "User" }],
    keywords: ["profile", "social", userDetails.name ?? "user"],
  };
}
