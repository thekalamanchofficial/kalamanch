import {
  MyProfileTabsEnum,
  type SaveUserInfo,
} from "~/app/(with-sidebar)/myprofile/types/types";
import {
  type Post,
} from "~/app/(with-sidebar)/myfeed/types/types";

import { handleError } from "~/app/_utils/handleError";
import config from "~/app/_config/config";
import { useClerk } from "@clerk/nextjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { trpc } from "~/server/client";
import { toast } from "react-toastify";
import {
  type UserInfo,
  type UseMyProfilePage,
} from "~/app/(with-sidebar)/myprofile/types/types";

const useMyProfilePage = (): UseMyProfilePage => {
  const { user } = useClerk();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const [tab, setTab] = useState(MyProfileTabsEnum.MY_POSTS);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState<boolean | undefined>(true);
  const [post, setPosts] = useState<Post[]>([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    bio: "",
    interests: [],
    birthdate: new Date(),
    education: [],
    professionalAchievements: "",
  });

  const postMutation = trpc.post;
  const likeMutation = trpc.likes;
  const userMutation = trpc.user;
  const bookmarkProcedure = trpc.bookmarks;

  const { data: userDetails } = userMutation.getUserDetails.useQuery(
    user?.primaryEmailAddress?.emailAddress,
  );

  const { data: userLikedPosts } = likeMutation.getUserLikedPost.useQuery(
    {
      userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
    },
    {
      enabled: !!user?.primaryEmailAddress?.emailAddress,
    },
  );

  const { data: bookmarkedPostData } =
    bookmarkProcedure.getUserBookmarkPosts.useQuery({
      limit: null,
      userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
    });

  useEffect(() => {
    setUserInfo({
      name: userDetails?.name ?? "",
      bio: userDetails?.bio ?? "",
      interests: userDetails?.interests ?? [],
      birthdate: userDetails?.birthdate
        ? new Date(userDetails.birthdate)
        : new Date(),
      education: userDetails?.education ?? [],
      professionalAchievements: userDetails?.professionalCredentials ?? "",
    });
  }, [userDetails]);

  const {
    data: postData,
    isLoading: queryLoading,
    error,
  } = postMutation.getPosts.useQuery(
    {
      authorId: userDetails?.id,
      skip,
      limit:
        skip === 0 ? config.lazyLoading.initialLimit : config.lazyLoading.limit,
    },
    {
      enabled: Boolean(userDetails?.id) && skip >= 0 && hasMorePosts === true,
    },
  );

  const postDataWithComments: Post[] = useMemo(() => {
    return (
      post?.map((postItem) => ({
        ...postItem,
        comments: postItem.comments?.map((comment) => ({
          ...comment,
          postId: postItem.id,
        })),
      })) ?? []
    );
  }, [post]);

  const { data: likedPostData } = likeMutation.getUserLikes.useQuery(
    { userEmail: user?.primaryEmailAddress?.emailAddress ?? "" },
    {
      enabled: !!user?.primaryEmailAddress?.emailAddress,
    },
  );

  const handleEditProfileOpen = () => {
    setIsEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false);
  };

  const handleChange = (newTab: MyProfileTabsEnum) => {
    setTab(newTab);
  };

  const updateUser = userMutation.updateUser.useMutation();

  const handleSave = async ({
    name,
    bio,
    interests,
    birthdate,
    education,
    professionalAchievements,
  }: {
    name: string;
    bio: string;
    birthdate: Date;
    interests: string[];
    education: string[];
    professionalAchievements: string;
  }) => {
    const toastId = toast.loading("Updating profile...");

    try {
      await updateUser.mutateAsync({
        name,
        bio,
        email: user?.primaryEmailAddress?.emailAddress ?? "",
        birthdate,
        education,
        achievements: professionalAchievements,
        interests,
      });
      toast.update(toastId, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setUserInfo({
        name,
        bio,
        interests,
        birthdate,
        education,
        professionalAchievements,
      });
    } catch (error) {
      handleError(error);
      toast.update(toastId, {
        render: "Failed to update profile. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const callSave = async ({
    name,
    bio,
    birthdate,
    interests,
    education,
    professionalAchievements,
  }: SaveUserInfo) => {
    try {
      await handleSave({
        name,
        birthdate,
        bio: bio ?? "",
        interests: interests ?? [],
        education: education ?? [],
        professionalAchievements: professionalAchievements ?? "",
      });
      handleEditProfileClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const bottomReached = scrollHeight - scrollTop - clientHeight < 10;

    if (bottomReached && !queryLoading && !error) {
      setHasMorePosts(postData?.hasMorePosts);
      setSkip((prev) =>
        prev == 0
          ? config.lazyLoading.initialLimit + prev
          : prev + config.lazyLoading.limit,
      );
    }
  }, [error, postData?.hasMorePosts, queryLoading]);

  useEffect(() => {
    setPosts((prevPosts) => [...(prevPosts ?? []), ...(postData?.posts ?? [])]);
  }, [postData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, hasMorePosts, queryLoading]);

  useEffect(() => {
    if (likedPostData) {
      setLikedPosts(likedPostData);
    }
  }, [likedPostData]);

  useEffect(() => {
    if (bookmarkedPostData) {
      setBookmarkedPosts(bookmarkedPostData.items.map((post) => post.id));
    }
  }, [bookmarkedPostData]);

  return {
    posts: postDataWithComments,
    setPosts,
    likedPosts,
    queryLoading,
    hasMorePosts: !!hasMorePosts,
    postDataWithComments,
    tab,
    skip,
    setSkip,
    bookmarkedPosts,
    handleChange,
    errorMessage: error?.message ?? "",
    handleScroll,
    userProfile: user?.imageUrl ?? "",
    postCount: userDetails?.posts.length ?? 0,
    followerCount: userDetails?.followers.length ?? 0,
    isEditProfileOpen,
    handleEditProfileClose,
    handleEditProfileOpen,
    handleSave,
    userLikedPosts: userLikedPosts ?? [],
    userInfo,
    callSave,
  };
};

export default useMyProfilePage;
