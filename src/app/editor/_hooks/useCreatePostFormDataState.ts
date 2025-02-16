import type { PostType } from "@prisma/client";
import { useState } from "react";
import type { Post } from "~/app/(with-sidebar)/myfeed/types/types";

type CreatePostFormDataStateProps = {
  postDetails?: Post | null;
};
type CreatePostFormState = {
  formData: {
    title: string;
    actors?: string[];
    thumbnailUrl?: string;
    tags?: string[];
    postType?: PostType;
    targetAudience?: string[];
  };
  isCreatePostFormOpen: boolean;
  openCreatePostForm: () => void;
  closeCreatePostForm: () => void;
};

export const useCreatePostFormDataState = ({
  postDetails,
}: CreatePostFormDataStateProps): CreatePostFormState => {
  const [isCreatePostFormOpen, setIsCreatePostFormOpen] = useState(false);
  const formData = {
    title: postDetails?.title ?? "",
    actors: postDetails?.actors,
    thumbnailUrl: postDetails?.thumbnailDetails.url,
    tags: postDetails?.tags?.map((tag) => tag.name),
    postType: postDetails?.postType,
  };
  const openCreatePostForm = () => setIsCreatePostFormOpen(true);
  const closeCreatePostForm = () => setIsCreatePostFormOpen(false);

  return { formData, isCreatePostFormOpen, openCreatePostForm, closeCreatePostForm };
};
