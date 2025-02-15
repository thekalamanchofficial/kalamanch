"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid2 as Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { PostType } from "@prisma/client";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import ThumbnailUploader from "~/app/_components/thumbnailUploader/ThumbnailUploader";
import { useCreatePostForm } from "../../_hooks/useCreatePostForm";
import { useGenresTags } from "../../_hooks/useGenreTags";
import { type CreatePostFormType } from "../../types/types";

export type CreatePostFormProps = {
  open: boolean;
  handleClose: () => void;
  createPostFormData: CreatePostFormType;
  handleFormSubmit: (data: CreatePostFormType) => void;
  update?: boolean;
};

export const PublishPostForm: React.FC<CreatePostFormProps> = ({
  open,
  handleClose,
  createPostFormData,
  handleFormSubmit,
  update,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useCreatePostForm({
    defaultValues: createPostFormData,
  });

  const {
    genres,
    tags,
    isGenresLoading,
    isTagsLoading,
    selectedGenres,
    selectedTags,
    toggleGenre,
    toggleTag,
  } = useGenresTags({ setValue });

  const postType = watch("postType");
  const [actors, setActors] = useState("");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ width: "100%" }}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 744,
        },
      }}
    >
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Controller
            control={control}
            name="title"
            defaultValue={createPostFormData.title}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth>
                <Typography variant="h4">Title</Typography>
                <TextField
                  type="text"
                  value={value}
                  onChange={onChange}
                  id="title"
                  label="Title"
                  placeholder="Enter title"
                  helperText={errors?.title?.message}
                  error={!!errors?.title?.message}
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="thumbnailUrl"
            defaultValue={createPostFormData?.thumbnailUrl}
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth>
                <Typography variant="h4">Upload Thumbnail</Typography>
                <ThumbnailUploader onMediaUpload={onChange} initialMedia={value} />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="thumbnailTitle"
            defaultValue={createPostFormData?.thumbnailTitle}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth>
                <Typography variant="h4">Thumbnail Title</Typography>
                <TextField
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter thumbnail title"
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="thumbnailDescription"
            defaultValue={createPostFormData?.thumbnailDescription}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth>
                <Typography variant="h4">Thumbnail Description</Typography>
                <TextField
                  type="text"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter thumbnail description"
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="postType"
            defaultValue={createPostFormData.postType ?? ""}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth error={!!errors?.postType?.message}>
                <Typography variant="h4">Post type</Typography>
                <Select
                  value={value}
                  onChange={onChange}
                  id="postType"
                  variant="outlined"
                  sx={{ height: "50px" }}
                  placeholder="Select post type"
                >
                  {Object.values(PostType).map((type) => (
                    <MenuItem key={type} value={type.toLowerCase()}>
                      {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors?.postType?.message}</FormHelperText>
              </FormControl>
            )}
          />
          {postType === "script" && (
            <Controller
              control={control}
              name="actors"
              defaultValue={createPostFormData.actors}
              render={({ field: { value = [], onChange } }) => {
                const handleAddActors = (e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter" && actors.trim()) {
                    onChange([...value, actors.trim()]);
                    setActors("");
                  }
                };

                return (
                  <FormControl fullWidth>
                    <Typography variant="h4">Actors</Typography>
                    <TextField
                      type="text"
                      value={actors}
                      onChange={(e) => setActors(e.target.value)}
                      onKeyDown={handleAddActors}
                      id="actors"
                      label="Add Actors"
                      placeholder="Enter your actors and press Enter"
                      helperText={errors?.actors?.message}
                      error={!!errors?.actors?.message}
                      variant="outlined"
                    />
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {value.map((actor, index) => (
                        <Chip
                          key={index}
                          label={actor}
                          onDelete={() => {
                            onChange(value.filter((_, i) => i !== index));
                          }}
                          sx={{
                            backgroundColor: "#f0f0f0",
                            fontWeight: "bold",
                            width: "fit-content",
                            padding: "4px 8px",
                          }}
                        />
                      ))}
                    </Box>
                  </FormControl>
                );
              }}
            />
          )}
          {/* <Controller
            control={control}
            name="selectedGenres"
            defaultValue={createPostFormData.selectedGenres}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth>
                <Typography variant="h4">Select Genres</Typography>
                <GenreMultiSelect value={value} onChange={onChange} />
              </FormControl>
            )}
          /> */}
          <Controller
            control={control}
            name="genres"
            defaultValue={selectedGenres}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth>
                <Typography variant="h4">Select relevant genres</Typography>
                {isGenresLoading ? (
                  <Typography>Loading genres...</Typography>
                ) : (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {genres.map((genre) => {
                      const isSelected = value?.includes(genre.id);
                      return (
                        <Chip
                          key={genre.id}
                          label={genre.name}
                          onClick={() => {
                            toggleGenre(genre.id);
                            onChange(
                              isSelected
                                ? value?.filter((id) => id !== genre.id)
                                : [...(value ?? []), genre.id],
                            );
                          }}
                          {...(isSelected && {
                            onDelete: () => {
                              toggleGenre(genre.id);
                              onChange(value?.filter((id) => id !== genre.id));
                            },
                            deleteIcon: <CloseIcon />,
                          })}
                          sx={{
                            backgroundColor: isSelected ? "secondary.main" : "grey.300",
                            color: isSelected ? "text.primary" : "primary.main",
                            border: isSelected ? "1px solid" : "none",
                            borderColor: isSelected ? "primary.main" : "grey.300",
                          }}
                        />
                      );
                    })}
                  </Box>
                )}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="tags"
            defaultValue={selectedTags}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth>
                <Typography variant="h4">Select relevant tags</Typography>
                {isTagsLoading ? (
                  <Typography>Loading tags...</Typography>
                ) : (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {tags.map((tag) => {
                      const isSelected = value?.includes(tag.id);
                      return (
                        <Chip
                          key={tag.id}
                          label={tag.name}
                          onClick={() => {
                            toggleTag(tag.id);
                            onChange(
                              isSelected
                                ? value?.filter((id) => id !== tag.id)
                                : [...(value ?? []), tag.id],
                            );
                          }}
                          {...(isSelected && {
                            onDelete: () => {
                              toggleTag(tag.id);
                              onChange(value?.filter((id) => id !== tag.id));
                            },
                            deleteIcon: <CloseIcon />,
                          })}
                          sx={{
                            backgroundColor: isSelected ? "secondary.main" : "grey.300",
                            color: isSelected ? "text.primary" : "primary.main",
                            border: isSelected ? "1px solid" : "none",
                            borderColor: isSelected ? "primary.main" : "grey.300",
                          }}
                        />
                      );
                    })}
                  </Box>
                )}
              </FormControl>
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", padding: 3 }}>
        <Button variant="outlined" onClick={handleClose} sx={{ width: "100px" }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit(handleFormSubmit)}
          sx={{ width: "100px" }}
        >
          {update ? STATIC_TEXTS.EDITOR_PAGE.UPDATE : STATIC_TEXTS.EDITOR_PAGE.CREATE}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishPostForm;
