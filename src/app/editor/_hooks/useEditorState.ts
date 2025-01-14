import { useCallback, useEffect, useState } from "react";
import { trpc } from "~/server/client";
import { DraftPost, Iteration } from "../types/types";
import { handleError } from "~/app/_utils/handleError";
import { toast } from "react-toastify";

export const useEditorState = (draftPostId: string | null) => {
  const [draftPost, setDraftPost] = useState<DraftPost | null>(null);
  const [selectedIteration, setSelectedIteration] = useState<Iteration | null>(null);

  const { data: draftPostData, isLoading } = trpc.draftPost.getDraftPost.useQuery(draftPostId ?? "", {
    enabled: !!draftPostId,
  });

  const updateIterationMutation = trpc.draftPost.updateIteration.useMutation();
  const addIterationMutation = trpc.draftPost.addIteration.useMutation();

  // Initialize the draft post and selected iteration
  useEffect(() => {
    if (draftPostData) {
      setDraftPost(draftPostData);
      if (draftPostData.iterations?.length) {
        setSelectedIteration(draftPostData.iterations[0] ?? null);
      }
    }
  }, [draftPostData]);

  const addIteration = async (iterationName: string) => {
    if (!draftPostId) return console.warn("Missing draftPostId");   
    saveLastIterationData();
    try {
      const addedIteration = await addIterationMutation.mutateAsync({
        draftPostId,
        iterationName,
        content: "",
      });
      setDraftPost((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          iterations: [...prev.iterations, addedIteration],
        };
      })
      setSelectedIteration(addedIteration);
    } catch (error) {
      handleError(error);
    }
  }

  const saveLastIterationData =  () => {
    const lastIterationId = selectedIteration?.id;
    if (!lastIterationId) {
      return;
    }

    const lastIterationContent = localStorage.getItem(lastIterationId)

    if(!lastIterationContent ){
      return;
    }
    setSelectedIteration((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        content: lastIterationContent ,
      };
    });

    setDraftPost((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        iterations: prev.iterations?.map((it) =>
          it.id === lastIterationId ? { ...it, content: lastIterationContent } : it
        ),
      };

    });
    updateIterationMutation.mutateAsync({
      iterationId: lastIterationId,
      content: lastIterationContent,
      iterationName: selectedIteration?.iterationName ?? "",
    }).catch((error) => {
      console.error("Error updating last iteration:", error);
    });;
    localStorage.removeItem(lastIterationId);
    
  }

  // Handle iteration change
  const handleIterationChange = useCallback(
    (iterationId: string) => {
      saveLastIterationData();
      const iteration = draftPost?.iterations?.find((it) => it.id === iterationId);
      if (iteration) setSelectedIteration(iteration);
    },
    [draftPost]
  );

  // Handle content change in the editor
  const handleEditorContentChange = useCallback(
    async (content: string,iterationId: string, showToast?: boolean) => {
      if (!draftPostId ) return console.warn("Missing draftPostId ");
      const iterationName = draftPost?.iterations?.find((it) => it.id === iterationId)?.iterationName;
      try {
        const updatedIteration = await updateIterationMutation.mutateAsync({
          iterationId: iterationId,
          content,
          iterationName: iterationName ?? "",
        });

        setDraftPost((prev) => {
            if (!prev) return null; 
            return {
              ...prev,
              iterations: prev.iterations?.map((it) =>
                it.id === iterationId ? updatedIteration : it
              ),
            };
          });

        if (selectedIteration && selectedIteration.id === iterationId){
          setSelectedIteration(updatedIteration);
         }
        if(showToast) {
            toast.success("Draft saved successfully!");
        }
      } catch (err) {
        if(showToast) {
            handleError(err);
        }
        console.log(err);
      }
    },
    [draftPostId, selectedIteration, updateIterationMutation]
  );

  return { isLoading,saveLastIterationData, draftPost, selectedIteration, handleIterationChange, handleEditorContentChange,addIteration };
};
