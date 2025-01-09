import {
  MyFeedTabsEnum,
  type ArticlesList,
} from "../types/types";
import { handleError } from "~/app/_utils/handleError";
import config from "~/app/_config/config";
import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { trpc } from "~/server/client";
import useLazyLoading from "~/app/_hooks/useLazyLoading";

type useMyFeedPageReturn = {
  postDataWithComments: ArticlesList[];
  likedPosts: string[];
  queryLoading: boolean;
  hasMorePosts: boolean;
  tab: MyFeedTabsEnum;
  skip: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleLikeButton: (postId: string) => Promise<{ liked: boolean }>;
  handleTabChange: (newTab: MyFeedTabsEnum) => void;
  addComment: (
    postId: string,
    content: string,
    parentId?: string,
  ) => Promise<void>;
  handleScroll: () => void;
  errorMessage: string;
};

const useMyFeedPage = (): useMyFeedPageReturn => {
  const [posts, setPosts] = useState<ArticlesList[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [tab, setTab] = useState<MyFeedTabsEnum>(MyFeedTabsEnum.MY_FEED);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const { user } = useClerk();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const postMutation = trpc.post;
  const likeMutation = trpc.likes;
  const commentMutation = trpc.comments;

  const {
    data: postData,
    isLoading: queryLoading,
    error,
  } = postMutation.getPosts.useQuery(
    {
      skip,
      limit:
        skip === 0 ? config.lazyLoading.initialLimit : config.lazyLoading.limit,
    },
    {
      enabled: hasMorePosts,
    },
  );

  const { handleScroll } = useLazyLoading({
    queryLoading,
    error: error?.message ?? "",
    initialLimit: config.lazyLoading.initialLimit,
    limit: config.lazyLoading.limit,
    skip,
    setSkip,
    hasMoreData: postData?.hasMorePosts ?? false,
    setHasMoreData: setHasMorePosts,
  });

  const postDataWithComments = useMemo(
    () =>
      posts.map((post) => ({
        ...post,
        comments: post.comments.map((comment) => ({
          ...comment,
          postId: post.id,
        })),
      })),
    [posts],
  );

  const { data: likedPostData } = likeMutation.getUserLikes.useQuery(
    { userEmail: userEmail ?? "" },
    { enabled: !!userEmail },
  );

  const likePostMutation = likeMutation.likePost.useMutation();

  const handleLikeButton = useCallback(
    async (postId: string): Promise<{ liked: boolean }> => {
      if (!userEmail) return { liked: false };

      try {
        const response = await likePostMutation.mutateAsync({
          postId,
          userEmail,
        });

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likeCount: response.liked
                    ? post.likeCount + 1
                    : Math.max(0, post.likeCount - 1),
                }
              : post,
          ),
        );

        setLikedPosts((prev) =>
          response.liked
            ? [...prev, postId]
            : prev.filter((id) => id !== postId),
        );

        return { liked: response.liked };
        } catch (error) {
          handleError(error);
        return { liked: false };
      }
    },
    [likePostMutation, userEmail],
  );

  const addCommentMutation = commentMutation.addComment.useMutation();

  const addComment = useCallback(
    async (postId: string, content: string, parentId?: string) => {
      if (!content.trim() || !userEmail) return;

      try {
        const newComment = await addCommentMutation.mutateAsync({
          postId,
          userEmail,
          name:
            user?.firstName ??
            ((user?.unsafeMetadata?.name as string) || "Anonymous"),
          content,
          profile: user.imageUrl,
          parentId,
        });

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: parentId
                    ? post.comments.map((comment) =>
                        comment.id === parentId
                          ? {
                              ...comment,
                              replies: [...(comment.replies ?? []), newComment],
                            }
                          : comment,
                      )
                    : [...post.comments, newComment],
                }
              : post,
          ),
        );
      } catch (error) {
        handleError(error);
      }
    },
    [
      addCommentMutation,
      userEmail,
      user?.firstName,
      user?.unsafeMetadata?.name,
      user?.imageUrl,
    ],
  );

  const handleTabChange = (newTab: MyFeedTabsEnum) => {
    setTab(newTab);
  };

  useEffect(() => {
    if (postData?.posts) {
      setPosts((prev) => [...prev, ...postData.posts]);
    }
  }, [postData]);

  useEffect(() => {
    if (likedPostData) setLikedPosts(likedPostData);
  }, [likedPostData]);

  return {
    postDataWithComments,
    likedPosts,
    queryLoading,
    hasMorePosts,
    tab,
    skip,
    setSkip,
    handleLikeButton,
    handleTabChange,
    addComment,
    handleScroll,
    errorMessage: error?.message ?? "",
  };
};

export default useMyFeedPage;
