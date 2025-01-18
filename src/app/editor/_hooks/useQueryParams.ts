import { useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  return {
    postId: queryParams.postId ?? "",
    draftPostId: queryParams.draftPostId ?? "",
    title: queryParams.title ?? "",
    targetAudience: queryParams.targetAudience?.split(",") ?? [],
    postType: queryParams.postType ?? "",
    actors: queryParams.actors ? queryParams.actors.split(",") : [],
    tags: queryParams.tags?.split(",") ?? [],
    thumbnailUrl: queryParams.thumbnailUrl ?? "",
  };
};
