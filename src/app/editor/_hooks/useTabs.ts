// src/hooks/useTabs.ts
import { useState } from "react";
import { EditorTabsEnum } from "../types/types";

export const useTabs = () => {
  const [activeTab, setActiveTab] = useState(EditorTabsEnum.EDITOR);

  const changeTab = (newTab: EditorTabsEnum) => setActiveTab(newTab);

  return { activeTab, changeTab };
};
