export const followWriter = (writerName: string, writerProfileLink: string) => {
  console.log(`followed writer ${writerName} ${writerProfileLink} `);
};

type FeaturedArticle = {
  profilePicture: string;
  authorName: string;
  articleName: string;
  articleLink: string;
  authorProfileLink: string;
  likes: number;
};

type AuthorToFollow = {
  profilePicture: string;
  authorName: string;
  authorProfileLink: string;
};
export type RightSideBarProps = {
  featuredArticles: FeaturedArticle[];
  authorToFollow: AuthorToFollow[];
};

export type MenuItemList = {
  label: string;
  route: string;
  icon: React.ReactNode;
};

type ArticleMedia = {
  thumbnail_picture: string[];
  thumbnail_content: string;
  thumbnail_title: string;
};
export type ArticlesList = {
  id: string;
  authorId: string;
  authorName: string;
  authorProfile: string;
  title: string;
  content: string;
  media: ArticleMedia;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  bids: number;
};

export type PostsFeedProps = {
  articlesList: ArticlesList[];
};

export type PostCardFooterProps = {
  likes: number;
  comments: number;
  shares: number;
  bids: number;
};

export type UserNameProfileProps = {
  ImageHeight?: number;
  ImageWidth?: number;
  NameFontSize?: number;
  NameFontWeight?: string;
  AuthorName: string | null | undefined;
  AuthorImage: string | undefined;
};
export type PostCardContentProps = {
  articleTitle: string;
  articleContent: string;
  articleTags: string[];
  articleImage?: string[];
  articleId: string;
  articleDescription: string;
};

export type FollowButtonProps = {
  authorProfileLink: string;
  yPadding?: string;
  xPadding?: string;
};
export interface LeftSideBarProps {
  menuItems: MenuItemList[];
}
