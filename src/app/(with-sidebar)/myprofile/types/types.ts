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

export type userSchema = {
  name: string;
  birthdate: Date;
  interests: string[];
  bio?: string;
  education?: string[];
  professionalAchievements?: string;
};

export type userInfo = {
  name: string;
  bio: string;
  interests: string[];
  birthdate: Date;
  education: string[];
  professionalAchievements: string;
};

export type useMyProfilePage = {
  // handleSaveHook: (details: userInfo) => Promise<void>;
  callSave: (details: saveUserInfo) => Promise<void>;
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
  userInfo: userInfo;
  userLikedPosts: ArticlesList[];
  handleSave: (details: userInfo) => Promise<void>;
};

export type saveUserInfo = {
  name: string;
  bio?: string;
  birthdate: Date;
  interests?: string[];
  education?: string[];
  professionalAchievements?: string;
};
