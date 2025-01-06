import { type SxProps } from "@mui/material";
import { type ReactNode } from "react";

export type MenuItemList = {
  label: string;
  route: string;
  icon: React.ReactNode;
};

type ArticleMedia = {
  thumbnailPicture: string[];
  thumbnailContent: string;
  thumbnailTitle: string;
};

export type Comment = {
  id: string;
  userId: string;
  postId: string;
  name: string;
  content: string;
  createdAt: string;
  profile: string;
  updatedAt: string;
  parentId: string | null;
  replies?: Comment[];
};

type Bid = {
  id: string;
  userId: string;
  articleId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
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
  likeCount: number;
  comments: Comment[];
  bids?: Bid[];
};

export type PostsFeedProps = {
  articlesList: ArticlesList[];
  likedPosts: string[];
  handleLikeButton: (postId: string) => Promise<{ liked: boolean }>;
  addComment: (
    postId: string,
    content: string,
    parent: string,
  ) => Promise<void>;
};

export type PostCardFooterProps = {
  likes: number;
  comments: Comment[];
  bids: Bid[];
  isLiked?: boolean;
  handleLikeButton: () => void;
  openCommentBox: () => void;
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
  style?: SxProps;
  isFollowing?: boolean;
};

export type CommentSectionProps = {
  comments: Comment[];
  addComment: (comment: string, parent: string) => Promise<void>;
};
export type CommentCardProps = {
  comment: Comment;
};

export enum MyFeedTabsEnum {
  MY_FEED = "My Feed",
  DISCOVERY = "Discover",
}

export type FeaturedAuthor = {
  userId: string;
  name: string;
  profile: string;
  followersCount: number;
  articlesCount: number;
};

export type FeaturedPost = {
  postId: string;
  title: string;
  authorName: string;
  authorProfile: string;
  authorId: string;
  likeCount: number;
};

