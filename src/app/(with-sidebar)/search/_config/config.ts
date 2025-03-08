export const SEARCH_ITEMS_PER_PAGE = 10;

export type SortByOption = "recent" | "popular" | "relevant";
export type FilterTypeOption = "all" | "people" | "posts";

export const SORT_OPTIONS: Record<SortByOption, string> = {
  recent: "Recent",
  popular: "Popular",
  relevant: "Relevant",
};

export const FILTER_OPTIONS: Record<FilterTypeOption, string> = {
  all: "All",
  people: "People",
  posts: "Posts",
};

export const DEFAULT_SORT_BY: SortByOption = "recent";
export const DEFAULT_FILTER_TYPE: FilterTypeOption = "all";
export const DEFAULT_PAGE = 1;

export const SEARCH_RESULTS_CACHE_TIME = 10000;
