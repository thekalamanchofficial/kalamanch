import {
  MyProfileTabsEnum,
  type SaveUserInfo,
} from "~/app/(with-sidebar)/myprofile/types/types";
import { type Post } from "~/app/(with-sidebar)/myfeed/types/types";

import { handleError } from "~/app/_utils/handleError";
import config from "~/app/_config/config";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
import { trpc } from "~/server/client";
import { toast } from "react-toastify";
import {
  type UserInfo,
  type UseMyProfilePage,
} from "~/app/(with-sidebar)/myprofile/types/types";
import { PostStatus } from "~/app/editor/types/types";
import useBookmarkPosts from "~/app/_hooks/useBookmarkPosts";
import useLikePosts from "~/app/_hooks/useLikePosts";
import useLazyLoading from "~/app/_hooks/useLazyLoading";
import { FileUploadSource } from "types/enums";

const useMyProfilePage = (): UseMyProfilePage => {
  const { user } = useClerk();
  const [tab, setTab] = useState(MyProfileTabsEnum.MY_POSTS);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);
  const [post, setPosts] = useState<Post[]>([]);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    bio: "",
    interests: [],
    birthdate: new Date(),
    education: [],
    professionalAchievements: "",
    profileImageUrl: "",
    coverImageUrl: "",
  });

  const postMutation = trpc.post;
  const likeMutation = trpc.likes;
  const userMutation = trpc.user;

  const { data: userDetails } = userMutation.getUserDetails.useQuery(
    user?.primaryEmailAddress?.emailAddress,
  );

  const { data: userLikedPosts } = likeMutation.getUserLikedPost.useQuery(
    {
      userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
      postStatus: PostStatus.PUBLISHED.toString().toUpperCase(),
    },
    {
      enabled: !!user?.primaryEmailAddress?.emailAddress,
    },
  );

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
      profileImageUrl: userDetails?.profileImageUrl ?? user?.imageUrl ?? "",
      coverImageUrl: userDetails?.coverImageUrl ?? "",
    });
  }, [userDetails, user?.imageUrl]);

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
      enabled: Boolean(userDetails?.id) && hasMorePosts,
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

  const handleEditProfileOpen = () => {
    setIsEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false);
  };

  const handleChange = (newTab: MyProfileTabsEnum) => {
    setTab(newTab);
  };

  const handleImageUpdate = (uploadSource: FileUploadSource, url: string) => {
    if(uploadSource === FileUploadSource.PROFILE_IMAGE){
      setUserInfo({
        ...userInfo,
        profileImageUrl: url,
      });
    }
    else if(uploadSource === FileUploadSource.PROFILE_COVER_IMAGE){
      setUserInfo({
        ...userInfo,
        coverImageUrl: url,
      });
    }
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

  const { handleScroll } = useLazyLoading({
    queryLoading,
    error: error?.message ?? "",
    initialLimit: config.lazyLoading.initialLimit,
    limit: config.lazyLoading.limit,
    skip,
    setSkip,
    hasMoreData: postData?.hasMorePosts ?? hasMorePosts,
    setHasMoreData: setHasMorePosts,
  });

  const { likedPosts } = useLikePosts({
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
    postStatus: PostStatus.PUBLISHED.toString().toUpperCase(),
  });

  const { bookmarkedPosts } = useBookmarkPosts({
    userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
  });

  useEffect(() => {
    if (postData?.posts) {
      setPosts((prev) => {
        const existingPostIds = new Set(prev.map((post) => post.id));
        // TODO: find a better way to remove duplicate posts, try out using trpc infinite query.
        const newPosts = postData.posts.filter(
          (post) => !existingPostIds.has(post.id),
        );
        return [...prev, ...newPosts];
      });
    }
  }, [postData]);

  return {
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
    postCount: userDetails?.posts.length ?? 0,
    followerCount: userDetails?.followers.length ?? 0,
    isEditProfileOpen,
    handleEditProfileClose,
    handleEditProfileOpen,
    handleSave,
    userLikedPosts: userLikedPosts ?? [],
    userInfo,
    callSave,
    handleImageUpdate
  };
};

export default useMyProfilePage;
