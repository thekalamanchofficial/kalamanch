import {
  MyProfileTabsEnum,
  type SaveUserInfo,
} from "~/app/(with-sidebar)/myprofile/types/types";
import {
  type Post,
  type Comment,
} from "~/app/(with-sidebar)/myfeed/types/types";

import { handleError } from "~/app/_utils/handleError";
import config from "~/app/_config/config";
import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { trpc } from "~/server/client";
import { toast } from "react-toastify";
import {
  type UserInfo,
  type UseMyProfilePage,
} from "~/app/(with-sidebar)/myprofile/types/types";
import { PostStatus } from "~/app/editor/types/types";

const useMyProfilePage = (): UseMyProfilePage => {
  const { user } = useClerk();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const [tab, setTab] = useState(MyProfileTabsEnum.MY_POSTS);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState<boolean | undefined>(true);
  const [post, setPosts] = useState<Post[]>([]);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    bio: "",
    interests: [],
    birthdate: new Date(),
    education: [],
    professionalAchievements: "",
  });

  const postMutation = trpc.post;
  const likeMutation = trpc.likes;
  const commentMutation = trpc.comments;
  const userMutation = trpc.user;

  const { data: userDetails } = userMutation.getUserDetails.useQuery(
    user?.primaryEmailAddress?.emailAddress,
  );

  const { data: userLikedPosts } = likeMutation.getUserLikedPost.useQuery(
    {
      userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
      postStatus: PostStatus.PUBLISHED.toString().toUpperCase()
    },
    {
      enabled: !!user?.primaryEmailAddress?.emailAddress,
    },
  );

  useEffect(() => {
    setUserInfo({
      name: userDetails?.name ?? "",
      bio: userDetails?.bio ?? "",
      interests: userDetails?.interests ?? [],
      birthdate: userDetails?.birthdate
        ? new Date(userDetails.birthdate)
        : new Date(),
      education: userDetails?.education ?? [],
      professionalAchievements: userDetails?.professionalCredentials ?? "",
    });
  }, [userDetails]);

  const {
    data: postData,
    isLoading: queryLoading,
    error,
  } = postMutation.getPosts.useQuery(
    {
      authorId: userDetails?.id,
      skip,
      limit:
        skip === 0 ? config.lazyLoading.initialLimit : config.lazyLoading.limit,
    },
    {
      enabled: Boolean(userDetails?.id) && skip >= 0 && hasMorePosts === true,
    },
  );

  const postDataWithComments: Post[] = useMemo(() => {
    return (
      post?.map((postItem) => ({
        ...postItem,
        comments: postItem.comments?.map((comment) => ({
          ...comment,
          postId: postItem.id,
        })),
      })) ?? []
    );
  }, [post]);

  const { data: likedPostData } = likeMutation.getUserLikes.useQuery(
    { userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
      postStatus: PostStatus.PUBLISHED.toString().toUpperCase()
     },
    {
      enabled: !!user?.primaryEmailAddress?.emailAddress,
    },
  );

  const likePostMutation = likeMutation.likePost.useMutation();

  const handleEditProfileOpen = () => {
    setIsEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false);
  };

  const handleLikeButton = useCallback(
    async (postId: string): Promise<{ liked: boolean }> => {
      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const response = await likePostMutation.mutateAsync({
            postId,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            postStatus: PostStatus.PUBLISHED.toString().toUpperCase()
          });

          const updatePostLikeCount = (
            post: Post,
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
    },
    [likePostMutation, user?.primaryEmailAddress?.emailAddress],
  );

  const addCommentMutation = commentMutation.addComment.useMutation();

  const updatePostComments = (
    post: Post,
    postId: string,
    newComment: Comment,
    parentId?: string,
  ): Post => {
    if (post.id !== postId) return post;

    const addReplyToParent = (
      comments: Comment[],
      parentId: string,
      newReply: Comment,
    ): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies ?? []), newReply],
          };
        }
        return {
          ...comment,
          replies: addReplyToParent(comment.replies ?? [], parentId, newReply),
        };
      });
    };

    return {
      ...post,
      comments: parentId
        ? addReplyToParent(post.comments ?? [], parentId, { ...newComment, postId })
        : [...post.comments ?? [], { ...newComment, postId }],
    };
  };

  const addComment = useCallback(
    async (
      postId: string,
      content: string,
      parentId?: string,
    ): Promise<void> => {
      if (!content.trim()) return;

      if (user?.primaryEmailAddress?.emailAddress) {
        try {
          const newComment = await addCommentMutation.mutateAsync({
            postId,
            postStatus: PostStatus.PUBLISHED.toString().toUpperCase(),
            userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
            userName:
              user?.firstName === null
                ? (user?.unsafeMetadata?.name as string)
                : user?.firstName,
            content,
            userProfileImageUrl: user.imageUrl ?? "",
            parentId,
          });

          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              updatePostComments(post, postId, newComment, parentId),
            ),
          );
        } catch (error) {
          handleError(error);
        }
      }
    },
    [
      addCommentMutation,
      user?.firstName,
      user?.imageUrl,
      user?.primaryEmailAddress?.emailAddress,
      user?.unsafeMetadata?.name,
    ],
  );

  const handleChange = (newTab: MyProfileTabsEnum) => {
    setTab(newTab);
  };

  const updateUser = userMutation.updateUser.useMutation();

  const handleSave = async ({
    name,
    bio,
    interests,
    birthdate,
    education,
    professionalAchievements,
  }: {
    name: string;
    bio: string;
    birthdate: Date;
    interests: string[];
    education: string[];
    professionalAchievements: string;
  }) => {
    const toastId = toast.loading("Updating profile...");

    try {
      await updateUser.mutateAsync({
        name,
        bio,
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        birthdate,
        education,
        achievements: professionalAchievements,
        interests,
      });
      toast.update(toastId, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setUserInfo({
        name,
        bio,
        interests,
        birthdate,
        education,
        professionalAchievements,
      });
    } catch (error) {
      handleError(error);
      toast.update(toastId, {
        render: "Failed to update profile. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const callSave = async ({
    name,
    bio,
    birthdate,
    interests,
    education,
    professionalAchievements,
  }: SaveUserInfo) => {
    try {
      await handleSave({
        name,
        birthdate,
        bio: bio ?? "",
        interests: interests ?? [],
        education: education ?? [],
        professionalAchievements: professionalAchievements ?? "",
      });
      handleEditProfileClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomReached = scrollHeight - scrollTop - clientHeight < 10;

    if (bottomReached && !queryLoading && !error) {
      setHasMorePosts(postData?.hasMorePosts);
      setSkip((prev) =>
        prev == 0
          ? config.lazyLoading.initialLimit + prev
          : prev + config.lazyLoading.limit,
      );
    }
  }, [error, postData?.hasMorePosts, queryLoading]);

  useEffect(() => {
    setPosts((prevPosts) => [...(prevPosts ?? []), ...(postData?.posts ?? [])]);
  }, [postData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, hasMorePosts, queryLoading]);

  useEffect(() => {
    if (likedPostData) {
      setLikedPosts(likedPostData);
    }
  }, [likedPostData]);

  return {
    posts: postDataWithComments,
    setPosts,
    likedPosts,
    queryLoading,
    hasMorePosts: !!hasMorePosts,
    postDataWithComments,
    tab,
    skip,
    setSkip,
    handleLikeButton,
    handleChange,
    errorMessage: error?.message ?? "",
    addComment,
    handleScroll,
    userProfile: user?.imageUrl ?? "",
    postCount: userDetails?.posts.length ?? 0,
    followerCount: userDetails?.followers.length ?? 0,
    isEditProfileOpen,
    handleEditProfileClose,
    handleEditProfileOpen,
    handleSave,
    userLikedPosts: userLikedPosts ?? [],
    userInfo,
    callSave,
  };
};

export default useMyProfilePage;
