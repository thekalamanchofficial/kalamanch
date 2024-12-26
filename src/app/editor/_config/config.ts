import { EditorTabsEnum } from "../types/types";

export const tabs: { label: string; value: EditorTabsEnum }[] = [
  { label: EditorTabsEnum.EDITOR, value: EditorTabsEnum.EDITOR },
  {
    label: EditorTabsEnum.DRAFTS,
    value: EditorTabsEnum.DRAFTS,
  },
  {
    label: EditorTabsEnum.PUBLISHED,
    value: EditorTabsEnum.PUBLISHED,
  },
];
