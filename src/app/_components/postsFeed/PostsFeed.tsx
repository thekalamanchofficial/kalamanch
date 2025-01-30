"use client";
import { type PostsFeedProps } from "~/app/(with-sidebar)/myfeed/types/types";
import { Fragment, memo } from "react";
import Post from "../post/Post";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "~/server/client";
import { Divider } from "@mui/material";

const PostsFeed = memo<PostsFeedProps>(
  ({ articlesList, likedPosts, bookmarkedPosts, setPosts }) => {
    const { user } = useClerk();
    const userEmail = user?.primaryEmailAddress?.emailAddress ?? "";

    const { data: userFollowing } = trpc.user.getUserFollowings.useQuery(
      {
        userEmail,
      },
      {
        enabled: Boolean(userEmail),
      },
    );

    return (
      <>
        {articlesList.map((post) => (
          <Fragment key={post.id}>
            <Post
              post={post}
              userFollowing={userFollowing}
              isLiked={likedPosts?.includes(post.id) ?? false}
              isBookmarked={bookmarkedPosts?.includes(post.id) ?? false}
              setPosts={setPosts}
            />
            <Divider sx={{ my: 2 }} />
          </Fragment>
        ))}
      </>
    );
  },
);

PostsFeed.displayName = "PostsFeed";

export default PostsFeed;
