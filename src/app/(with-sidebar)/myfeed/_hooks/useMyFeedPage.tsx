import {
  MyFeedTabsEnum,
  type ArticlesList,
  type Comment,
} from "../types/types";
import { handleError } from "~/app/_utils/handleError";
import config from "~/app/_config/config";
import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { trpc } from "~/server/client";

type useMyFeedPageReturn = {
  posts: ArticlesList[];
  setPosts: React.Dispatch<React.SetStateAction<ArticlesList[]>>;
  likedPosts: string[];
  queryLoading: boolean;
  hasMorePosts: boolean;
  tab: MyFeedTabsEnum;
  skip: number;
  postDataWithComments: ArticlesList[];
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleLikeButton: (postId: string) => Promise<{ liked: boolean }>;
  handleChange: (newTab: MyFeedTabsEnum) => void;
  addComment: (
    postId: string,
    content: string,
    parent: string,
  ) => Promise<void>;
  handleScroll: () => void;
  errorMessage: string;
};

const useMyFeedPage = (): useMyFeedPageReturn => {
  const { user } = useClerk();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const [tab, setTab] = useState(MyFeedTabsEnum.MY_FEED);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState<boolean | undefined>(true);
  const [post, setPosts] = useState<ArticlesList[]>([]);

  const postMutation = trpc.post;
  const likeMutation = trpc.likes;
  const commentMutation = trpc.comments;

  const {
    data: postData,
    isLoading: queryLoading,
    error,
  } = postMutation.getPosts.useQuery(
    { skip, limit: config.lazyLoading.limit },
    {
      enabled: skip >= 0 && hasMorePosts === true,
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
            replies: [...(comment.replies || []), newReply],
          };
        }
        return {
          ...comment,
          replies: addReplyToParent(comment.replies || [], parentId, newReply),
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

  const handleChange = (newTab: MyFeedTabsEnum) => {
    setTab(newTab);
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomReached = scrollHeight - scrollTop - clientHeight < 10;

    if (bottomReached && !queryLoading && !error) {
      setHasMorePosts(postData?.hasMorePosts);
      setSkip((prev) => prev + 2);
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
  };
};

export default useMyFeedPage;
