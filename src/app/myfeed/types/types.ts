export const followWriter = (writerName: string, writerProfileLink: string) => {
  console.log(`followed writer ${writerName} ${writerProfileLink} `);
};

interface FeaturedArticle {
  profilePicture: string;
  writerName: string;
  articleName: string;
  articleLink: string;
  writerProfileLink: string;
  likes: number;
}

interface WriterToFollow {
  profilePicture: string;
  writerName: string;
  writerProfileLink: string;
}
export interface RightSideBarProps {
  featuredArticles: FeaturedArticle[];
  writersToFollow: WriterToFollow[];
}

export interface MenuItemList {
  label: string;
  route: string;
  icon: React.ReactNode;
}

interface ArticlesList {
  authorName: string;
  authorImage: string;
  authorProfileLink: string;
  articleTitle: string;
  articleContent: string;
  articleTags: string[];
  articleImage: string;
  articleLink: string;
  articleDecription: string;
  articleLikes: number;
  articleComments: number;
  articleShares: number;
  articlesBids: number;
}

export interface PostsFeedProps {
  articlesList: ArticlesList[];
}

export interface PostCardFooterProps {
  likes: number;
  comments: number;
  shares: number;
  bids: number;
}

export interface UserNameProfileProps {
  ImageHeight?: number;
  ImageWidth?: number;
  NameFontSize?: number;
  NameFontWeight?: string;
  AuthorName?: string;
  AuthorProfileLink?: string;
  AuthorImage?: string;
}
