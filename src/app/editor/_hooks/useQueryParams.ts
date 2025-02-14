import { useSearchParams } from "next/navigation";

type QueryParams = {
  postId : string;
  draftPostId: string;
  shouldDraftPost: boolean;
}
export const useQueryParams = (): QueryParams => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const shouldDraftPost = queryParams.draftPost === "true";

  return {
    postId: queryParams.postId ?? "",
    draftPostId: shouldDraftPost ? queryParams.draftPostId ?? "" : "",
    shouldDraftPost,
  };
};
