import { useRouter } from "next/navigation";
import { PostStatus, EditorTabsEnum, type DraftPost } from "../types/types";
import type { Post } from "~/app/(with-sidebar)/myfeed/types/types";

type UseNavigateToPostEditorReturnType = {
    navigateToPostEditor: (postId: string, postStatus: PostStatus) => void;
};
type UseNavigateToPostEditorProps = {
    setDraftPost: React.Dispatch<React.SetStateAction<DraftPost | null>>;
    setPublishedPost:  React.Dispatch<React.SetStateAction<Post | null>>;
    changeTab: (editorTabsEnum: EditorTabsEnum) => void;
    
};

export const useNavigateToPostEditor = ({setDraftPost,setPublishedPost,changeTab}:UseNavigateToPostEditorProps): UseNavigateToPostEditorReturnType => {
    const router = useRouter();

    const navigateToPostEditor = (postId: string, postStatus: PostStatus) => {
        let queryData = {};
        if (postStatus === PostStatus.DRAFT) {
            queryData = { draftPostId: postId };
            setPublishedPost(null);
        } else {
            queryData = { postId: postId };
            setDraftPost(null);
        }
        const query = new URLSearchParams(queryData).toString();
        router.push(`/editor?${query}`);
        changeTab(EditorTabsEnum.EDITOR);
    };

    return { navigateToPostEditor };
};