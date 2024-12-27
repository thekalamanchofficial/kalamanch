import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  Grid2 as Grid,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { type CreatePostFormType } from "../../types/types";
import { Controller, useWatch } from "react-hook-form";
import { INTEREST_ARRAY } from "~/app/sign-up/_config/config";
import { useCreatePostForm } from "../../_hooks/useCreatePostForm";
import { useState } from "react";

export type CreatePostFormProps = {
  open: boolean;
  handleClose: () => void;
  createPostFormData: CreatePostFormType;
};

export const CreatePostForm: React.FC<CreatePostFormProps> = ({
  open,
  handleClose,
  createPostFormData,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useCreatePostForm({
    defaultValues: createPostFormData,
  });

  const postType = useWatch({ control, name: "postType" });
  const [actors, setActors] = useState("");

  const TARGET_AUDIENCE_OPTIONS = [
    "Kids",
    "Teens",
    "Adults",
    "Elderly",
    "Educators",
    "Researchers",
  ];

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
              <Typography variant="h6" gutterBottom>
                Select Target Audience
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {TARGET_AUDIENCE_OPTIONS.map((option) => {
                  const isSelected = value?.includes(option);

                  return (
                    <Chip
                      key={option}
                      label={option}
                      onClick={() => {
                        if (isSelected) {
                          onChange(value.filter((item) => item !== option));
                        } else {
                          onChange([...(value ?? []), option]);
                        }
                      }}
                      color={isSelected ? "primary" : "default"}
                      variant={isSelected ? "filled" : "outlined"}
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

        {/* <Controller
          control={control}
          name="thumbnailUrl"
          defaultValue={createPostFormData.thumbnailUrl}
          render={({ field: { onChange } }) => (
            <FormControl fullWidth>
              <Typography variant="h6" gutterBottom>
                Upload Thumbnail
              </Typography>
              <TextField
                type="file"
                onChange={(e) =>
                  onChange((e.target as HTMLInputElement).files?.[0] ?? null)
                }
                id="thumbnail"
                helperText={errors?.thumbnailUrl?.message}
                error={!!errors?.thumbnailUrl?.message}
                variant="outlined"
                fullWidth
                sx={{ mb: 4, mt: 1 }}
              />
            </FormControl>
          )}
        /> */}
        <Controller
          control={control}
          name="thumbnailUrl"
          defaultValue={createPostFormData.thumbnailUrl ?? null}
          render={({ field: { onChange } }) => (
            <FormControl fullWidth>
              <Typography variant="h6" gutterBottom>
                Upload Thumbnail
              </Typography>
              <TextField
                type="file"
                onChange={(e) =>
                  onChange((e.target as HTMLInputElement).files?.[0] ?? null)
                }
                id="thumbnail"
                helperText={errors?.thumbnailUrl?.message}
                error={!!errors?.thumbnailUrl?.message}
                variant="outlined"
                fullWidth
                sx={{ mb: 4, mt: 1 }}
              />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="postType"
          defaultValue={createPostFormData.postType ?? ""} // Ensure it matches the Select value
          render={({ field: { value, onChange } }) => (
            <FormControl fullWidth error={!!errors?.postType?.message}>
              <InputLabel id="postType-label">Post Type</InputLabel>
              <Select
                labelId="postType-label"
                value={value}
                onChange={onChange}
                id="postType"
                label="Post Type"
                variant="outlined"
                sx={{ mb: 2 }}
              >
                <MenuItem value="blog">Blog</MenuItem>
                <MenuItem value="article">Article</MenuItem>
                <MenuItem value="announcement">Announcement</MenuItem>
                <MenuItem value="news">News</MenuItem>
                <MenuItem value="script">Script</MenuItem>
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
              const handleAddActors = (
                e: React.KeyboardEvent<HTMLInputElement>,
              ) => {
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
                  <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
                    Actors
                  </Typography>
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
              <Typography variant="h6" gutterBottom>
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
                            onChange(
                              value?.filter((item) => item !== interest),
                            );
                          } else {
                            onChange([...(value ?? []), interest]);
                          }
                        }}
                        color={isSelected ? "primary" : "default"}
                        variant={isSelected ? "filled" : "outlined"}
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
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{ width: "100px" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit((data) => console.log(data))}
          sx={{ width: "100px" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostForm;
