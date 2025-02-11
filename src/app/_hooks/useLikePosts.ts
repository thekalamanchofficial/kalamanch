import { trpc } from "~/server/client";

type UseLikeReturn = {
  likedPosts: string[];
};

type UseLikeInput = {
  userEmail: string;
  postStatus: string;
};

type UseLikeHook = (input: UseLikeInput) => UseLikeReturn;

const useLikePosts: UseLikeHook = ({ userEmail, postStatus }) => {
  const likeProcedure = trpc.likes;

  const { data: likedPostData } = likeProcedure.getUserLikes.useQuery(
    { userEmail: userEmail ?? "", postStatus },
    { enabled: !!userEmail },
  );

  return {
    likedPosts: likedPostData ?? [],
  };
};

export default useLikePosts;
