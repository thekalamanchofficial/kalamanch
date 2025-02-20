import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleError } from "~/app/_utils/handleError";
import type { CreatePostProps } from "~/app/(with-sidebar)/myfeed/types/types";
import { useUser } from "~/context/userContext";
import { useDraftPost } from "../../_hooks/useDraftPost";
import { usePost } from "../../_hooks/usePost";
import type { CreatePostFormType, DraftPost, Iteration } from "../types/types";

type DraftEditorStateProps = {
  draftPostId: string | null;
};
type DraftEditorState = {
  saveLastIterationData: () => Promise<void>;
  setDraftPost: React.Dispatch<React.SetStateAction<DraftPost | null>>;
  updateDraftPostDetails: (createPostFormDetails: CreatePostFormType) => Promise<void>;
  handlePublishEditorDraftIteration: (input: CreatePostProps) => Promise<void>;
  draftPost: DraftPost | null;
  selectedIteration: Iteration | null;
  handleIterationChange: (iterationId: string) => Promise<void>;
  handleEditorContentChange: (
    content: string,
    iterationId: string,
    showToast?: boolean,
    title?: string
  ) => Promise<void>;
  addIteration: (content?: string) => Promise<void>;
};

export const useDraftEditorState = ({ draftPostId }: DraftEditorStateProps): DraftEditorState => {
  const [draftPost, setDraftPost] = useState<DraftPost | null>(null);
  const [selectedIteration, setSelectedIteration] = useState<Iteration | null>(null);
  const {
    getDraftPost,
    updateDraftDetails,
    updateDraftIteration,
    addDraftIteration,
    deleteDraftPost,
  } = useDraftPost();
  const { user } = useUser();
  const { publishPost } = usePost();
  const draftPostData = getDraftPost(draftPostId);

  const addIteration = async (content?: string) => {
    if (!draftPostId) return console.warn("Missing draftPostId");
    await saveLastIterationData();
    const newIterationName = `Iteration - ${draftPost?.iterations?.length ? draftPost.iterations.length + 1 : 1}`;
    try {
      const addedIteration = await addDraftIteration(draftPostId, newIterationName, content ?? "");
      setDraftPost((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          iterations: [...prev.iterations, addedIteration],
        };
      });
      setSelectedIteration(addedIteration);
    } catch (error) {
      handleError(error);
    }
  };

  const saveLastIterationData = useCallback(async () => {
    const lastIterationId = selectedIteration?.id;
    if (!lastIterationId) {
      return;
    }

    const lastIterationContent = localStorage.getItem(lastIterationId);

    if (!lastIterationContent) {
      return;
    }
    setSelectedIteration((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        content: lastIterationContent,
      };
    });

    setDraftPost((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        iterations: prev.iterations?.map((it) =>
          it.id === lastIterationId ? { ...it, content: lastIterationContent } : it,
        ),
      };
    });
    await updateDraftIteration(
      lastIterationId,
      selectedIteration?.iterationName ?? "",
      lastIterationContent,
    );
    localStorage.removeItem(lastIterationId);
  }, [selectedIteration, updateDraftIteration]);

  // Handle iteration change
  const handleIterationChange = useCallback(
    async (iterationId: string) => {
      await saveLastIterationData();
      const iteration = draftPost?.iterations?.find((it) => it.id === iterationId);
      if (iteration) setSelectedIteration(iteration);
    },
    [draftPost, saveLastIterationData],
  );

  // Handle content change in the editor
  const handleEditorContentChange = useCallback(
    async (content: string, iterationId: string, showToast?: boolean, title?: string) => {
      if (!draftPostId) return console.warn("Missing draftPostId ");
      const iterationName = draftPost?.iterations?.find(
        (it) => it.id === iterationId,
      )?.iterationName;
      try {
        const updatedIteration = await updateDraftIteration(
          iterationId,
          iterationName ?? "",
          content,
        );

        await updateDraftDetails(draftPostId, title ?? "");

        setDraftPost((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            title: title ?? prev.title,
            iterations: prev.iterations?.map((it) =>
              it.id === iterationId ? updatedIteration : it,
            ),
          };
        });

        if (selectedIteration && selectedIteration.id === iterationId) {
          setSelectedIteration(updatedIteration);
        }
        if (showToast) {
          toast.success("Draft saved successfully!");
        }
      } catch (err) {
        if (showToast) {
          handleError(err);
        }
        console.log(err);
      }
    },
    [draftPostId, draftPost, selectedIteration, updateDraftIteration, updateDraftDetails],
  );

  const handlePublishEditorDraftIteration = async ({
    content,
    title,
    postType,
    actors,
    tags,
    genres,
    thumbnailDetails,
  }: CreatePostProps) => {
    await publishPost({
      content,
      authorId: user?.id ?? "",
      authorName: user?.name ?? "",
      authorProfileImageUrl: user?.profileImageUrl ?? "",
      title: title ?? "",
      postType,
      actors: actors ?? [],
      tags: tags ?? [],
      genres: genres ?? [],
      thumbnailDetails: {
        url: thumbnailDetails.url ?? "",
        content: thumbnailDetails.content ?? "",
        title: thumbnailDetails.title ?? "",
      },
    });
    if (draftPostId) {
      await deleteDraftPost(draftPostId);
    }
  };

  const updateDraftPostDetails = async (createPostFormDetails: CreatePostFormType) => {
    if (!draftPost) return;
    console.log("createPostFormDetails", createPostFormDetails);

    await updateDraftDetails(draftPostId ?? "", createPostFormDetails.title);

    setDraftPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        title: createPostFormDetails.title,
      };
    });
  };
  // Initialize the draft post and selected iteration
  useEffect(() => {
    if (draftPostData) {
      setDraftPost(draftPostData);
      if (draftPostData.iterations?.length) {
        setSelectedIteration(draftPostData.iterations[0] ?? null);
      }
    } else {
      setDraftPost(null);
    }
  }, [draftPostData]);

  return {
    saveLastIterationData,
    setDraftPost,
    updateDraftPostDetails,
    handlePublishEditorDraftIteration,
    draftPost,
    selectedIteration,
    handleIterationChange,
    handleEditorContentChange,
    addIteration,
  };
};
