import { currentUser } from "@clerk/nextjs/server";
import { trpcServer } from "~/app/_trpc/server";
import BookmarkPostFeed from "./_components/BookmarkPostFeed";
import { PostStatus } from "~/app/editor/types/types";

export default async function SavedPage() {
  const userEmail = String(
    (await currentUser())?.emailAddresses[0]?.emailAddress,
  );
  const userFollowing = await trpcServer.user.getUserFollowings({
    userEmail,
  });
  const userLikes = await trpcServer.likes.getUserLikes({
    userEmail,
    postStatus: PostStatus.PUBLISHED.toString().toUpperCase(),
  });
  return (
    <BookmarkPostFeed
      userFollowing={userFollowing ?? []}
      userLikes={userLikes ?? []}
      userEmail={userEmail}
    />
  );
}
