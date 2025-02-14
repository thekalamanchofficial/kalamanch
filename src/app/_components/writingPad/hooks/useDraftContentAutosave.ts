import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";
import { PostStatus } from "~/app/editor/types/types";
import { useDraftPost } from "~/app/_hooks/useDraftPost";
import { useUser } from "~/context/userContext";
import { useRouter, useSearchParams } from "next/navigation";

type UseDraftContentAutosaveReturn = {
  onContentChange: (data: string) => void;
  currentIterationId: string | null | undefined;
  saveDraftInstantly: (showToast?: boolean) => void;
};
type UseDraftContentAutosaveProps = {
  currentIterationId: string | null | undefined;
  initialContent: string;
  saveContentToDb: (
    content: string,
    currentIterationId: string,
    showToast?: boolean,
  ) => void;
  postStatus: PostStatus;
};

export const useDraftContentAutosave = ({
  currentIterationId,
  initialContent,
  saveContentToDb,
  postStatus,
}: UseDraftContentAutosaveProps): UseDraftContentAutosaveReturn => {
  const [content, setContent] = useState<string>(initialContent);
  const [lastSavedContent, setLastSavedContent] =
    useState<string>(initialContent);
  const { addDraftPost } = useDraftPost();
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  const saveContent = (
    data: string,
    iterationId: string,
    showToast?: boolean,
  ) => {
    if (data === lastSavedContent) return;
    setLastSavedContent(data);
    saveContentToDb(data, iterationId, showToast);
  };

  const createDraftPostInDb = async (content: string) => {
    if (!user?.id || !user?.name) {
      console.error("User not found");
      return;
    }
    const draftPost = await addDraftPost({
      authorId: user.id,
      authorName: user.name,
      authorProfileImageUrl: user.profileImageUrl ?? "",
      postDetails: {
        title: "",
        targetAudience: [],
        postType: "NA",
        actors: [],
        tags: [],
        thumbnailDetails: {
          url: "",
        },
      },
      iterations: [
        {
          iterationName: "Iteration - 1",
          content,
        },
      ],
    });

    console.log("Draft post created", draftPost);

    if (!draftPost?.id) {
      console.error("Draft post not created");
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("draftPostId", draftPost.id);

    router.replace(window.location.pathname + "?" + params.toString());
  };

  const throttledSave = useCallback(
    // TODO: lint error
    throttle(saveContent, 60000), // Save every 1 minute
    [currentIterationId],
  );

  const onContentChange = (data: string) => {
    if (postStatus !== PostStatus.DRAFT) return;
    setContent(data);

    if (!currentIterationId) {
      void createDraftPostInDb(data);
    } else {
      localStorage.setItem(currentIterationId, data);
      throttledSave(data, currentIterationId);
    }
  };

  const saveDraftInstantly = (showToast?: boolean) => {
    if (!currentIterationId) return;
    saveContent(content, currentIterationId, showToast);
    localStorage.removeItem(currentIterationId); // TODO - Use Context instead of local storage
  };

  useEffect(() => {
    return () => {
      throttledSave.cancel();
    };
  }, []); // TODO: lint error

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

  return { onContentChange, currentIterationId, saveDraftInstantly };
};
