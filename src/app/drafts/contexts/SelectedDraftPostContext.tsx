"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SelectedDraftPostContextType {
  selectedDraftPostId: string | null;
  setSelectedDraftPostId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDraftPostIdInLeftSideBar: string | null;
  setSelectedDraftPostIdInLeftSideBar: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SelectedDraftPostContext = createContext<SelectedDraftPostContextType>({
  selectedDraftPostId: null,
  setSelectedDraftPostId: () => {
    // Do something with the selected published post ID
  },
  selectedDraftPostIdInLeftSideBar: null,
  setSelectedDraftPostIdInLeftSideBar: () => {
    // Called when Any post title in left iteration is clicked
  }


});

export const SelectedDraftPostProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDraftPostId, setSelectedDraftPostId] = useState<string | null>(null);
  const [selectedDraftPostIdInLeftSideBar,setSelectedDraftPostIdInLeftSideBar] = useState<string | null>(null);
  
  return (
    <SelectedDraftPostContext.Provider value={{ selectedDraftPostId, setSelectedDraftPostId,selectedDraftPostIdInLeftSideBar,setSelectedDraftPostIdInLeftSideBar }}>
      {children}
    </SelectedDraftPostContext.Provider>
  );
};

export const useSelectedDraftPost = () => useContext(SelectedDraftPostContext);