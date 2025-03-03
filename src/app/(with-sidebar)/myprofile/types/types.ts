import type { Interests } from "@prisma/client";
import type { FileUploadSource } from "types/enums";
import type { Like, Post, UserToFollow } from "../../myfeed/types/types";

export enum MyProfileTabsEnum {
  MY_POSTS = "My Posts",
  LIKED_POSTS = "Liked Posts",
}

export interface EditProfileDetails {
  name: string;
  bio: string;
  birthdate: string;
  education: string[];
  readingInterests: {
    genres: string[];
    tags: string[];
  };
  writingInterests: {
    genres: string[];
    tags: string[];
  };
}

export type UserSchema = {
  id: string;
  name: string;
  email: string;
  profileImageUrl: string;
  coverImageUrl?: string | null | undefined;
  birthdate?: string | null;
  readingInterests: Interests;
  writingInterests: Interests;
  bio: string | null;
  education: string[];
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
  readingInterests: Interests;
  writingInterests: Interests;
  birthdate: Date;
  education: string[];
  profileImageUrl?: string;
  coverImageUrl?: string | null | undefined;
};

export type UseMyProfilePage = {
  callSave: (details: SaveUserInfo) => Promise<void>;
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
  readingInterests?: Interests;
  writingInterests?: Interests;
  education?: string[];
};
