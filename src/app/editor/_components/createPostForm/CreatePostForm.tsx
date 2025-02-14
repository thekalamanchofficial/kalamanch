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
import { TARGET_AUDIENCE_OPTIONS } from "~/app/editor/_config/config";
import { INTEREST_ARRAY } from "~/app/sign-up/_config/config";
import { useCreatePostForm } from "../../_hooks/useCreatePostForm";
import { type CreatePostFormType } from "../../types/types";

export type CreatePostFormProps = {
  open: boolean;
  handleClose: () => void;
  createPostFormData: CreatePostFormType;
  handleFormSubmit: (data: CreatePostFormType) => void;
  update?: boolean;
};

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
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
  } = useCreatePostForm({
    defaultValues: createPostFormData,
  });

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
                sx={{ mb: 2, mt: 2 }}
              />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="targetAudience"
          defaultValue={createPostFormData.targetAudience}
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <Typography variant="h4" gutterBottom>
                Select Target Audience
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {TARGET_AUDIENCE_OPTIONS.map((option) => {
                  const isSelected = value?.includes(option);

                  return (
                    <Chip
                      key={option}
                      label={option}
                      clickable
                      onClick={() => {
                        if (isSelected) {
                          onChange(value?.filter((item) => item !== option));
                        } else {
                          onChange([...(value ?? []), option]);
                        }
                      }}
                      {...(isSelected && {
                        onDelete: () => {
                          onChange(value?.filter((item) => item !== option));
                        },
                        deleteIcon: <CloseIcon />,
                      })}
                      sx={{
                        backgroundColor: isSelected ? "secondary.main" : "grey.300",
                        color: isSelected ? "text.primary" : "primary.main",
                        border: isSelected ? "1px solid" : "none",
                        borderColor: isSelected ? "primary.main" : "solid grey.300",
                      }}
                    />
                  );
                })}
              </Box>
              {errors?.targetAudience?.message && (
                <Typography color="error" variant="body2">
                  {errors.targetAudience.message}
                </Typography>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="thumbnailUrl"
          defaultValue={createPostFormData?.thumbnailUrl}
          render={({ field: { onChange } }) => (
            <FormControl fullWidth>
              <Typography variant="h4">Upload Thumbnail</Typography>
              <ThumbnailUploader
                onMediaUpload={onChange}
                initialMedia={createPostFormData?.thumbnailUrl}
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
                sx={{ mb: 2, mt: 1, height: "50px" }}
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
                  const updatedActors = [...value, actors.trim()];
                  onChange(updatedActors);
                  setActors("");
                }
              };

              const handleRemoveActors = (index: number) => {
                const updatedActors = value.filter((_, i) => i !== index);
                onChange(updatedActors);
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
                    sx={{
                      mb: 2,
                      "& .MuiInputBase-inputMultiline": { minHeight: 64 },
                    }}
                  />
                  <Box
                    sx={{
                      mb: 2,
                    }}
                  >
                    {value.map((actor, index) => (
                      <Chip
                        key={index}
                        label={actor}
                        onDelete={() => handleRemoveActors(index)}
                        sx={{
                          backgroundColor: "#f0f0f0",
                          fontWeight: "bold",
                          width: "fit-content",
                          padding: "4px 8px",
                          margin: "4px",
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
          name="tags"
          defaultValue={createPostFormData.tags}
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth>
              <Typography variant="h4" gutterBottom>
                Select relevant tags
              </Typography>
              <Grid container spacing={1}>
                {INTEREST_ARRAY.map((interest) => {
                  const isSelected = value?.includes(interest);
                  return (
                    <Grid key={interest}>
                      <Chip
                        label={interest}
                        onClick={() => {
                          if (isSelected) {
                            onChange(value?.filter((item) => item !== interest));
                          } else {
                            onChange([...(value ?? []), interest]);
                          }
                        }}
                        {...(value?.includes(interest) && {
                          onDelete: () => {
                            const newValue = value.filter((item) => item !== interest);
                            onChange(newValue);
                          },
                          deleteIcon: <CloseIcon />,
                        })}
                        sx={{
                          backgroundColor: value?.includes(interest)
                            ? "secondary.main"
                            : "grey.300",
                          color: value?.includes(interest) ? "text.primary" : "primary.main",
                          border: value?.includes(interest) ? "1px solid" : "none",
                          borderColor: value?.includes(interest)
                            ? "primary.main"
                            : "solid grey.300",
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
              {errors?.tags?.message && (
                <Typography color="error" variant="body2">
                  {errors.tags.message}
                </Typography>
              )}
            </FormControl>
          )}
        />
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

export default CreatePostForm;
