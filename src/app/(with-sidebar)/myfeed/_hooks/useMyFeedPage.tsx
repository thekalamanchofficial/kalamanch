import {
  MyFeedTabsEnum,
  type Post,
  type Comment,
} from "../types/types";
import { handleError } from "~/app/_utils/handleError";
import config from "~/app/_config/config";
import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { trpc } from "~/server/client";
import useLazyLoading from "~/app/_hooks/useLazyLoading";

type useMyFeedPageReturn = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  likedPosts: string[];
  queryLoading: boolean;
  hasMorePosts: boolean;
  tab: MyFeedTabsEnum;
  skip: number;
  postDataWithComments: Post[];
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
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [tab, setTab] = useState(MyFeedTabsEnum.MY_FEED);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const [post, setPosts] = useState<Post[]>([]);

  const { user } = useClerk();

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
      enabled: skip >= 0 && hasMorePosts === true,
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

  const postDataWithComments: Post[] = useMemo(() => {
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

  const handleChange = (newTab: MyFeedTabsEnum) => {
    setTab(newTab);
  };

  useEffect(() => {
    setPosts((prevPosts) => [...(prevPosts ?? []), ...(postData?.posts ?? [])]);
  }, [postData]);

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
