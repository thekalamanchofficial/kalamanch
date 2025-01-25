import { MyFeedTabsEnum } from "../types/types";

export const myfeedConfig = {
  ARTICLE_READ_MORE_LENGTH: 450,
  SUMMARY_READ_MORE_LENGTH: 250,
};

export const tabs: { label: string; value: MyFeedTabsEnum }[] = [
  { label: MyFeedTabsEnum.MY_FEED, value: MyFeedTabsEnum.MY_FEED },
  {
    label: MyFeedTabsEnum.DISCOVERY,
    value: MyFeedTabsEnum.DISCOVERY,
  },
];

export const BULK_LIKE_DEBOUNCE_DELAY = 60000;
export const BULK_COMMENT_DEBOUNCE_DELAY = 60000;
export const BULK_BOOKMARK_DEBOUNCE_DELAY = 60000;