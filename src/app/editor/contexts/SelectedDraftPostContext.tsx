"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SelectedDraftPostContextType {
  selectedDraftPostId: string | null;
  setSelectedDraftPostId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SelectedDraftPostContext = createContext<SelectedDraftPostContextType>({
  selectedDraftPostId: null,
  setSelectedDraftPostId: () => {
    // Do something with the selected published post ID
  }
});

export const SelectedDraftPostProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDraftPostId, setSelectedDraftPostId] = useState<string | null>(null);
  
  return (
    <SelectedDraftPostContext.Provider value={{ selectedDraftPostId, setSelectedDraftPostId }}>
      {children}
    </SelectedDraftPostContext.Provider>
  );
};

export const useSelectedDraftPost = () => useContext(SelectedDraftPostContext);