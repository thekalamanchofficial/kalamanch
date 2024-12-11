"use client";
import { Grid2 as Grid } from "@mui/material";
import React, { useState } from "react";
import CustomTabs from "~/app/_components/CustomTabs/CustomTabs";
import ProfileCard from "~/app/_components/myProfile/profileCard/ProfileCard";
import { MyProfileTabsEnum } from "./types/types";
import { tabs } from "./_config/config";
import PostsFeed from "~/app/_components/postsFeed/PostsFeed";
import mockData from "./mocks/myProfileMock";
import { type ArticlesList } from "~/app/(with-sidebar)/myfeed/types/types";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "~/server/client";
import { handleError } from "~/app/_utils/handleError";

const MyProfile = () => {
  const [activeTab, setActiveTab] = React.useState(MyProfileTabsEnum.MY_POSTS);
  const [posts, setPosts] = useState<ArticlesList[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const handleTabChange = (newTab: MyProfileTabsEnum) => {
    setActiveTab(newTab);
  };

  const { user } = useClerk();

  const postMutation = trpc.post;
  const likeMutation = trpc.likes;
  const commentMutation = trpc.comments;

  const likePostMutation = likeMutation.likePost.useMutation();

  const handleLikeButton = async (
    postId: string,
  ): Promise<{ liked: boolean }> => {
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const response = await likePostMutation.mutateAsync({
          postId,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        });

        const updatePostLikeCount = (
          post: ArticlesList,
          postId: string,
          liked: boolean,
        ) => {
          if (post.id !== postId) return post;

          return {
            ...post,
            likeCount: liked
              ? post.likeCount + 1
              : Math.max(0, post.likeCount - 1),
          };
        };

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            updatePostLikeCount(post, postId, response.liked),
          ),
        );

        if (response.liked) {
          setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
        } else {
          setLikedPosts((prevLikedPosts) =>
            prevLikedPosts.filter((id) => id !== postId),
          );
        }

        return { liked: response.liked };
      } catch (error) {
        handleError(error);
        return { liked: false };
      }
    }

    return { liked: false };
  };

  const addCommentMutation = commentMutation.addComment.useMutation();

  const updatePostComments = (
    post: ArticlesList,
    postId: string,
    newComment: Comment,
  ) => {
    if (post.id !== postId) return post;

    return {
      ...post,
      comments: [...post.comments, newComment],
    };
  };

  const addComment = async (postId: string, content: string): Promise<void> => {
    if (!content.trim()) return;

    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const newComment = await addCommentMutation.mutateAsync({
          postId,
          userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
          name:
            user?.firstName === null
              ? (user?.unsafeMetadata?.name as string)
              : user?.firstName,
          content,
          profile: user.imageUrl,
        });

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            updatePostComments(post, postId, {
              ...newComment,
              articleId: postId,
            }),
          ),
        );
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <Grid columns={1}>
      <ProfileCard
        coverImage="https://picsum.photos/200"
        bio="bio"
        followers="1M"
        posts="4000"
        profileImage="https://picsum.photos/200"
        name="kalamanch"
      />
      <CustomTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      {activeTab === MyProfileTabsEnum.MY_POSTS ? (
        <PostsFeed
          articlesList={mockData.articlesList}
          likedPosts={[]}
          handleLikeButton={handleLikeButton}
          addCommment={addComment}
        />
      ) : (
        <div>Liked Posts</div>
      )}
    </Grid>
  );
};

export default MyProfile;
