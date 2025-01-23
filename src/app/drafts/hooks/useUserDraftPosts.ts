import { useState, useEffect } from "react";
import { trpc } from "~/server/client";
import { useUser } from "~/context/userContext";
import { DraftPost } from "~/app/editor/types/types";

type useUserDraftPostsStateResponse = {
  draftPostsForUser: DraftPost[];
  setDraftPostsForUser: React.Dispatch<React.SetStateAction<DraftPost[]>>;
};

export const useUserDraftPostsState = (): useUserDraftPostsStateResponse => {
  const { user } = useUser();
  const [draftPostsForUser, setDraftPostsForUser] = useState<DraftPost[]>([]);

  const draftPostsQuery = trpc.draftPost.getDraftPostsForUser.useQuery(user?.id ?? "", {
    enabled: !!user,
  });

  useEffect(() => {
    if (draftPostsQuery.data) setDraftPostsForUser(draftPostsQuery.data);
  }, [draftPostsQuery.data]);
 
  return {draftPostsForUser,setDraftPostsForUser};
};
