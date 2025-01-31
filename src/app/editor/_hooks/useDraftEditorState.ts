import { useCallback, useEffect, useState } from "react";
import type { CreatePostFormType, DraftPost, Iteration } from "../types/types";
import { handleError } from "~/app/_utils/handleError";
import { toast } from "react-toastify";
import { useDraftPost } from "../../_hooks/useDraftPost";
import { useUser } from "~/context/userContext";
import { usePost } from "../../_hooks/usePost";
import type { PostType } from "@prisma/client";
import type { PostDetails } from "~/app/(with-sidebar)/myfeed/types/types";

type DraftEditorStateProps = {
  draftPostId : string | null;
}
type DraftEditorState = {
  saveLastIterationData: () => Promise<void>;
  setDraftPost: React.Dispatch<React.SetStateAction<DraftPost | null>>;
  updateDraftPostDetails: (createPostFormDetails: CreatePostFormType) => Promise<void>;
  handlePublishEditorDraftIteration: (content: string) => Promise<void>;
  draftPost: DraftPost | null;
  selectedIteration: Iteration | null;
  handleIterationChange: (iterationId: string) => Promise<void>;
  handleEditorContentChange: (content: string, iterationId: string, showToast?: boolean) => Promise<void>;
  addIteration: (content?: string) => Promise<void>;
};

export const useDraftEditorState = ({draftPostId}: DraftEditorStateProps) : DraftEditorState => {
  const [draftPost, setDraftPost] = useState<DraftPost | null>(null);
  const [selectedIteration, setSelectedIteration] = useState<Iteration | null>(null);
  const {getDraftPost,updateDraftDetails, updateDraftIteration,addDraftIteration,deleteDraftPost } = useDraftPost();
  const {user} = useUser();
  const {publishPost} = usePost();
  const draftPostData = getDraftPost(draftPostId);


  const addIteration = async (content?: string) => {
    if (!draftPostId) return console.warn("Missing draftPostId");   
    await saveLastIterationData();
    const newIterationName = `Iteration - ${draftPost?.iterations?.length ? draftPost.iterations.length + 1 : 1}`;
    try {
      const addedIteration = await addDraftIteration(
        draftPostId,
        newIterationName,
        content ?? ""
      );
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

  const saveLastIterationData = async  () => {
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
    await updateDraftIteration(lastIterationId, selectedIteration?.iterationName ?? "", lastIterationContent);
    localStorage.removeItem(lastIterationId);
    
  }

  // Handle iteration change
  const handleIterationChange = useCallback(
    async(iterationId: string) => {
      await saveLastIterationData();
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
        const updatedIteration = await updateDraftIteration(
          iterationId,
          iterationName ?? "",
          content
        );

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
    [draftPostId,draftPost, selectedIteration, updateDraftIteration,]
  );

  const handlePublishEditorDraftIteration = async (content: string) => {
    await publishPost({
      content,
      authorId: user?.id ?? "",
      authorName: user?.name ?? "",
      authorProfileImageUrl: user?.profileImageUrl ?? "",
      postDetails: {
        title: draftPost?.postDetails.title ?? "",
        targetAudience: draftPost?.postDetails.targetAudience ?? [],
        postType: draftPost?.postDetails.postType as PostType,
        actors: draftPost?.postDetails.actors ?? [],
        tags: draftPost?.postDetails.tags ?? [],
        thumbnailDetails: {
          url: draftPost?.postDetails.thumbnailDetails.url ?? "",
          content: "",
          title: "",
        },
      },
    });

    if(draftPostId){
      await deleteDraftPost(draftPostId);
    }
  };

const updateDraftPostDetails = async (createPostFormDetails: CreatePostFormType) => {
    if (!draftPost) return;
    console.log("createPostFormDetails",createPostFormDetails)
    const postDetails: PostDetails = {
        title: createPostFormDetails.title,
        targetAudience: createPostFormDetails.targetAudience ?? [], 
        postType: createPostFormDetails.postType?.toUpperCase() as PostType,
        actors: createPostFormDetails.actors ?? [],
        tags: createPostFormDetails.tags ?? [],
        thumbnailDetails: {
        url: createPostFormDetails.thumbnailUrl ?? ""
      }
    }
    await updateDraftDetails(draftPostId ?? "", postDetails);
  
    setDraftPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        postDetails,
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
    }
    else {
      setDraftPost(null);
    }
  }, [draftPostData]);


  return {saveLastIterationData,setDraftPost,updateDraftPostDetails,handlePublishEditorDraftIteration, draftPost, selectedIteration, handleIterationChange, handleEditorContentChange,addIteration };
};
