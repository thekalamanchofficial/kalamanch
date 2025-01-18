import { trpc } from "~/server/client";
import { useRouter } from "next/navigation";
import { handleError } from "~/app/_utils/handleError";
import { CreatePostProps, Post } from "~/app/(with-sidebar)/myfeed/types/types";

export const usePost = () => {
  const router = useRouter();
  const postMutation = trpc.post.addPost.useMutation();

  const publishPost = async (postData: CreatePostProps) => {
    try {
      await postMutation.mutateAsync(postData);
      router.push("/");
    } catch (error) {
      console.error("Failed to publish post:", error);
      handleError(error);
    }
  };

  return { publishPost };
};
