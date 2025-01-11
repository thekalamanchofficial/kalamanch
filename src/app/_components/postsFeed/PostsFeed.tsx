"use client";
import { type PostsFeedProps } from "~/app/(with-sidebar)/myfeed/types/types";
import { memo } from "react";
import Post from "../post/Post";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "~/server/client";

const PostsFeed = memo<PostsFeedProps>(({ articlesList, likedPosts }) => {
  const { user } = useClerk();
  const userEmail = user?.primaryEmailAddress?.emailAddress ?? "";
  
  const { data: userFollowing } = trpc.user.getUserFollowings.useQuery({
    userEmail
  }, {
    enabled: Boolean(userEmail)
  });

  return (
    <>
      {articlesList.map((post) => (
        <Post 
          key={post.id} 
          post={post} 
          userFollowing={userFollowing} 
          isLiked={likedPosts?.includes(post.id) ?? false}
        />
      ))}
    </>
  );
});

PostsFeed.displayName = "PostsFeed";

export default PostsFeed;