import React from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  type Control,
  type UseFormReturn,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Chip, Grid2 as Grid, Typography } from "@mui/material";
import * as yup from "yup";
import Loader from "~/app/_components/loader/Loader";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";

export type OnboardingDataType = {
  writingGenres: string[];
  writingTags: string[];
  readingGenres: string[];
  readingTags: string[];
};

export const onboardingSchema = yup.object().shape({
  writingGenres: yup
    .array()
    .min(1, "Please select at least one genre for writing")
    .required("Writing genres are required"),
  writingTags: yup
    .array()
    .min(1, "Please select at least one tag for writing")
    .required("Writing tags are required"),
  readingGenres: yup
    .array()
    .min(1, "Please select at least one genre for reading")
    .required("Reading genres are required"),
  readingTags: yup
    .array()
    .min(1, "Please select at least one tag for reading")
    .required("Reading tags are required"),
});

export const useOnboardingForm = (): UseFormReturn<OnboardingDataType> =>
  useForm({
    mode: "onChange",
    resolver: yupResolver(onboardingSchema),
    defaultValues: {
      writingGenres: [],
      writingTags: [],
      readingGenres: [],
      readingTags: [],
    },
  });

const ProgressIndicator: React.FC<{ currentSection: "writing" | "reading" }> = ({
  currentSection,
}) => (
  <Box display="flex" gap={2} justifyContent="center" mb={4}>
    <Box
      sx={{
        width: "120px",
        height: "4px",
        borderRadius: "2px",
        backgroundColor: currentSection === "writing" ? "primary.main" : "primary.light",
        transition: "all 0.3s ease",
      }}
    />
    <Box
      sx={{
        width: "120px",
        height: "4px",
        borderRadius: "2px",
        backgroundColor: currentSection === "reading" ? "primary.main" : "primary.light",
        transition: "all 0.3s ease",
      }}
    />
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

const ErrorDot: React.FC<{ message: string }> = ({ message }) => (
  <Typography
    color="error"
    fontSize="12px"
    mt={0.5}
    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
  >
    <Box
      component="span"
      sx={{
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        backgroundColor: "error.main",
      }}
    />
    {message}
  </Typography>
);

const SectionHeader: React.FC<{
  label: string;
  selectedCount: number;
}> = ({ label, selectedCount }) => (
  <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
    <Typography
      variant="h6"
      fontSize="16px"
      lineHeight="20px"
      fontWeight="600"
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
);

const PreferenceSection: React.FC<{
  name: keyof OnboardingDataType;
  options: Array<{ id: string; name: string }>;
  control: Control<OnboardingDataType>;
  label: string;
  selectedCount: number;
}> = ({ name, options, control, label, selectedCount }) => {
  const {
    formState: { errors },
  } = useFormContext<OnboardingDataType>();
  const error = errors[name]?.message;

  return (
    <Box mb={{ xs: 2, sm: 3 }}>
      <SectionHeader label={label} selectedCount={selectedCount} />

      <Grid gap={{ xs: 0.5, sm: 1 }} display="flex" width="100%" flexWrap="wrap">
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value = [] } }) => (
            <>
              {options.map((option) => {
                const isSelected = Array.isArray(value) && value.includes(option.id);
                const handleToggle = () => {
                  const newValue = isSelected
                    ? value.filter((item: string) => item !== option.id)
                    : [...value, option.id];
                  onChange(newValue);
                };

                return (
                  <SelectableChip
                    key={option.id}
                    option={option}
                    isSelected={isSelected}
                    onToggle={handleToggle}
                  />
                );
              })}
            </>
          )}
        />
      </Grid>

      {error && <ErrorDot message={error} />}
    </Box>
  );
};

type OnboardingProps = {
  onSubmit: (data: OnboardingDataType) => void;
  genres: Array<{ id: string; name: string }>;
  tags: Array<{ id: string; name: string }>;
  isGenresLoading: boolean;
  isTagsLoading: boolean;
  isSubmitting: boolean;
};
export const Onboarding: React.FC<OnboardingProps> = ({
  onSubmit,
  genres,
  tags,
  isGenresLoading,
  isTagsLoading,
  isSubmitting,
}) => {
  const methods = useOnboardingForm();
  const { handleSubmit, watch } = methods;

  const formValues = watch();
  const [currentSection, setCurrentSection] = React.useState<"writing" | "reading">("writing");

  const writingGenresCount = formValues.writingGenres.length;
  const writingTagsCount = formValues.writingTags.length;
  const readingGenresCount = formValues.readingGenres.length;
  const readingTagsCount = formValues.readingTags.length;

  return (
    <Grid
      container
      sx={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(145deg, #f6f8fa 0%, #e9ecef 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Grid
        display="flex"
        width="100%"
        flexDirection="column"
        sx={{
          backgroundColor: "background.paper",
          maxWidth: "800px",
          height: { xs: "100vh", sm: "90vh" },
          width: "100%",
          borderRadius: { xs: 0, sm: 3 },
          boxShadow: { xs: "none", sm: "0px 8px 40px rgba(0, 0, 0, 0.12)" },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box p={{ xs: 2, sm: 3, md: 4 }} pb={{ xs: 1, sm: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "24px", sm: "28px", md: "32px" },
              lineHeight: { xs: "32px", sm: "36px", md: "40px" },
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              color: "primary.main",
            }}
          >
            {STATIC_TEXTS.INTEREST_FORM.FORM_HEADING}
          </Typography>
          <Typography
            textAlign="center"
            sx={{
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              lineHeight: { xs: "20px", sm: "22px", md: "24px" },
              color: "text.secondary",
              mb: 2,
            }}
          >
            {STATIC_TEXTS.INTEREST_FORM.FORM_DESCRIPTION}
          </Typography>
          <ProgressIndicator currentSection={currentSection} />
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            px: { xs: 2, sm: 3, md: 4 },
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#bdbdbd",
              borderRadius: "20px",
              border: "2px solid transparent",
              backgroundClip: "content-box",
              "&:hover": {
                backgroundColor: "#9e9e9e",
              },
            },
          }}
        >
          <FormProvider {...methods}>
            <Box
              sx={{
                backgroundColor: "grey.50",
                borderRadius: { xs: 1, sm: 2 },
                p: { xs: 2, sm: 3 },
                mb: { xs: 2, sm: 3 },
              }}
              onFocus={() => setCurrentSection("writing")}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "20px", sm: "22px", md: "24px" },
                  lineHeight: { xs: "28px", sm: "30px", md: "32px" },
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                What do you like to write about?
              </Typography>
              <Typography
                variant="body1"
                fontSize="15px"
                lineHeight="24px"
                color="text.secondary"
                mb={3}
              >
                Select genres and tags that best describe your writing interests
              </Typography>

              {isGenresLoading || isTagsLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <Loader height={"20px"} width={"20px"} />
                </Box>
              ) : (
                <>
                  <PreferenceSection
                    name="writingGenres"
                    options={genres}
                    control={methods.control}
                    label="Genres"
                    selectedCount={writingGenresCount}
                  />

                  <PreferenceSection
                    name="writingTags"
                    options={tags}
                    control={methods.control}
                    label="Tags"
                    selectedCount={writingTagsCount}
                  />
                </>
              )}
            </Box>

            <Box
              sx={{
                backgroundColor: "grey.50",
                borderRadius: { xs: 1, sm: 2 },
                p: { xs: 2, sm: 3 },
              }}
              onFocus={() => setCurrentSection("reading")}
            >
              <Typography variant="h2" fontSize="24px" lineHeight="32px" fontWeight="bold" mb={1}>
                What do you like to read about?
              </Typography>
              <Typography
                variant="body1"
                fontSize="15px"
                lineHeight="24px"
                color="text.secondary"
                mb={3}
              >
                Select genres and tags that match your reading preferences
              </Typography>

              {isGenresLoading || isTagsLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <Loader height={"20px"} width={"20px"} />
                </Box>
              ) : (
                <>
                  <PreferenceSection
                    name="readingGenres"
                    options={genres}
                    control={methods.control}
                    label="Genres"
                    selectedCount={readingGenresCount}
                  />

                  <PreferenceSection
                    name="readingTags"
                    options={tags}
                    control={methods.control}
                    label="Tags"
                    selectedCount={readingTagsCount}
                  />
                </>
              )}
            </Box>
          </FormProvider>
        </Box>

        <Box
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderTop: "1px solid",
            borderColor: "grey.100",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            mt: "auto",
          }}
        >
          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
            sx={{
              width: { xs: "100%", sm: "240px" },
              height: "48px",
              fontSize: { xs: "15px", sm: "16px" },
              fontWeight: "600",
              textTransform: "none",
              borderRadius: "24px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: { xs: "none", sm: "translateY(-2px)" },
                boxShadow: { xs: "none", sm: "0 6px 16px rgba(0, 0, 0, 0.2)" },
              },
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            {isSubmitting ? "Submitting..." : "Let's get started"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
