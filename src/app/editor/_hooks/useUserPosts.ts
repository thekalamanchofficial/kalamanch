import { useEffect, useState } from "react";
import type { Post } from "~/app/(with-sidebar)/myfeed/types/types";
import { useUser } from "~/context/userContext";
import { trpc } from "~/server/client";
import { EditorTabsEnum } from "../types/types";

type UseUserPostsStateProps = {
  activeTab: EditorTabsEnum;
};

type UseUserPostsStateResponse = {
  publishedPostsForUser: Post[];
  setPublishedPostsForUser: React.Dispatch<React.SetStateAction<Post[]>>;
};

export const useUserPostsState = ({
  activeTab,
}: UseUserPostsStateProps): UseUserPostsStateResponse => {
  const { user } = useUser();
  const [publishedPostsForUser, setPublishedPostsForUser] = useState<Post[]>([]);

  const publishedPostsQuery = trpc.post.getPosts.useQuery(
    { authorId: user?.id, skip: 0, limit: 100 },
    { enabled: !!user && activeTab === EditorTabsEnum.PUBLISHED },
  );

  useEffect(() => {
    if (publishedPostsQuery.data) setPublishedPostsForUser(publishedPostsQuery.data.posts);
  }, [publishedPostsQuery.data]);

  return { publishedPostsForUser, setPublishedPostsForUser };
};
