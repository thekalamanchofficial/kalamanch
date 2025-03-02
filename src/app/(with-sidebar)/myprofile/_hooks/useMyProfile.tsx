import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useClerk } from "@clerk/nextjs";
import { FileUploadSource } from "types/enums";
import config from "~/app/_config/config";
import useBookmarkPosts from "~/app/_hooks/useBookmarkPosts";
import useLazyLoading from "~/app/_hooks/useLazyLoading";
import useLikePosts from "~/app/_hooks/useLikePosts";
import { handleError } from "~/app/_utils/handleError";
import { type Post } from "~/app/(with-sidebar)/myfeed/types/types";
import {
  MyProfileTabsEnum,
  type SaveUserInfo,
  type UseMyProfilePage,
  type UserInfo,
} from "~/app/(with-sidebar)/myprofile/types/types";
import { PostStatus } from "~/app/editor/types/types";
import { trpc } from "~/server/client";

interface Interests {
  genres: string[];
  tags: string[];
}

interface UserDetails {
  id?: string;
  name?: string;
  bio?: string | null;
  readingInterests?: Interests;
  writingInterests?: Interests;
  birthdate?: string | Date | null;
  education?: string[];
  professionalCredentials?: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  posts: Post[];
  followers: string[];
}

const useUserInfoState = (
  userDetails: UserDetails | null | undefined,
  userImageUrl: string | undefined,
) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    bio: "",
    readingInterests: { genres: [], tags: [] },
    writingInterests: { genres: [], tags: [] },
    birthdate: new Date(),
    education: [],
    professionalAchievements: "",
    profileImageUrl: "",
    coverImageUrl: "",
  });

  useEffect(() => {
    if (!userDetails) return;

    setUserInfo({
      name: userDetails.name ?? "",
      bio: userDetails.bio ?? "",
      readingInterests: userDetails.readingInterests ?? { genres: [], tags: [] },
      writingInterests: userDetails.writingInterests ?? { genres: [], tags: [] },
      birthdate: userDetails.birthdate ? new Date(userDetails.birthdate) : new Date(),
      education: userDetails.education ?? [],
      professionalAchievements: userDetails.professionalCredentials ?? "",
      profileImageUrl: userDetails.profileImageUrl ?? userImageUrl ?? "",
      coverImageUrl: userDetails.coverImageUrl ?? "",
    });
  }, [userDetails, userImageUrl]);

  return { userInfo, setUserInfo };
};

const usePostManagement = (userId: string | undefined, skip: number, hasMorePosts: boolean) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const postMutation = trpc.post;

  const {
    data: postData,
    isLoading: queryLoading,
    error,
  } = postMutation.getPosts.useQuery(
    {
      authorId: userId,
      skip,
      limit: skip === 0 ? config.lazyLoading.initialLimit : config.lazyLoading.limit,
    },
    {
      enabled: Boolean(userId) && hasMorePosts,
    },
  );

  const postDataWithComments = useMemo(() => {
    return (
      posts?.map((postItem) => ({
        ...postItem,
        comments: postItem.comments?.map((comment) => ({
          ...comment,
          postId: postItem.id,
        })),
      })) ?? []
    );
  }, [posts]);

  useEffect(() => {
    if (postData?.posts) {
      setPosts((prev) => {
        const existingPostIds = new Set(prev.map((post) => post.id));
        const newPosts = postData.posts.filter((post) => !existingPostIds.has(post.id));
        return [...prev, ...newPosts];
      });
    }
  }, [postData]);

  return { posts, setPosts, postDataWithComments, queryLoading, error, postData };
};

const useProfileEdit = (userMutation: typeof trpc.user, userEmail: string | undefined) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const updateUser = userMutation.updateUser.useMutation();

  const handleSave = async (saveData: SaveUserInfo): Promise<void> => {
    const toastId = toast.loading("Updating profile...");

    try {
      await updateUser.mutateAsync({
        email: userEmail ?? "",
        name: saveData.name,
        bio: saveData.bio,
        birthdate: saveData.birthdate,
        education: saveData.education,
        achievements: saveData.professionalAchievements,
        readingInterests: {
          genres: saveData.readingInterests?.genres ?? [],
          tags: saveData.readingInterests?.tags ?? [],
        },
        writingInterests: {
          genres: saveData.writingInterests?.genres ?? [],
          tags: saveData.writingInterests?.tags ?? [],
        },
      });

      toast.update(toastId, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setIsEditProfileOpen(false);
    } catch (error) {
      handleError(error);
      toast.update(toastId, {
        render: "Failed to update profile. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      throw error;
    }
  };

  return {
    isEditProfileOpen,
    setIsEditProfileOpen,
    handleSave,
  };
};

const useMyProfilePage = (): UseMyProfilePage => {
  const { user } = useClerk();
  const [tab, setTab] = useState(MyProfileTabsEnum.MY_POSTS);
  const [skip, setSkip] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(true);

  const userMutation = trpc.user;
  const likeMutation = trpc.likes;

  const { data: userDetails } = userMutation.getUserDetails.useQuery(
    user?.primaryEmailAddress?.emailAddress,
    {
      staleTime: 1 * 60 * 1000,
    },
  );

  const { data: userLikedPosts } = likeMutation.getUserLikedPost.useQuery(
    {
      userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
      postStatus: PostStatus.PUBLISHED.toString().toUpperCase(),
    },
    {
      enabled: !!user?.primaryEmailAddress?.emailAddress,
      staleTime: 1 * 60 * 1000,
    },
  );

  const { userInfo, setUserInfo } = useUserInfoState(
    userDetails as UserDetails | null,
    user?.imageUrl,
  );
  const { setPosts, postDataWithComments, queryLoading, error, postData } = usePostManagement(
    userDetails?.id,
    skip,
    hasMorePosts,
  );
  const { isEditProfileOpen, setIsEditProfileOpen, handleSave } = useProfileEdit(
    userMutation,
    user?.primaryEmailAddress?.emailAddress,
  );

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

  const handleImageUpdate = (uploadSource: FileUploadSource, url: string) => {
    setUserInfo((prev) => ({
      ...prev,
      ...(uploadSource === FileUploadSource.PROFILE_IMAGE
        ? { profileImageUrl: url }
        : { coverImageUrl: url }),
    }));
  };

  const handleEditProfileOpen = () => setIsEditProfileOpen(true);
  const handleEditProfileClose = () => setIsEditProfileOpen(false);
  const handleChange = (newTab: MyProfileTabsEnum) => setTab(newTab);

  const callSave = async (saveData: SaveUserInfo) => {
    try {
      await handleSave(saveData);
      setUserInfo((prev) => ({ ...prev, ...saveData }));
      handleEditProfileClose();
    } catch (error) {
      console.error(error);
    }
  };

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
    handleImageUpdate,
  };
};

export default useMyProfilePage;
