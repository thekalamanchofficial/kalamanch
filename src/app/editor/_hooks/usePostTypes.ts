import type { PostType } from "@prisma/client";
import { trpc } from "~/app/_trpc/client";

type UsePostType = () => {
  postTypes: PostType[];
  isLoading: boolean;
  error: string | null;
};

const usePostTypes: UsePostType = () => {
  const { data: postTypes = [], isLoading, error } = trpc.post.getPostTypes.useQuery();

  return {
    postTypes,
    isLoading,
    error: error?.message ?? null,
  };
};

export default usePostTypes;
