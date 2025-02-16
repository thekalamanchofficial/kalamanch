import { useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { Genre, Tag } from "@prisma/client";
import { trpc } from "~/app/_trpc/client";
import type { CreatePostFormType } from "../types/types";

type UseGenreTagsReturnType = {
  genres: (Genre & { tags: Tag[] })[];
  tags: Tag[];
  isGenresLoading: boolean;
  isTagsLoading: boolean;
  genresError: unknown;
  tagsError: unknown;
  selectedGenres: string[];
  selectedTags: string[];
  toggleGenre: (genreId: string) => void;
  toggleTag: (tagId: string) => void;
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

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prevGenres) => {
      const isSelected = prevGenres.includes(genreId);
      const updatedGenres = isSelected
        ? prevGenres.filter((id) => id !== genreId)
        : [...prevGenres, genreId];
      return updatedGenres;
    });
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId],
    );
  };

  return {
    genres,
    tags,
    isGenresLoading,
    isTagsLoading,
    genresError,
    tagsError,
    selectedGenres,
    selectedTags,
    toggleGenre,
    toggleTag,
  };
};
