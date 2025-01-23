import { usePost } from "../_hooks/usePost";
import { useUser } from "~/context/userContext";
import { type DraftPost } from "../types/types";
import { toast } from "react-toastify";
import { useDraftPost } from "./useDraftPost";
import { type Post } from "~/app/(with-sidebar)/myfeed/types/types";


type PostPublishingProps = {
  setPublishedPostsForUser: React.Dispatch<React.SetStateAction<Post[]>>
}

type UsePostPublishingResponse = {
  handlePublishDraftPostIteration: (draftpost: DraftPost, iterationId: string) => Promise<void>;
  handlePostUnPublishing: (postId: string) => Promise<void>;
};


export const usePostPublishing = ({setPublishedPostsForUser}:PostPublishingProps): UsePostPublishingResponse => {
  const { publishPost,deletePost} = usePost();
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

  const handlePostUnPublishing = async (postId: string) => {
      await deletePost(postId);
      setPublishedPostsForUser((prev) => prev.filter((post) => post.id !== postId));
  }



  return {handlePublishDraftPostIteration,handlePostUnPublishing};
};
