import { PostDetails } from "~/app/(with-sidebar)/myfeed/types/types";

export enum EditorTabsEnum {
  EDITOR = "Editor",
  DRAFTS = "Drafts",
  PUBLISHED = "Published",
}
export type CreatePostFormType = {
  title: string;
  targetAudience?: string[];
  thumbnailUrl?: string;
  postType?: string;
  tags?: string[];
  actors?: string[];
};

export type Iteration = {
  id: string;
  iterationName: string;
  content: string;
  draftPostId: string;
  createdAt: string;
  updatedAt: string;
};


export type DraftPost = {
  id?: string;
  authorName: string;
  authorProfileImageUrl: string;
  authorId: string;
  postDetails: PostDetails;
  iterations: Iteration[];
  createdAt: string;
  updatedAt: string;
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

