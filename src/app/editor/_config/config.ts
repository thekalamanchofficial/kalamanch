import { EditorTabsEnum } from "../types/types";

export const tabs: { label: string; value: EditorTabsEnum }[] = [
  { label: EditorTabsEnum.EDITOR, value: EditorTabsEnum.EDITOR },
  {
    label: EditorTabsEnum.PUBLISHED,
    value: EditorTabsEnum.PUBLISHED,
  },
];

export const DRAFT_AUTO_CREATE_DEBOUCE_DELAY = 1000;
export const DRAFT_AUTO_SAVE_THROTTLE_DELAY = 60000;
