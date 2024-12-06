export enum MyProfileTabsEnum {
  MY_POSTS = "My Posts",
  LIKED_POSTS = "Liked Posts",
}

export type EditProfileDetails = {
  name: string;
  headline?: string;
  birthdate: Date;
};
