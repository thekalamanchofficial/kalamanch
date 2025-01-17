import { useSearchParams } from "next/navigation";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  return {
    postId: queryParams.postId ?? "",
    draftPostId: queryParams.draftPostId ?? ""
  };
};
