import type { ThumbnailDetails } from "~/app/(with-sidebar)/myfeed/types/types";

export enum EditorTabsEnum {
  EDITOR = "Editor",
  PUBLISHED = "Published",
}
export type CreatePostFormType = {
  title: string;
  thumbnailUrl?: string;
  thumbnailTitle?: string;
  thumbnailDescription?: string;
  genres?: string[];
  postTypeId?: string;
  tags?: string[];
  actors?: string[];
  showThumbnail: boolean;
};

export type Iteration = {
  id: string;
  iterationName: string;
  content: string;
  draftPostId: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
};

export type DraftPost = {
  id: string;
  authorName: string;
  authorProfileImageUrl: string;
  authorId: string;
  iterations: Iteration[];
  createdAt: string;
  updatedAt: string;
  title: string;
};

export type PublishDraftPostProps = {
  id: string;
  authorName: string;
  authorProfileImageUrl: string;
  authorId: string;
  title: string;
  postType?: string;
  actors?: string[];
  tags?: string[];
  genres?: string[];
  thumbnailDetails: ThumbnailDetails;
  iterations: Iteration[];
};

export type CreateDraftPostProps = {
  authorName: string;
  authorProfileImageUrl: string;
  authorId: string;
  title: string;
  iterations: {
    iterationName: string;
    content: string;
  }[];
};

export type QueryParams = {
  postId: string;
  draftPostId: string;
  title: string;
  targetAudience: string[];
  postType: string;
  actors: string[];
  tags: string[];
  thumbnailUrl: string;
};

export enum PostStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum PostEntityType {
  DRAFT_POST = "Draft Posts",
  PUBLISHED_POST = "Published Posts",
  DRAFT_ITERATION_SENT_FOR_REVIEW = "Draft Iterations Sent for Review",
}
