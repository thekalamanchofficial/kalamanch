import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { handleError } from "~/app/_utils/handleError";
import type { CreatePostProps, PostDetails } from "~/app/(with-sidebar)/myfeed/types/types";
import { trpc } from "~/server/client";

type UsePostResponse = {
  publishPost: (postData: CreatePostProps) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  updatePostContent: (postId: string, content: string) => Promise<void>;
  updatePostDetails: (postId: string, postDetails: PostDetails) => Promise<void>;
};

const createMutationOptions = (successMessage: string) => ({
  onSuccess: () => toast.success(successMessage),
  onError: (error: unknown) => handleError(error),
});

export const usePost = (): UsePostResponse => {
  const router = useRouter();
  const addPostMutation = trpc.post.addPost.useMutation(
    createMutationOptions(STATIC_TEXTS.EDITOR_PAGE.POST_PUBLISHED_SUCCESS_MESSAGE),
  );
  const deletePostMutation = trpc.post.deletePost.useMutation(
    createMutationOptions(STATIC_TEXTS.EDITOR_PAGE.POST_UNPUBLISHED_SUCCESS_MESSAGE),
  );
  const updatePostContentMutation = trpc.post.updatePostContent.useMutation(
    createMutationOptions(STATIC_TEXTS.EDITOR_PAGE.POST_UPDATED_SUCCESS_MESSAGE),
  );
  const updatePostDetailsMutation = trpc.post.updatePostDetails.useMutation(
    createMutationOptions(STATIC_TEXTS.EDITOR_PAGE.POST_UPDATED_SUCCESS_MESSAGE),
  );

  const publishPost = async (postData: CreatePostProps) => {
    try {
      await addPostMutation.mutateAsync(postData);
      router.push("/");
    } catch (error) {
      console.error("Failed to publish post:", error);
    }
  };
  const deletePost = async (postId: string) => {
    try {
      await deletePostMutation.mutateAsync(postId);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };
  const updatePostContent = async (postId: string, content: string) => {
    try {
      await updatePostContentMutation.mutateAsync({
        id: postId,
        content,
      });
    } catch (error) {
      console.error("Failed to update post content:", error);
    }
  };

  const updatePostDetails = async (postId: string, postDetails: PostDetails) => {
    try {
      await updatePostDetailsMutation.mutateAsync({
        id: postId,
        postDetails,
      });
    } catch (error) {
      console.error("Failed to update post details:", error);
    }
  };

  return { publishPost, deletePost, updatePostContent, updatePostDetails };
};
