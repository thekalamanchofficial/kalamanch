import { useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { Genre, Tag } from "@prisma/client";
import { trpc } from "~/app/_trpc/client";
import type { CreatePostFormType } from "../types/types";

type UseGenresTagsProps = {
  setValue: UseFormSetValue<CreatePostFormType>;
};

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

type UseGenreTags = (props: UseGenresTagsProps) => UseGenreTagsReturnType;

export const useGenresTags: UseGenreTags = ({ setValue }) => {
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

      const relatedTags = updatedGenres.flatMap(
        (gId) => genres.find((g) => g.id === gId)?.tags.map((t) => t.id) ?? [],
      );

      setSelectedTags(relatedTags);
      setValue("tags", relatedTags);

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
