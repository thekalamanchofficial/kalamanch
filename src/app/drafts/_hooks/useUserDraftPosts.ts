import type { DraftPost } from "~/app/editor/types/types";
import { useUser } from "~/context/userContext";
import { trpc } from "~/server/client";

type useUserDraftPostsStateResponse = {
  draftPostsForUser: DraftPost[];
  isLoading: boolean;
  isPending: boolean;
};

export const useUserDraftPostsState = (): useUserDraftPostsStateResponse => {
  const { user } = useUser();

  const { data, isLoading, isPending } = trpc.draftPost.getDraftPostsForUser.useQuery(
    user?.id ?? "",
    { enabled: !!user },
  );

  return {
    draftPostsForUser: data ?? [],
    isLoading,
    isPending,
  };
};
