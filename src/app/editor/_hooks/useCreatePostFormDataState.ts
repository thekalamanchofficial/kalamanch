import { useState } from "react";
import type { PostDetails } from "~/app/(with-sidebar)/myfeed/types/types";

type CreatePostFormDataStateProps = {
  postDetails?: PostDetails;
};
type CreatePostFormState = {
  formData: {
    title: string;
    actors?: string[];
    thumbnailUrl?: string;
    tags?: string[];
    postType?: string;
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
    tags: postDetails?.tags,
    postType: postDetails?.postType.toLowerCase(),
    targetAudience: postDetails?.targetAudience,
  };
  const openCreatePostForm = () => setIsCreatePostFormOpen(true);
  const closeCreatePostForm = () => setIsCreatePostFormOpen(false);

  return { formData, isCreatePostFormOpen, openCreatePostForm, closeCreatePostForm };
};
