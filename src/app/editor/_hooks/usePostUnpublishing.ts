import type { Post } from "~/app/(with-sidebar)/myfeed/types/types";
import { usePost } from "../../_hooks/usePost";

type PostUnpublishingProps = {
  setPublishedPostsForUser?: React.Dispatch<React.SetStateAction<Post[]>>;
};

type UsePostUnpublishingReturn = {
  handlePostUnPublishing: (postId: string) => Promise<void>;
};

type UsePostUnpublishing = (props: PostUnpublishingProps) => UsePostUnpublishingReturn;

export const usePostUnpublishing: UsePostUnpublishing = ({ setPublishedPostsForUser }) => {
  const { deletePost } = usePost();
  const handlePostUnPublishing = async (postId: string) => {
    await deletePost(postId);
    if (!setPublishedPostsForUser) return;
    setPublishedPostsForUser((prev) => prev.filter((post) => post.id !== postId));
  };
  return { handlePostUnPublishing };
};
