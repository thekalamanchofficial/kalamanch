import { trpc } from "~/server/client";
import { handleError } from "~/app/_utils/handleError";
import { toast } from "react-toastify";
import { PostDetails } from "~/app/(with-sidebar)/myfeed/types/types";
import { CreateDraftPostProps, DraftPost, Iteration } from "../types/types";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";

type UseDraftPostRespone = {
  addDraftPost: (draftPost: CreateDraftPostProps) => Promise<DraftPost | null | undefined>;
  getDraftPost: (draftPostId: string | null | undefined) => DraftPost | undefined | null; 
  addDraftIteration: (draftPostId: string, iterationName: string) => Promise<Iteration>;
  updateDraftDetails: (draftPostId: string, postDetails: PostDetails) => Promise<void>;
  updateDraftIteration: (iterationId: string, iterationName: string, content: string) => Promise<Iteration>;
  deleteDraftPost: (postId: string) => Promise<void>;
};

export const useDraftPost = (): UseDraftPostRespone => {


  const createMutationOptions = (successMessage: string) => ({
    onSuccess: () => toast.success(successMessage),
    onError: (error: unknown) => handleError(error),
  });
  
  const deleteDraftPostMutation = trpc.draftPost.deleteDraftPost.useMutation();
  const updateDraftIterationMutation = trpc.draftPost.updateIteration.useMutation();
  const updateDraftDetailsMutation = trpc.draftPost.updateDraftPostDetails.useMutation(createMutationOptions(STATIC_TEXTS.EDITOR_PAGE.DRAFT_DETAILS_UPDATED_MESSAGE));
  const addDraftIterationMutation = trpc.draftPost.addIteration.useMutation();
  const addDraftPostMutation = trpc.draftPost.addDraftPost.useMutation();


  const getDraftPost = (draftPostId: string | null | undefined) => {
    const {data} = trpc.draftPost.getDraftPost.useQuery(draftPostId ?? "", {
      enabled: !!draftPostId,
    });
    return data;
  };

  const deleteDraftPost = async (postId: string) => {
    try {
      await deleteDraftPostMutation.mutateAsync(postId);
    } catch (error) {
      console.error("Failed to delete post:", error);
      handleError(error);
    }
  };

  const updateDraftIteration = async (iterationId: string, iterationName: string, content: string) => {
    const updatedIteration = await updateDraftIterationMutation.mutateAsync({ iterationId,iterationName, content });
    return updatedIteration;
  };

  const updateDraftDetails = async (draftPostId: string, postDetails: PostDetails) => {
    try {
      await updateDraftDetailsMutation.mutateAsync({draftPostId , postDetails });
    } catch (error) {
      console.error("Failed to update iteration content:", error);
      handleError(error);
    }
  };
  const addDraftIteration = async (draftPostId: string, iterationName: string) => {
      const addedIteration = await addDraftIterationMutation.mutateAsync({ draftPostId, iterationName });
      return addedIteration;
  };

  const addDraftPost = async (draftPost: CreateDraftPostProps) => {
      const draftPostResponse = await addDraftPostMutation.mutateAsync(draftPost);
      return draftPostResponse;
  };




  return { addDraftPost,getDraftPost,addDraftIteration,updateDraftDetails,updateDraftIteration,deleteDraftPost };
};
