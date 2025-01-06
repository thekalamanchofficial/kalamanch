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
  editorPost: EditorPost;
};

type Metadata = {
  title: string;
  targetAudience: string[];
  thumbnailUrl: string;
  postType: string;
  actors: string[];
  tags: string[];
};

export type EditorPost = {
  title: string;
  authorName: string;
  authorProfile: string;
  authorId: string;
  content: string;
  metadata: Metadata;
  iterations: Iteration[];
};

export type Like = {
  userId: string;
  createdAt: string;
};

export type Comment = {
  userId: string;
  name: string;
  content: string;
  createdAt: string;
};

export type Bid = {
  userId: string;
  amount: number;
  createdAt: string;
};

export type Post = {
  authorId: string;
  authorName: string;
  authorProfile?: string; // Optional as per schema
  title: string;
  content: string;
  media: {
    thumbnailPicture?: string[]; // Optional as per schema
    thumbnailContent?: string;  // Optional as per schema
    thumbnailTitle?: string;    // Optional as per schema
  };
  tags?: string[];  // Optional as per schema
  likeCount?: number; // Optional, with default value 0 in schema
  comments?: Comment[]; // Optional as per schema
  bids?: Bid[];  // Optional as per schema
  likes?: Like[];  // Optional as per schema
  hasMorePosts?: boolean; // Optional as per schema
};

