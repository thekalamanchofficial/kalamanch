import { useState, useEffect } from "react";
import { trpc } from "~/server/client";
import { useUser } from "~/context/userContext";
import { DraftPost, EditorTabsEnum } from "../types/types";
import { Post } from "~/app/(with-sidebar)/myfeed/types/types";

export const useUserPostsState = (activeTab: EditorTabsEnum) => {
  const { user } = useUser();
  const [draftPostsForUser, setDraftPostsForUser] = useState<DraftPost[]>([]);
  const [publishedPostsForUser, setPublishedPostsForUser] = useState<Post[]>([]);

  const draftPostsQuery = trpc.draftPost.getDraftPostsForUser.useQuery(user?.id ?? "", {
    enabled: activeTab === EditorTabsEnum.DRAFTS && !!user,
  });

  const publishedPostsQuery = trpc.post.getPosts.useQuery(
    { authorId: user?.id, skip: 0, limit: 100 },
    { enabled: !!user && activeTab === EditorTabsEnum.PUBLISHED }
  );

  useEffect(() => {
    if (draftPostsQuery.data) setDraftPostsForUser(draftPostsQuery.data);
  }, [draftPostsQuery.data]);

  useEffect(() => {
    if (publishedPostsQuery.data) setPublishedPostsForUser(publishedPostsQuery.data.posts);
  }, [publishedPostsQuery.data]);

  return {draftPostsForUser, publishedPostsForUser,setDraftPostsForUser,setPublishedPostsForUser};
};
