"use client";

import { Fragment, memo } from "react";
import { useClerk } from "@clerk/nextjs";
import { Divider } from "@mui/material";
import { type PostsFeedProps } from "~/app/(with-sidebar)/myfeed/types/types";
import { trpc } from "~/server/client";
import Post from "../post/Post";

const PostsFeed = memo<PostsFeedProps>(
  ({ articlesList, likedPosts, bookmarkedPosts, setPosts, isUserPublishedPostFeed }) => {
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
              isUserPublishedPostFeed={isUserPublishedPostFeed}
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
