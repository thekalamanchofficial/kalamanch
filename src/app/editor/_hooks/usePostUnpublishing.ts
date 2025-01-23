import { usePost } from "../../_hooks/usePost";
import { Post } from "~/app/(with-sidebar)/myfeed/types/types";

type PostUnpublishingProps = {
  setPublishedPostsForUser: React.Dispatch<React.SetStateAction<Post[]>>
}

type UsePostUnpublishingResponse = {
  handlePostUnPublishing: (postId: string) => Promise<void>;
};

export const usePostUnpublishing = ({setPublishedPostsForUser}:PostUnpublishingProps): UsePostUnpublishingResponse => {
  const {deletePost} = usePost();
  const handlePostUnPublishing = async (postId: string) => {
      await deletePost(postId);
      setPublishedPostsForUser((prev) => prev.filter((post) => post.id !== postId));
  }
  return {handlePostUnPublishing};
};
