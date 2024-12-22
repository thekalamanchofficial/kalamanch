import { type ArticlesList } from "../../myfeed/types/types";

export enum MyProfileTabsEnum {
  MY_POSTS = "My Posts",
  LIKED_POSTS = "Liked Posts",
}

export type EditProfileDetails = {
  name: string;
  interests: string[];
  bio?: string;
  birthdate: Date;
  education?: string[];
  professionalAchievements?: string;
};

export type UserSchema = {
  name: string;
  birthdate: Date;
  interests: string[];
  bio?: string;
  education?: string[];
  professionalAchievements?: string;
};

export type UserInfo = {
  name: string;
  bio: string;
  interests: string[];
  birthdate: Date;
  education: string[];
  professionalAchievements: string;
};

export type UseMyProfilePage = {
  callSave: (details: SaveUserInfo) => Promise<void>;
  posts: ArticlesList[];
  setPosts: React.Dispatch<React.SetStateAction<ArticlesList[]>>;
  likedPosts: string[];
  queryLoading: boolean;
  hasMorePosts: boolean;
  tab: MyProfileTabsEnum;
  skip: number;
  postDataWithComments: ArticlesList[];
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleLikeButton: (postId: string) => Promise<{ liked: boolean }>;
  handleChange: (newTab: MyProfileTabsEnum) => void;
  addComment: (
    postId: string,
    content: string,
    parent: string,
  ) => Promise<void>;
  handleScroll: () => void;
  errorMessage: string;
  userProfile: string;
  postCount: number;
  followerCount: number;
  isEditProfileOpen: boolean;
  handleEditProfileClose: () => void;
  handleEditProfileOpen: () => void;
  userInfo: UserInfo;
  userLikedPosts: ArticlesList[];
  handleSave: (details: UserInfo) => Promise<void>;
};

export type SaveUserInfo = {
  name: string;
  bio?: string;
  birthdate: Date;
  interests?: string[];
  education?: string[];
  professionalAchievements?: string;
};
