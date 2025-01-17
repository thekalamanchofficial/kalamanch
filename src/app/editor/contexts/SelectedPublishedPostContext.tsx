"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SelectedPublishedPostContextType {
  selectedPublishedPostId: string | null;
  setSelectedPublishedPostId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SelectedPublishedPostContext = createContext<SelectedPublishedPostContextType>({
  selectedPublishedPostId: null,
  setSelectedPublishedPostId: () => {
    // Do something with the selected published post ID
  }
});

export const SelectedPublishedPostProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPublishedPostId, setSelectedPublishedPostId] = useState<string | null>(null);
  
  return (
    <SelectedPublishedPostContext.Provider value={{ selectedPublishedPostId, setSelectedPublishedPostId }}>
      {children}
    </SelectedPublishedPostContext.Provider>
  );
};

export const useSelectedPublishedPost = () => useContext(SelectedPublishedPostContext);