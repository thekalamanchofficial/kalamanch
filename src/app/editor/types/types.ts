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
  editorPostId: string;
  createdAt: string;
  updatedAt: string;
};


export type DraftPost = {
  id: string;
  authorName: string;
  authorProfile: string;
  authorId: string;
  content: string;
  postDetails: PostDetails;
  iterations: Iteration[];
  createdAt: string;
  updatedAt: string;
};
