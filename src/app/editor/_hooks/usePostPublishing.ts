import { useState } from "react";
import { usePost } from "../_hooks/usePost";
import { useUser } from "~/context/userContext";
import { QueryParams } from "../types/types";

export const usePostPublishing = (queryParams: QueryParams) => {
  const [isCreatePostFormOpen, setIsCreatePostFormOpen] = useState(false);
  const { publishPost } = usePost();
  const { user } = useUser();

  const openCreatePostForm = () => setIsCreatePostFormOpen(true);
  const closeCreatePostForm = () => setIsCreatePostFormOpen(false);

  const handlePublishPost = async (content: string) => {
    await publishPost({
      content,
      authorId: user?.id ?? "",
      authorName: user?.name ?? "",
      authorProfileImageUrl: user?.profileImageUrl ?? "",
      postDetails: {
        title: queryParams.title,
        targetAudience: queryParams.targetAudience,
        postType: queryParams.postType,
        actors: queryParams.actors,
        tags: queryParams.tags,
        thumbnailDetails: {
          url: queryParams.thumbnailUrl,
          content: "",
          title: "",
        },
      },
    });
    setIsCreatePostFormOpen(false);
  };

  const formData = {
    title: queryParams.title,
    actors: queryParams.actors,
    thumbnailUrl: queryParams.thumbnailUrl,
    tags: queryParams.tags,
    postType: queryParams.postType,
    targetAudience: queryParams.targetAudience,
  };

  return { isCreatePostFormOpen, openCreatePostForm, closeCreatePostForm, handlePublishPost, formData };
};
