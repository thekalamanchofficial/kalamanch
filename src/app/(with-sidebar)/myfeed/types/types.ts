import { type SxProps } from "@mui/material";

export type MenuItemList = {
  label: string;
  route: string;
  icon: React.ReactNode;
};
export type Comment = {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userProfileImageUrl: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  replies?: Comment[];
};

export type Like = {
  id: string;
  userId: string;
  postId: string;
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
  articleImage?: string;
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
