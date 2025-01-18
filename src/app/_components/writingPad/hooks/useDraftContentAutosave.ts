
import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";

type UseDraftContentAutosaveReturn = {
  onContentChange: (data: string) => void;
  currentIterationId: string | null | undefined;
  saveDraftInstantly: (showToast?: boolean) => void;
};
type UseDraftContentAutosaveProps = {
  currentIterationId: string | null | undefined;
  initialContent: string;
  saveContentToDb: (content: string, currentIterationId: string, showToast?: boolean) => void;
};

export const useDraftContentAutosave = ({currentIterationId,initialContent,saveContentToDb}:UseDraftContentAutosaveProps
): UseDraftContentAutosaveReturn => {
  const [content, setContent] = useState<string>(initialContent);
  const [lastSavedContent, setLastSavedContent] = useState<string>(initialContent);

  const saveContent = (data: string,iterationId: string, showToast?: boolean) => {
    if (data === lastSavedContent) return;
    setLastSavedContent(data);
    saveContentToDb(data,iterationId,showToast);
  };

  const throttledSave = useCallback(
    throttle(saveContent, 60000), // Save every 1 minute
    [currentIterationId]
  );

  const onContentChange = (data: string) => {
    if(!currentIterationId) return
    setContent(data);
    localStorage.setItem(currentIterationId,data)
    throttledSave(data,currentIterationId);
  };

  const saveDraftInstantly = (showToast?: boolean) => {
    if(!currentIterationId) return
    saveContent(content,currentIterationId,showToast); 
    localStorage.removeItem(currentIterationId) // TODO - Use Context instead of local storage
  };

  useEffect(() => {
    return () => {
      throttledSave.cancel();
    }
  },[])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveDraftInstantly();
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      saveDraftInstantly();
      e.preventDefault();
      e.returnValue = "";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [content, lastSavedContent]);

  return { onContentChange,currentIterationId, saveDraftInstantly };
};