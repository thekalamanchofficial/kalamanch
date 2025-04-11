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
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import ThumbnailUploader from "~/app/_components/thumbnailUploader/ThumbnailUploader";
import { useCreatePostForm } from "../../_hooks/useCreatePostForm";
import { useGenresTags } from "../../_hooks/useGenreTags";
import usePostTypes from "../../_hooks/usePostTypes";
import { type CreatePostFormType } from "../../types/types";

export type PublishPostFormProps = {
  open: boolean;
  handleClose: () => void;
  postFormData: CreatePostFormType;
  handleFormSubmit: (data: CreatePostFormType) => void;
  update?: boolean;
};

export const PublishPostForm: React.FC<PublishPostFormProps> = ({
  open,
  handleClose,
  postFormData,
  handleFormSubmit,
  update,
}) => {
  const [actors, setActors] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useCreatePostForm({
    defaultValues: postFormData,
  });
  const { genres, tags, isGenresLoading, isTagsLoading } = useGenresTags();

  const { postTypes } = usePostTypes();

  const selectedPostType = watch("postTypeId");

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
      <DialogTitle>{update ? "Update Post" : "Publish Post"}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Only the title is mandatory. However, providing additional details will help in better
          reach.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Controller
            control={control}
            name="title"
            defaultValue={postFormData.title}
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
            name="showThumbnail"
            defaultValue={false}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth>
                <Typography variant="h4">Show thumbnail</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography>No</Typography>
                  <Switch
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                    inputProps={{ "aria-label": "Show Thumbnail Switch" }}
                    sx={{
                      "& .MuiButtonBase-root": {
                        minHeight: "38px",
                      },
                    }}
                  />
                  <Typography>Yes</Typography>
                </Box>
              </FormControl>
            )}
          />
          {watch("showThumbnail") && (
            <>
              <Controller
                control={control}
                name="thumbnailUrl"
                defaultValue={postFormData?.thumbnailUrl}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth>
                    <Typography variant="h4">Upload thumbnail</Typography>
                    <ThumbnailUploader onMediaUpload={onChange} initialMedia={value} />
                    <FormHelperText error={!!errors?.thumbnailUrl?.message}>
                      {errors?.thumbnailUrl?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="thumbnailTitle"
                defaultValue={postFormData?.thumbnailTitle}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth>
                    <Typography variant="h4">Thumbnail title</Typography>
                    <TextField
                      type="text"
                      value={value}
                      onChange={onChange}
                      placeholder="Enter thumbnail title"
                      variant="outlined"
                      fullWidth
                      helperText={errors?.thumbnailTitle?.message}
                      error={!!errors?.thumbnailTitle?.message}
                    />
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="thumbnailDescription"
                defaultValue={postFormData?.thumbnailDescription}
                render={({ field: { value, onChange } }) => (
                  <FormControl fullWidth>
                    <Typography variant="h4">Thumbnail description</Typography>
                    <TextField
                      type="text"
                      value={value}
                      onChange={onChange}
                      placeholder="Enter thumbnail description"
                      variant="outlined"
                      fullWidth
                      helperText={errors?.thumbnailDescription?.message}
                      error={!!errors?.thumbnailDescription?.message}
                    />
                  </FormControl>
                )}
              />
            </>
          )}

          <Controller
            control={control}
            name="postTypeId"
            defaultValue={selectedPostType}
            render={({ field: { value, onChange } }) => (
              <FormControl fullWidth error={!!errors?.postTypeId?.message}>
                <Typography variant="h4">Post type</Typography>
                <Select
                  value={value}
                  onChange={onChange}
                  id="postType"
                  variant="outlined"
                  sx={{ height: "50px" }}
                  slotProps={{
                    input: {
                      placeholder: "Select post type",
                    },
                  }}
                >
                  {postTypes.map((postType) => (
                    <MenuItem key={postType.id} value={postType.id}>
                      {postType.name.charAt(0).toUpperCase() + postType.name.slice(1).toLowerCase()}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors?.postTypeId?.message}</FormHelperText>
              </FormControl>
            )}
          />
          {postTypes.find((postType) => postType.id === selectedPostType)?.name === "SCRIPT" && (
            <Controller
              control={control}
              name="actors"
              defaultValue={postFormData.actors}
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
          <Controller
            control={control}
            name="genres"
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
                            onChange(
                              isSelected
                                ? value?.filter((id) => id !== genre.id)
                                : [...(value ?? []), genre.id],
                            );
                          }}
                          {...(isSelected && {
                            onDelete: () => {
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
                            onChange(
                              isSelected
                                ? value?.filter((id) => id !== tag.id)
                                : [...(value ?? []), tag.id],
                            );
                          }}
                          {...(isSelected && {
                            onDelete: () => {
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
