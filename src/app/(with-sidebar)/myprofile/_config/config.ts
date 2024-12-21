import { MyProfileTabsEnum } from "../types/types";

export const tabs: { label: string; value: MyProfileTabsEnum }[] = [
  { label: MyProfileTabsEnum.MY_POSTS, value: MyProfileTabsEnum.MY_POSTS },
  {
    label: MyProfileTabsEnum.LIKED_POSTS,
    value: MyProfileTabsEnum.LIKED_POSTS,
  },
];
