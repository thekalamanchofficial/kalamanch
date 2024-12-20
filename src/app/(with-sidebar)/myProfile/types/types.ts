export enum MyProfileTabsEnum {
  MY_POSTS = "My Posts",
  LIKED_POSTS = "Liked Posts",
}

export type EditProfileDetails = {
  name: string;
  interests?: string[];
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
