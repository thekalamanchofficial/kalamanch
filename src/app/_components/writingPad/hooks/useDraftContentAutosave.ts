"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
import { useDraftPost } from "~/app/_hooks/useDraftPost";
import {
  DRAFT_AUTO_CREATE_DEBOUCE_DELAY,
  DRAFT_AUTO_SAVE_THROTTLE_DELAY,
} from "~/app/editor/_config/config";
import { PostStatus } from "~/app/editor/types/types";
import { useUser } from "~/context/userContext";

type UseDraftContentAutosaveReturn = {
  onContentChange: (data: string, title: string) => void;
  currentIterationId: string | null | undefined;
  saveDraftInstantly: (showToast?: boolean, title?: string) => void;
};

type UseDraftContentAutosaveProps = {
  currentIterationId: string | null | undefined;
  initialContent: string;
  saveContentToDb: (
    content: string,
    currentIterationId: string,
    showToast?: boolean,
    title?: string,
  ) => void;
  postStatus: PostStatus;
  title: string;
};

export const useDraftContentAutosave = ({
  currentIterationId,
  initialContent,
  saveContentToDb,
  postStatus,
  title,
}: UseDraftContentAutosaveProps): UseDraftContentAutosaveReturn => {
  const [content, setContent] = useState(initialContent);
  const [lastSavedContent, setLastSavedContent] = useState(initialContent);
  const [lastSavedTitle, setLastSavedTitle] = useState(title);
  const { addDraftPost } = useDraftPost();
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createDraftPostInDbRef = useRef(
    debounce(async (content: string, title: string) => {
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
    }, DRAFT_AUTO_CREATE_DEBOUCE_DELAY),
  );

  const saveContent = useCallback(
    (data: string, iterationId: string, showToast?: boolean, title?: string) => {
      if (data === lastSavedContent && title === lastSavedTitle) {
        if (showToast) {
          toast.success("Draft saved successfully!");
        }
        return;
      }
      setLastSavedContent(data);
      setLastSavedTitle(title ?? "");
      saveContentToDb(data, iterationId, showToast, title);
    },
    [lastSavedContent, lastSavedTitle, saveContentToDb],
  );

  const throttledSave = useRef(
    throttle((data: string, iterationId: string, title: string) => {
      saveContent(data, iterationId, false, title);
    }, DRAFT_AUTO_SAVE_THROTTLE_DELAY),
  );

  const onContentChange = (data: string, title: string) => {
    if (postStatus !== PostStatus.DRAFT) return;

    setContent(data);

    if (!currentIterationId) {
      void createDraftPostInDbRef.current(data, title);
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem(currentIterationId, data);
      }
      throttledSave.current(data, currentIterationId, title);
    }
  };

  const saveDraftInstantly = useCallback(
    (showToast?: boolean, title?: string) => {
      if (!currentIterationId) return;
      saveContent(content, currentIterationId, showToast, title);

      if (typeof window !== "undefined") {
        localStorage.removeItem(currentIterationId); // TODO - Use Context instead of local storage
      }
    },
    [currentIterationId, saveContent, content],
  );

  useEffect(() => {
    const throttledFn = throttledSave.current;
    return () => {
      throttledFn.cancel();
    };
  }, []);

  useEffect(() => {
    const debouncedFn = createDraftPostInDbRef.current;
    return () => {
      debouncedFn.cancel();
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveDraftInstantly(false, title);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      saveDraftInstantly(false, title);
      e.preventDefault();
      e.returnValue = "";
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [saveDraftInstantly, title]);

  return { onContentChange, currentIterationId, saveDraftInstantly };
};
