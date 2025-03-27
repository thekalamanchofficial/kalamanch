import { useState } from "react";
import type { PostType } from "@prisma/client";
import type { Post } from "~/app/(with-sidebar)/myfeed/types/types";

type CreatePostFormDataStateProps = {
  postDetails?: Post | null;
};
type CreatePostFormState = {
  formData: {
    title: string;
    actors?: string[];
    tags?: string[];
    genres?: string[];
    postType?: PostType;
    thumbnailUrl?: string;
    thumbnailTitle?: string;
    thumbnailDescription?: string;
    shoewThumbnail: boolean;
  };
  isPublishPostFormOpen: boolean;
  openPublishPostForm: () => void;
  closePublishPostForm: () => void;
};

export const useCreatePostFormDataState = ({
  postDetails,
}: CreatePostFormDataStateProps): CreatePostFormState => {
  const [isPublishPostFormOpen, setIsPublishPostFormOpen] = useState(false);
  const formData = {
    title: postDetails?.title ?? "",
    actors: postDetails?.actors,
    tags: postDetails?.tags?.map((tag) => tag.id),
    postType: postDetails?.postType ?? undefined,
    genres: postDetails?.genres?.map((genre) => genre.id),
    thumbnailUrl: postDetails?.thumbnailDetails.url ?? "",
    thumbnailTitle: postDetails?.thumbnailDetails.title ?? "",
    thumbnailDescription: postDetails?.thumbnailDetails.content ?? "",
    shoewThumbnail: postDetails?.showThumbnail ?? false,
  };
  const openPublishPostForm = () => setIsPublishPostFormOpen(true);
  const closePublishPostForm = () => setIsPublishPostFormOpen(false);

  return { formData, isPublishPostFormOpen, openPublishPostForm, closePublishPostForm };
};
