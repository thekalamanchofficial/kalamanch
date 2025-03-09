export enum SortByEnum {
  RECENT = "recent",
  POPULAR = "popular",
  RELEVANT = "relevant",
}

export enum FilterTypeEnum {
  ALL = "all",
  PEOPLE = "people",
  POSTS = "posts",
}

export const SORT_OPTIONS: Record<SortByEnum, string> = {
  [SortByEnum.RELEVANT]: "Relevant",
  [SortByEnum.RECENT]: "Recent",
  [SortByEnum.POPULAR]: "Popular",
};

export const FILTER_OPTIONS: Record<FilterTypeEnum, string> = {
  [FilterTypeEnum.ALL]: "All",
  [FilterTypeEnum.PEOPLE]: "People",
  [FilterTypeEnum.POSTS]: "Posts",
};

export const DEFAULT_SORT_BY = SortByEnum.RELEVANT;
export const DEFAULT_FILTER_TYPE = FilterTypeEnum.ALL;
export const DEFAULT_PAGE = 1;
export const SEARCH_ITEMS_PER_PAGE = 10;
export const SEARCH_RESULTS_CACHE_TIME = 10000;
