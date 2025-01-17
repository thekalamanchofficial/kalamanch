import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Post, PostDetails } from "~/app/(with-sidebar)/myfeed/types/types";
import { handleError } from "~/app/_utils/handleError";
import { trpc } from "~/server/client";
import { CreatePostFormType } from "../types/types";
import { PostType } from "@prisma/client";
import { usePost } from "./usePost";

export const usePublishedPostEditorState = (postId?: string | undefined) => {
  const [publishedPost, setPublishedPost] = useState<Post | null>(null);
  const {updatePostDetails: updatePostDetailsCallBack , updatePostContent: updatePostContentCallBack} = usePost();

  const { data: post } = trpc.post.getPost.useQuery(postId, {
    enabled: Boolean(postId),
  });

  useEffect(() => {
    if (post) {
      setPublishedPost(post);
    }
  }, [post]);

  const updatePostContent = async (content: string) => {
    if (!publishedPost) return;
    if (publishedPost.content === content) return;


    await updatePostContentCallBack(publishedPost.id,content);
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
        url: createPostFormDetails.thumbnailUrl ?? ""
      }
    }
    await updatePostDetailsCallBack(publishedPost.id,postDetails);
    setPublishedPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        postDetails,
      };
    });
  };

  return {
    publishedPost,
    setPublishedPost,
    updatePostContent,
    updatePostDetails,
  };
};
