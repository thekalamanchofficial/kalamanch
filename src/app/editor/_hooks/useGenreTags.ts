import type { Genre, Tag } from "@prisma/client";
import { trpc } from "~/app/_trpc/client";

type UseGenreTagsReturnType = {
  genres: (Genre & { tags: Tag[] })[];
  tags: Tag[];
  isGenresLoading: boolean;
  isTagsLoading: boolean;
  genresError: unknown;
  tagsError: unknown;
};

type UseGenreTags = () => UseGenreTagsReturnType;

export const useGenresTags: UseGenreTags = () => {
  const {
    data: genres = [],
    isLoading: isGenresLoading,
    error: genresError,
  } = trpc.genreTagRouter.getGenres.useQuery();

  const {
    data: tags = [],
    isLoading: isTagsLoading,
    error: tagsError,
  } = trpc.genreTagRouter.getTags.useQuery();

  return {
    genres,
    tags,
    isGenresLoading,
    isTagsLoading,
    genresError,
    tagsError,
  };
};
