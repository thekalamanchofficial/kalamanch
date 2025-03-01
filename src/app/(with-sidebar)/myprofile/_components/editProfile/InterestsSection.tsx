import { Controller, type Control, type FieldErrors } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  FormControl,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import Loader from "~/app/_components/loader/Loader";
import { type EditProfileDetails } from "../../types/types";

type InterestsSectionProps = {
  title: string;
  control: Control<EditProfileDetails>;
  name: "readingInterests" | "writingInterests";
  defaultValue: { genres: string[]; tags: string[] };
  errors: FieldErrors<EditProfileDetails>;
  genres: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
  isLoading: boolean;
};

const InterestsSection: React.FC<InterestsSectionProps> = ({
  title,
  control,
  name,
  defaultValue,
  errors,
  genres,
  tags,
  isLoading,
}) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ field: { value, onChange } }) => {
      const currentValue = value ?? defaultValue;
      return (
        <FormControl
          fullWidth
          sx={{
            mb: 2,
            backgroundColor: "#F8FAFC",
            paddingY: 2,
            paddingX: 1,
            borderRadius: 2,
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Genres</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {isLoading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Loader height={"20px"} width={"20px"} />
                  </Box>
                ) : (
                  genres.map((genre) => {
                    const isSelected = currentValue.genres.includes(genre.id);
                    return (
                      <Grid key={genre.id}>
                        <Chip
                          label={genre.name}
                          onClick={() => {
                            if (isSelected) {
                              onChange({
                                ...currentValue,
                                genres: currentValue.genres.filter((g: string) => g !== genre.id),
                              });
                            } else {
                              onChange({
                                ...currentValue,
                                genres: [...currentValue.genres, genre.id],
                              });
                            }
                          }}
                          color={isSelected ? "primary" : "default"}
                          variant={isSelected ? "filled" : "outlined"}
                          sx={{ m: 0.5 }}
                        />
                      </Grid>
                    );
                  })
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Tags</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {tags.map((tag) => {
                  const isSelected = currentValue.tags.includes(tag.id);
                  return (
                    <Grid key={tag.id}>
                      <Chip
                        label={tag.name}
                        onClick={() => {
                          if (isSelected) {
                            onChange({
                              ...currentValue,
                              tags: currentValue.tags.filter((t: string) => t !== tag.id),
                            });
                          } else {
                            onChange({
                              ...currentValue,
                              tags: [...currentValue.tags, tag.id],
                            });
                          }
                        }}
                        color={isSelected ? "primary" : "default"}
                        variant={isSelected ? "filled" : "outlined"}
                        sx={{ m: 0.5 }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </AccordionDetails>
          </Accordion>
          {errors?.[name]?.message && (
            <Typography color="error" variant="body2">
              {errors[name].message}
            </Typography>
          )}
        </FormControl>
      );
    }}
  />
);

export default InterestsSection;
