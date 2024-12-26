export enum EditorTabsEnum {
  EDITOR = "Editor",
  DRAFTS = "Drafts",
  PUBLISHED = "Published",
}
export type CreatePostFormType = {
  title: string;
  targetAudience: string[];
  thumbnail: string;
  postType: string;
  tags: string[];
  actors: string[];
};
