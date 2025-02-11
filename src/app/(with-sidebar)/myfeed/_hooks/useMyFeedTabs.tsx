import { useState } from "react";
import { MyFeedTabsEnum } from "../types/types";

type UseMyFeedTabsReturn = {
  activeTab: MyFeedTabsEnum;
  handleTabChange: (newTab: MyFeedTabsEnum) => void;
};

const useMyFeedTabs = (): UseMyFeedTabsReturn => {
  const [activeTab, setActiveTab] = useState<MyFeedTabsEnum>(MyFeedTabsEnum.MY_FEED);

  const handleTabChange = (newTab: MyFeedTabsEnum) => {
    setActiveTab(newTab);
  };

  return { activeTab, handleTabChange };
};
export default useMyFeedTabs;
