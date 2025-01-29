"use client";

import { createContext, useContext, useState } from "react";

interface SelectedDraftIterationContextType {
  selectedDraftIterationId: string | null;
  setSelectedDraftIterationId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDraftIterationIdInLeftSideBar: string | null;
  setSelectedDraftIterationIdInLeftSideBar: React.Dispatch<React.SetStateAction<string | null>>;
}

export const SelectedDraftIterationContext = createContext<SelectedDraftIterationContextType>({
  selectedDraftIterationId: null,
  setSelectedDraftIterationId: () => {
    // Do something with the selected draft iteration ID
  },
  selectedDraftIterationIdInLeftSideBar: null,
  setSelectedDraftIterationIdInLeftSideBar: () => {
    // Called when Any draft iteration title in left iteration is clicked
  }


});

export const SelectedDraftIterationProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedDraftIterationId, setSelectedDraftIterationId] = useState<string | null>(null);
  const [selectedDraftIterationIdInLeftSideBar,setSelectedDraftIterationIdInLeftSideBar] = useState<string | null>(null);
  
  return (
    <SelectedDraftIterationContext.Provider value={{ selectedDraftIterationId, setSelectedDraftIterationId,selectedDraftIterationIdInLeftSideBar,setSelectedDraftIterationIdInLeftSideBar }}>
      {children}
    </SelectedDraftIterationContext.Provider>
  );
};

export const useSelectedDraftIteration = () => useContext(SelectedDraftIterationContext);