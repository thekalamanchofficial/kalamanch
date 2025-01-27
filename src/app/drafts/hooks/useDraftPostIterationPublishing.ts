import { usePost } from "../../_hooks/usePost";
import { useUser } from "~/context/userContext";
import type { DraftPost} from "../../editor/types/types";
import { toast } from "react-toastify";
import { useDraftPost } from "../../_hooks/useDraftPost";


type UseDraftPostIterationPublishingResponse = {
  handlePublishDraftPostIteration: (draftpost: DraftPost, iterationId: string) => Promise<void>;
};

export const useDraftPostIterationPublishing = ():UseDraftPostIterationPublishingResponse => {
  const { publishPost} = usePost();
  const { user } = useUser();
  const {deleteDraftPost} = useDraftPost();

  const handlePublishDraftPostIteration = async (draftpost: DraftPost , iterationId: string) => {
    const iteration = draftpost.iterations.find((i) => i.id == iterationId);
    if(!iteration){
      toast.error("Iteration not found");
      return;
    }
    const content = iteration.content;
    await publishPost({
      content: content,
      authorId: user?.id ?? "",
      authorName: user?.name ?? "",
      authorProfileImageUrl: user?.profileImageUrl ?? "",
      postDetails: {
        title: draftpost.postDetails.title,
        targetAudience: draftpost.postDetails.targetAudience,
        postType: draftpost.postDetails.postType,
        actors: draftpost.postDetails.actors,
        tags: draftpost.postDetails.tags,
        thumbnailDetails: {
          url: draftpost.postDetails.thumbnailDetails.url,
          content: "",
          title: "",
        },
      },
    });
    await deleteDraftPost(draftpost.id ?? "");
  }



  return {handlePublishDraftPostIteration};
};
