import type { FileUploadSource } from "types/enums";
import type { Like, UserToFollow, Post } from "../../myfeed/types/types";

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
  id: string;
  name: string;
  email: string;
  profileImageUrl: string;
  coverImageUrl?: string | null | undefined;
  birthdate?: string | null;
  interests: string[];
  bio: string | null;
  education: string[];
  professionalAchievements?: string;
  following?: string[];
  followers?: string[];
  bookmarks?: string[];
  usersToFollow?: UserToFollow[];
  likes?: Like[];
  comments?: Comment[];
  posts?: Post[];
};


export type UserInfo = {
  name: string;
  bio: string;
  interests: string[];
  birthdate: Date;
  education: string[];
  profileImageUrl?: string;
  coverImageUrl?: string | null | undefined;
  professionalAchievements: string;
};

export type UseMyProfilePage = {
  callSave: (details: SaveUserInfo) => Promise<void>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  likedPosts: string[];
  bookmarkedPosts: string[];
  queryLoading: boolean;
  hasMorePosts: boolean;
  tab: MyProfileTabsEnum;
  skip: number;
  postDataWithComments: Post[];
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleChange: (newTab: MyProfileTabsEnum) => void;
  handleScroll: () => void;
  errorMessage: string;
  postCount: number;
  followerCount: number;
  isEditProfileOpen: boolean;
  handleEditProfileClose: () => void;
  handleEditProfileOpen: () => void;
  userInfo: UserInfo;
  userLikedPosts: Post[];
  handleSave: (details: UserInfo) => Promise<void>;
  handleImageUpdate: (uploadSource: FileUploadSource, url: string) => void;
};

export type SaveUserInfo = {
  name: string;
  bio?: string;
  birthdate: Date;
  interests?: string[];
  education?: string[];
  professionalAchievements?: string;
};
