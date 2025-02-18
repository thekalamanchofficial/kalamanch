"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import throttle from "lodash/throttle";
import { useDraftPost } from "~/app/_hooks/useDraftPost";
import { PostStatus } from "~/app/editor/types/types";
import { useUser } from "~/context/userContext";

type UseDraftContentAutosaveReturn = {
  onContentChange: (data: string, title: string) => void;
  currentIterationId: string | null | undefined;
  saveDraftInstantly: (showToast?: boolean) => void;
};

type UseDraftContentAutosaveProps = {
  currentIterationId: string | null | undefined;
  initialContent: string;
  saveContentToDb: (content: string, currentIterationId: string, showToast?: boolean) => void;
  postStatus: PostStatus;
};

export const useDraftContentAutosave = ({
  currentIterationId,
  initialContent,
  saveContentToDb,
  postStatus,
}: UseDraftContentAutosaveProps): UseDraftContentAutosaveReturn => {
  const [content, setContent] = useState(initialContent);
  const [lastSavedContent, setLastSavedContent] = useState(initialContent);
  const { addDraftPost } = useDraftPost();
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const saveContent = useCallback(
    (data: string, iterationId: string, showToast?: boolean) => {
      if (data === lastSavedContent) return;
      setLastSavedContent(data);
      saveContentToDb(data, iterationId, showToast);
    },
    [lastSavedContent, saveContentToDb]
  );

  const createDraftPostInDb = async (content: string, title: string) => {
    if (!user?.id || !user?.name) {
      console.error("User not found");
      return;
    }
    const draftPost = await addDraftPost({
      authorId: user.id,
      authorName: user.name,
      authorProfileImageUrl: user.profileImageUrl ?? "",
      title:
        title ||
        new Date().toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      iterations: [
        {
          iterationName: "Iteration - 1",
          content,
        },
      ],
    });

    if (!draftPost?.id) {
      console.error("Draft post not created");
      return;
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(searchParams);
      params.set("draftPostId", draftPost.id);
      router.replace(`${window.location.pathname}?${params.toString()}`);
    }
  };

  const throttledSave = useRef(
    throttle((data: string, iterationId: string) => {
      saveContent(data, iterationId);
    }, 60000) // Save every 1 minute
  );

  const onContentChange = (data: string, title: string) => {
    if (postStatus !== PostStatus.DRAFT || data === content) return;

    setContent(data);

    if (!currentIterationId) {
      void createDraftPostInDb(data, title);
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem(currentIterationId, data);
      }
      throttledSave.current(data, currentIterationId);
    }
  };

  const saveDraftInstantly = useCallback(
    (showToast?: boolean) => {
      if (!currentIterationId) return;
      saveContent(content, currentIterationId, showToast);

      if (typeof window !== "undefined") {
        localStorage.removeItem(currentIterationId); // TODO - Use Context instead of local storage
      }
    },
    [currentIterationId, saveContent, content]
  );

  useEffect(() => {
    const throttleSaveRef = throttledSave.current;
    return () => {
      throttleSaveRef.cancel();
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

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
  }, [saveDraftInstantly]);

  return { onContentChange, currentIterationId, saveDraftInstantly };
};
