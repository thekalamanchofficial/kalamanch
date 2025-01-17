import { useState } from "react";
import { QueryParams } from "../types/types";
import { Post, PostDetails } from "~/app/(with-sidebar)/myfeed/types/types";

 export const useCreatePostFormDataState = (postDetails?: PostDetails) => {
    const [isCreatePostFormOpen, setIsCreatePostFormOpen] = useState(false);
    const formData = {
        title: postDetails?.title ?? "",
        actors: postDetails?.actors,
        thumbnailUrl: postDetails?.thumbnailDetails.url,
        tags: postDetails?.tags,
        postType: postDetails?.postType.toLowerCase(),
        targetAudience: postDetails?.targetAudience,
    };
    const openCreatePostForm = () => setIsCreatePostFormOpen(true);
    const closeCreatePostForm = () => setIsCreatePostFormOpen(false);

      
    return { formData,isCreatePostFormOpen, openCreatePostForm,closeCreatePostForm };
};