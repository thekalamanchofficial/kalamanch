import { useEffect, useState } from "react";
import type { Post, UpdatePostDetailsProps } from "~/app/(with-sidebar)/myfeed/types/types";
import { trpc } from "~/server/client";
import { usePost } from "../../_hooks/usePost";
import type { CreatePostFormType } from "../types/types";
import { useGenresTags } from "./useGenreTags";

type UsePublishedPostEditorStateResponse = {
  publishedPost: Post | null;
  setPublishedPost: React.Dispatch<React.SetStateAction<Post | null>>;
  updatePostContent: (content: string) => Promise<void>;
  updatePostDetails: (updatePostDetails: CreatePostFormType) => Promise<void>;
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

  const { tags, genres } = useGenresTags();

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

  const updatePostDetails = async (updateFormDetails: CreatePostFormType) => {
    if (!publishedPost) return;
    const updatePostDetails: UpdatePostDetailsProps = {
      id: publishedPost.id,
      title: updateFormDetails.title,
      postType: updateFormDetails.postTypeId,
      actors: updateFormDetails.actors,
      tags: updateFormDetails.tags,
      genres: updateFormDetails.genres,
      thumbnailDetails: {
        url: updateFormDetails.thumbnailUrl,
        content: updateFormDetails.thumbnailDescription,
        title: updateFormDetails.thumbnailTitle,
      },
    };
    const updatedPost = await updatePostDetailsCallBack(publishedPost.id, updatePostDetails);
    if (!updatedPost) return;
    setPublishedPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        ...updatedPost,
        tags: tags.filter((tag) => updateFormDetails.tags?.includes(tag.id)),
        genres: genres.filter((genre) => updateFormDetails.genres?.includes(genre.id)),
        createdAt: new Date(updatedPost?.createdAt).toISOString(),
        updatedAt: new Date(updatedPost?.updatedAt).toISOString(),
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
