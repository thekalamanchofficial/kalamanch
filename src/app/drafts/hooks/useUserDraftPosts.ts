import { useState, useEffect } from "react";
import { trpc } from "~/server/client";
import { useUser } from "~/context/userContext";
import { DraftPost } from "~/app/editor/types/types";

type useUserDraftPostsStateResponse = {
  draftPostsForUser: DraftPost[];
};

export const useUserDraftPostsState = (): useUserDraftPostsStateResponse => {
  const { user } = useUser();

  const draftPostsQuery = trpc.draftPost.getDraftPostsForUser.useQuery(user?.id ?? "", {
    enabled: !!user,
  });

  return {
    draftPostsForUser: draftPostsQuery.data || [], 
  };
};
