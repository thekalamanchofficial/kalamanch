import { MyProfileTabsEnum } from "~/app/(with-sidebar)/myprofile/types/types";
import {
  type ArticlesList,
  type Comment,
} from "~/app/(with-sidebar)/myfeed/types/types";

import { handleError } from "~/app/_utils/handleError";
import config from "~/app/_config/config";
import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { trpc } from "~/server/client";

type useMyProfilePage = {
  posts: ArticlesList[];
  setPosts: React.Dispatch<React.SetStateAction<ArticlesList[]>>;
  likedPosts: string[];
  queryLoading: boolean;
  hasMorePosts: boolean;
  tab: MyProfileTabsEnum;
  skip: number;
  postDataWithComments: ArticlesList[];
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleLikeButton: (postId: string) => Promise<{ liked: boolean }>;
  handleChange: (newTab: MyProfileTabsEnum) => void;
  addComment: (
    postId: string,
    content: string,
    parent: string,
  ) => Promise<void>;
  handleScroll: () => void;
  errorMessage: string;
  userProfile: string;
  postCount: number;
  userName: string;
  followerCount: number;
  isEditProfileOpen: boolean;
  handleEditProfileClose: () => void;
  handleEditProfileOpen: () => void;
  interests: string[];
  bio: string;
  birthdate: Date;
};

const useMyProfilePage = (): useMyProfilePage => {
  const { user } = useClerk();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const [tab, setTab] = useState(MyProfileTabsEnum.MY_POSTS);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState<boolean | undefined>(true);
  const [post, setPosts] = useState<ArticlesList[]>([]);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // const [];

  const postMutation = trpc.post;
  const likeMutation = trpc.likes;
  const commentMutation = trpc.comments;
  const userMutation = trpc.user;

  const { data: userDetails } = userMutation.getUserDetails.useQuery(
    user?.primaryEmailAddress?.emailAddress,
  );

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

  const postDataWithComments: ArticlesList[] = useMemo(() => {
    return (
      post?.map((postItem) => ({
        ...postItem,
        comments: postItem.comments.map((comment) => ({
          ...comment,
          postId: postItem.id,
        })),
      })) ?? []
    );
  }, [post]);

  const { data: likedPostData } = likeMutation.getUserLikes.useQuery(
    { userEmail: user?.primaryEmailAddress?.emailAddress ?? "" },
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
    },
    [likePostMutation, user?.primaryEmailAddress?.emailAddress],
  );

  const addCommentMutation = commentMutation.addComment.useMutation();

  const updatePostComments = (
    post: ArticlesList,
    postId: string,
    newComment: Comment,
    parentId?: string,
  ): ArticlesList => {
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
        ? addReplyToParent(post.comments, parentId, { ...newComment, postId })
        : [...post.comments, { ...newComment, postId }],
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
            userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
            name:
              user?.firstName === null
                ? (user?.unsafeMetadata?.name as string)
                : user?.firstName,
            content,
            profile: user.imageUrl,
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
    userName: user?.fullName ?? "",
    isEditProfileOpen,
    handleEditProfileClose,
    handleEditProfileOpen,
    interests: userDetails?.interests ?? [],
    bio: userDetails?.bio ?? "",
    birthdate: userDetails?.birthdate
      ? new Date(userDetails.birthdate)
      : new Date(),
  };
};

export default useMyProfilePage;
