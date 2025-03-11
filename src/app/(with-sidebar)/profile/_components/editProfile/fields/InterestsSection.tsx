import { Controller, useFormContext, type FieldErrors } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import Loader from "~/app/_components/loader/Loader";
import { type EditProfileDetails } from "../../../types/types";

type InterestsSectionProps = {
  title: string;
  name: "readingInterests" | "writingInterests";
  defaultValue: { genres: string[]; tags: string[] };
  errors: FieldErrors<EditProfileDetails>;
  genres: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
  isLoading: boolean;
};

const SectionHeader: React.FC<{
  label: string;
  selectedCount: number;
  error?: string;
}> = ({ label, selectedCount, error }) => (
  <Box>
    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1} gap={1}>
      <Typography
        variant="h6"
        fontSize="16px"
        lineHeight="20px"
        fontWeight="500"
        display="flex"
        alignItems="center"
        gap={1}
      >
        {label}
        <Typography component="span" fontSize="13px" color="text.secondary">
          (at least 1)
        </Typography>
      </Typography>
      <Typography fontSize="14px" color="text.secondary">
        {selectedCount} selected
      </Typography>
    </Box>
    {error && (
      <Typography
        color="error"
        fontSize="12px"
        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
      >
        {error}
      </Typography>
    )}
  </Box>
);

const SelectableChip: React.FC<{
  option: { id: string; name: string };
  isSelected: boolean;
  onToggle: () => void;
}> = ({ option, isSelected, onToggle }) => (
  <Chip
    label={option.name}
    clickable
    onClick={onToggle}
    {...(isSelected && {
      onDelete: onToggle,
      deleteIcon: <CloseIcon fontSize="small" />,
    })}
    sx={{
      height: "32px",
      fontSize: "14px",
      backgroundColor: "background.paper",
      color: "text.primary",
      border: "1px solid",
      borderColor: isSelected ? "primary.main" : "grey.200",
      transition: "all 0.2s ease",
      py: 1.5,
      px: 2,
      "&:hover": {
        backgroundColor: "grey.50",
      },
    }}
  />
);

const InterestsSection: React.FC<InterestsSectionProps> = ({
  title,
  name,
  defaultValue,
  isLoading,
  errors,
  genres,
  tags,
}) => {
  const { control } = useFormContext<EditProfileDetails>();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: "grey.50",
        padding: 1,
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" fontWeight="500">
        {title}
      </Typography>
      <Typography variant="body1" fontSize="15px" lineHeight="24px" color="text.secondary">
        Select genres and tags that best describe your{" "}
        {name === "readingInterests" ? "reading" : "writing"} interests
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Loader height={"20px"} width={"20px"} />
        </Box>
      ) : (
        <>
          <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field: { value, onChange } }) => {
              const currentValue = value ?? defaultValue;
              const genresError = errors?.[name]?.genres?.message;
              const tagsError = errors?.[name]?.tags?.message;

              return (
                <>
                  <Accordion
                    defaultExpanded
                    sx={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      "&:before": {
                        display: "none",
                      },
                      "&.Mui-expanded": {
                        margin: 0,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        padding: 0,
                        minHeight: "48px",
                        "&.Mui-expanded": {
                          minHeight: "48px",
                        },
                        "& .MuiAccordionSummary-content": {
                          margin: 0,
                          "&.Mui-expanded": {
                            margin: 0,
                          },
                        },
                      }}
                    >
                      <SectionHeader
                        label="Genres"
                        selectedCount={currentValue.genres.length}
                        error={genresError}
                      />
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0, pt: 1 }}>
                      <Grid gap={1} display="flex" width="100%" flexWrap="wrap">
                        {genres.map((genre) => {
                          const isSelected = currentValue.genres.includes(genre.id);
                          return (
                            <SelectableChip
                              key={genre.id}
                              option={genre}
                              isSelected={isSelected}
                              onToggle={() => {
                                if (isSelected) {
                                  onChange({
                                    ...currentValue,
                                    genres: currentValue.genres.filter(
                                      (g: string) => g !== genre.id,
                                    ),
                                  });
                                } else {
                                  onChange({
                                    ...currentValue,
                                    genres: [...currentValue.genres, genre.id],
                                  });
                                }
                              }}
                            />
                          );
                        })}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    defaultExpanded
                    sx={{
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      "&:before": {
                        display: "none",
                      },
                      "&.Mui-expanded": {
                        margin: 0,
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        padding: 0,
                        minHeight: "48px",
                        "&.Mui-expanded": {
                          minHeight: "48px",
                        },
                        "& .MuiAccordionSummary-content": {
                          margin: 0,
                          "&.Mui-expanded": {
                            margin: 0,
                          },
                        },
                      }}
                    >
                      <SectionHeader
                        label="Tags"
                        selectedCount={currentValue.tags.length}
                        error={tagsError}
                      />
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0, pt: 1 }}>
                      <Grid gap={1} display="flex" width="100%" flexWrap="wrap">
                        {tags.map((tag) => {
                          const isSelected = currentValue.tags.includes(tag.id);
                          return (
                            <SelectableChip
                              key={tag.id}
                              option={tag}
                              isSelected={isSelected}
                              onToggle={() => {
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
                            />
                          );
                        })}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </>
              );
            }}
          />
        </>
      )}
    </Box>
  );
};

export default InterestsSection;
