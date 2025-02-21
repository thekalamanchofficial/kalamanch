import { useEffect, useState } from "react";
import type { PostType } from "@prisma/client";
import { trpc } from "~/app/_trpc/client";

type UsePostTypesProps = {
  postTypeId?: string;
};

type UsePostType = ({ postTypeId }: UsePostTypesProps) => {
  postTypes: PostType[];
  isLoading: boolean;
  error: string | null;
  handlePostTypeSelect: (id: string) => void;
  selectedPostType: PostType | null;
};

const usePostTypes: UsePostType = ({ postTypeId }) => {
  const [selectedPostType, setSelectedPostType] = useState<PostType | null>(null);
  const { data: postTypes = [], isLoading, error } = trpc.post.getPostTypes.useQuery();

  const handlePostTypeSelect = (id: string) => {
    const postType = postTypes.find((postType) => postType.id === id);
    if (postType) {
      setSelectedPostType(postType);
    }
  };

  useEffect(() => {
    if (postTypeId && postTypes.length > 0) {
      const postType = postTypes.find((postType) => postType.id === postTypeId);
      if (postType) {
        setSelectedPostType(postType);
      }
    }
  }, [postTypeId, postTypes]);

  return {
    postTypes,
    isLoading,
    error: error?.message ?? null,
    handlePostTypeSelect,
    selectedPostType,
  };
};

export default usePostTypes;
