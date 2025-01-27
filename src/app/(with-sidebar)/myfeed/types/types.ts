import { type SxProps } from "@mui/material";
import { DraftPost, Iteration, PostEntityType, PostStatus } from "~/app/editor/types/types";

export type MenuItemList = {
  label: string;
  route: string;
  icon: React.ReactNode;
};
export type Comment = {
  id: string;
  postId?: string | null | undefined;
  iterationId?: string | null | undefined;
  postStatus: string;
  userId: string;
  userName: string;
  userProfileImageUrl: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  replies?: Comment[];
};

export type CommentPayload = {
  id: string;
  postId?: string | null | undefined;
  iterationId?: string | null | undefined;
  postStatus: string;
  content: string;
  parentId?: string | null | undefined;
  userEmail: string;
  userName: string;
  userProfileImageUrl: string;
};

export type Like = {
  id: string;
  userId: string;
  postId?: string | null | undefined;
  iterationId?: string | null | undefined;
  postStatus: string;
  createdAt: string;
}

type Bid = {
  id: string;
  userId: string;
  postId: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
};
export type Post = {
  id: string;
  authorId: string;
  authorName: string;
  authorProfileImageUrl: string;
  content: string;
  postDetails:  PostDetails;
  likeCount: number;
  likes?: Like[];
  comments?: Comment[];
  bids?: Bid[];
  createdAt: string;
  updatedAt: string;
};

export type CreatePostProps = {
  content: string;
  authorId: string;
  authorName: string;
  authorProfileImageUrl: string;
  postDetails: PostDetails;
  
}

export type PostDetails = {
  title: string;
  targetAudience: string[];
  postType: string;
  actors: string[];
  tags: string[];
  thumbnailDetails: ThumbnailDetails;
}

export type ThumbnailDetails = {
  url: string;
  content?: string | null;
  title?: string | null;
}
export type PostsFeedProps = {
  articlesList: Post[];
  likedPosts: string[];
};

export type PostCardFooterProps = {
  likes: number;
  comments: Comment[];
  bids: Bid[];
  isLiked?: boolean;
  handleLikeButton: () => void;
  openCommentBox: () => void;
  postId: string;
  showLikes?: boolean;
  showComments?: boolean;
  showBids?: boolean;
  showBookmark?: boolean;
  showShare?: boolean;
  showEditPost?: boolean;
  handleEditPost?: () => void;
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
  articleImage?: string;
  articleId: string;
  articleDescription: string;
  savedDate?: string;
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
  REVIEWS = "Reviews",
}


export type FeaturedPost = {
  id: string;
  title: string;
  authorName: string;
  authorProfileImageUrl: string;
  authorId: string;
  likeCount: number;
};

export type UserToFollow = {
  id: string;
  userId: string;
  name: string;
  profileImageUrl: string;
  followersCount: number;
  postCount: number;
};

export type IterationWithReviews = Iteration & {
  DraftPost: Omit<DraftPost, "iterations"> & {
    postDetails: PostDetails;
  };
  likes: Like[]; 
  comments: Comment[]; 
};

export enum ReviewScreen {
  REVIEWS_MY_FEED_SUBTAB,
  REVIEW_FEEDBACK_SCREEN
}