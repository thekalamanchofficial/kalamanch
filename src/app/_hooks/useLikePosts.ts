import { trpc } from "~/server/client";

type UseLikeReturn = {
  likedPosts: string[];
};

type UseLikeInput = {
  userEmail: string;
};

type UseLikeHook = (input: UseLikeInput) => UseLikeReturn;

const useLikePosts: UseLikeHook = ({ userEmail }) => {
  const likeProcedure = trpc.likes;

  const { data: likedPostData } = likeProcedure.getUserLikes.useQuery(
    { userEmail: userEmail ?? "" },
    { enabled: !!userEmail },
  );

  return {
    likedPosts: likedPostData ?? [],
  };
};

export default useLikePosts;
