import { useEffect, useState } from "react";
import type { PostType } from "@prisma/client";
import type { Post, PostDetails } from "~/app/(with-sidebar)/myfeed/types/types";
import { trpc } from "~/server/client";
import { usePost } from "../../_hooks/usePost";
import type { CreatePostFormType } from "../types/types";

type UsePublishedPostEditorStateResponse = {
  publishedPost: Post | null;
  setPublishedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  updatePostContent: (content: string) => Promise<void>;
  updatePostDetails: (createPostFormDetails: CreatePostFormType) => Promise<void>;
};
type UsePublishedPostEditorStateProps = {
  postId?: string | undefined;
};

export const usePublishedPostEditorState = ({
  postId,
}: UsePublishedPostEditorStateProps): UsePublishedPostEditorStateResponse => {
  const [publishedPost, setPublishedPost] = useState<Post | null>(null);
  const {
    updatePostDetails: updatePostDetailsCallBack,
    updatePostContent: updatePostContentCallBack,
  } = usePost();

  const { data: post } = trpc.post.getPost.useQuery(postId, {
    enabled: Boolean(postId),
  });

  const updatePostContent = async (content: string) => {
    if (!publishedPost) return;
    if (publishedPost.content === content) return;

    await updatePostContentCallBack(publishedPost.id, content);
    setPublishedPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        content,
      };
    });
  };

  const updatePostDetails = async (createPostFormDetails: CreatePostFormType) => {
    if (!publishedPost) return;
    const postDetails: PostDetails = {
      title: createPostFormDetails.title,
      targetAudience: createPostFormDetails.targetAudience ?? [],
      postType: createPostFormDetails.postType?.toUpperCase() as PostType,
      actors: createPostFormDetails.actors ?? [],
      tags: createPostFormDetails.tags ?? [],
      thumbnailDetails: {
        url: createPostFormDetails.thumbnailUrl ?? "",
      },
    };
    await updatePostDetailsCallBack(publishedPost.id, postDetails);
    setPublishedPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        postDetails,
      };
    });
  };

  useEffect(() => {
    if (post) {
      setPublishedPost(post);
    }
  }, [post]);

  return {
    publishedPost,
    setPublishedPost,
    updatePostContent,
    updatePostDetails,
  };
};
