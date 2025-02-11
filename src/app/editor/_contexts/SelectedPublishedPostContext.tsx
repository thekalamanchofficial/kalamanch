"use client";

import { createContext, useContext, useState } from "react";

interface SelectedPublishedPostContextType {
  selectedPublishedPostId: string | null;
  setSelectedPublishedPostId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPublishedPostIdInLeftSideBar: string | null;
  setSelectedPublishedPostIdInLeftSideBar: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SelectedPublishedPostContext = createContext<SelectedPublishedPostContextType>({
  selectedPublishedPostId: null,
  setSelectedPublishedPostId: () => {
    // Do something with the selected published post ID
  },
  selectedPublishedPostIdInLeftSideBar: null,
  setSelectedPublishedPostIdInLeftSideBar: () => {
    // Called when Any post title in left iteration is clicked
  },
});

export const SelectedPublishedPostProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPublishedPostId, setSelectedPublishedPostId] = useState<string | null>(null);
  const [selectedPublishedPostIdInLeftSideBar, setSelectedPublishedPostIdInLeftSideBar] = useState<
    string | null
  >(null);

  return (
    <SelectedPublishedPostContext.Provider
      value={{
        selectedPublishedPostId,
        setSelectedPublishedPostId,
        selectedPublishedPostIdInLeftSideBar,
        setSelectedPublishedPostIdInLeftSideBar,
      }}
    >
      {children}
    </SelectedPublishedPostContext.Provider>
  );
};

export const useSelectedPublishedPost = () => useContext(SelectedPublishedPostContext);
