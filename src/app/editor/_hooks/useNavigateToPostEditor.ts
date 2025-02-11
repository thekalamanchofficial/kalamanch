import { useRouter } from "next/navigation";
import { EditorTabsEnum, PostStatus } from "../types/types";

type UseNavigateToPostEditorReturnType = {
  navigateToPostEditor: (postId: string, postStatus: PostStatus) => void;
};
type UseNavigateToPostEditorProps = {
  changeTab?: (editorTabsEnum: EditorTabsEnum) => void;
};

export const useNavigateToPostEditor = ({
  changeTab,
}: UseNavigateToPostEditorProps): UseNavigateToPostEditorReturnType => {
  const router = useRouter();

  const navigateToPostEditor = (postId: string, postStatus: PostStatus) => {
    let queryData = {};
    if (postStatus === PostStatus.DRAFT) {
      queryData = { draftPostId: postId };
    } else {
      queryData = { postId: postId };
    }
    const query = new URLSearchParams(queryData).toString();
    router.push(`/editor?${query}`);
    changeTab?.(EditorTabsEnum.EDITOR);
  };

  return { navigateToPostEditor };
};
