import type { DraftPost } from "~/app/editor/types/types";
import { useUser } from "~/context/userContext";
import { trpc } from "~/server/client";

type useUserDraftPostsStateResponse = {
  draftPostsForUser: DraftPost[];
};

export const useUserDraftPostsState = (): useUserDraftPostsStateResponse => {
  const { user } = useUser();

  const draftPostsQuery = trpc.draftPost.getDraftPostsForUser.useQuery(user?.id ?? "", {
    enabled: !!user,
  });

  return {
    draftPostsForUser: draftPostsQuery.data ?? [],
  };
};
