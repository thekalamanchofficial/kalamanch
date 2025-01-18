import { useSearchParams } from "next/navigation";

type QueryParams = {
  postId : string;
  draftPostId: string;
}
export const useQueryParams = (): QueryParams => {
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());

  return {
    postId: queryParams.postId ?? "",
    draftPostId: queryParams.draftPostId ?? ""
  };
};
