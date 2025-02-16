import { toast } from "react-toastify";
import { useUser } from "~/context/userContext";
import { useDraftPost } from "../../_hooks/useDraftPost";
import { usePost } from "../../_hooks/usePost";
import type { PublishDraftPostProps } from "../../editor/types/types";

type UseDraftPostIterationPublishingResponse = {
  handlePublishDraftPostIteration: (draftpost: PublishDraftPostProps, iterationId: string) => Promise<void>;
};

export const useDraftPostIterationPublishing = (): UseDraftPostIterationPublishingResponse => {
  const { publishPost } = usePost();
  const { user } = useUser();
  const { deleteDraftPost } = useDraftPost();

  const handlePublishDraftPostIteration = async (draftpost: PublishDraftPostProps, iterationId: string) => {
    const iteration = draftpost.iterations.find((i) => i.id == iterationId);
    if (!iteration) {
      toast.error("Iteration not found");
      return;
    }
    const content = iteration.content;
    await publishPost({
      content: content,
      authorId: user?.id ?? "",
      authorName: user?.name ?? "",
      authorProfileImageUrl: user?.profileImageUrl ?? "",
      title: draftpost.title,
      postType: draftpost.postType,
      actors: draftpost.actors,
      tags: draftpost.tags,
      genres: draftpost.genres,
      thumbnailDetails: {
        url: draftpost.thumbnailDetails.url,
        content: "",
        title: "",
      },
    });
    await deleteDraftPost(draftpost.id ?? "");
  };

  return { handlePublishDraftPostIteration };
};
