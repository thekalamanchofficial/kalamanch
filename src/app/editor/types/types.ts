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

type Metadata = {
  id: string;
  title: string;
  targetAudience: string[];
  thumbnailUrl: string;
  postType: string;
  actors: string[];
  tags: string[];
};

export type EditorPost = {
  id: string;
  title: string;
  authorName: string;
  authorProfile: string;
  authorId: string;
  content: string;
  metadata: Metadata;
  iterations: Iteration[];
  createdAt: string;
  updatedAt: string;
};
