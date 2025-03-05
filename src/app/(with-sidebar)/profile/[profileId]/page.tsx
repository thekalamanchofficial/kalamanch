import { trpcServer } from "~/app/_trpc/server";
import Profile from "../_components/profile/Profile";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

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

  return {
    title: userDetails?.name,
    description: userDetails?.bio,
    openGraph: {
      title: userDetails?.name,
      description: userDetails?.bio,
      images: userDetails?.profileImageUrl,
    },
    twitter: {
      title: userDetails?.name,
      description: userDetails?.bio,
      images: userDetails?.profileImageUrl,
    },
    alternates: {
      canonical: `/profile/${userDetails?.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: userDetails?.profileImageUrl,
    },
    themeColor: "#000000",
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    category: "social",
    creator: userDetails?.name,
    publisher: userDetails?.name,
    authors: [userDetails?.name],
    section: "social",
    tag: userDetails?.name,
    url: `https://${process.env.NEXT_PUBLIC_BASE_URL}/profile/${userDetails?.id}`,
    locale: "en",
    type: "website",
    siteName: userDetails?.name,
    images: userDetails?.profileImageUrl,
    localeAlternates: ["en", "en-US", "en-GB"],
  };
}
