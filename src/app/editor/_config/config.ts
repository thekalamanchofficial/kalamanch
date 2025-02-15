import { EditorTabsEnum } from "../types/types";

export const tabs: { label: string; value: EditorTabsEnum }[] = [
  { label: EditorTabsEnum.EDITOR, value: EditorTabsEnum.EDITOR },
  {
    label: EditorTabsEnum.PUBLISHED,
    value: EditorTabsEnum.PUBLISHED,
  },
];

export const TARGET_AUDIENCE_OPTIONS = [
  "Kids",
  "Teens",
  "Adults",
  "Elderly",
  "Educators",
  "Researchers",
];
