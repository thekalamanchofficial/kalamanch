import { MyProfileTabsEnum } from "../types/types";

export const tabs: { label: string; value: MyProfileTabsEnum }[] = [
  { label: MyProfileTabsEnum.MY_POSTS, value: MyProfileTabsEnum.MY_POSTS },
  {
    label: MyProfileTabsEnum.LIKED_POSTS,
    value: MyProfileTabsEnum.LIKED_POSTS,
  },
];

export const USER_QUERY_STALE_TIME = 1 * 60 * 1000;
