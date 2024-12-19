import { Grid2 as Grid, Typography, Chip, Button } from "@mui/material";
import { Controller, useForm, type UseFormReturn } from "react-hook-form";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { INTEREST_ARRAY } from "~/app/sign-up/_config/config";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";

export type OnboardingDataType = {
  interests: string[];
};
export const onboardingSchema = yup.object().shape({
  interests: yup
    .array()
    .min(1, "Please select at least one interest")
    .required("Interests are required"),
});

export const useOnboardingForm = (): UseFormReturn<OnboardingDataType> =>
  useForm({
    mode: "onChange",
    resolver: yupResolver(onboardingSchema),
  });

export const Onboarding: React.FC<{
  onSubmit: (data: OnboardingDataType) => void;
}> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useOnboardingForm();

  return (
    <Grid
      container
      sx={{
        width: "100%",
        backgroundColor: "secondary.main",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        display="flex"
        width="100%"
        flexDirection="column"
        mb={3}
        sx={{
          backgroundColor: "#fff",
          maxWidth: "824px",
          px: 6,
          py: 4,
          width: "100%",
          height: "max-content",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h1"
          fontSize="28px"
          lineHeight="21px"
          fontWeight="bold"
        >
          {STATIC_TEXTS.INTEREST_FORM.FORM_HEADING}
        </Typography>
        <Typography
          variant="h5"
          fontSize="20px"
          lineHeight="22px"
          fontWeight="medium"
          color="text.secondary"
          mt={2}
        >
          {STATIC_TEXTS.INTEREST_FORM.FORM_DESCRIPTION}
        </Typography>
        <Grid mb={25} mt={4} display="flex" width="100%" flexDirection="column">
          <Controller
            name="interests"
            control={control}
            defaultValue={[]}
            render={({ field: { onChange, value } }) => (
              <Grid gap={2} display="flex" width="100%" flexWrap="wrap">
                {INTEREST_ARRAY.map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    clickable
                    onClick={() => {
                      const newValue = value.includes(interest)
                        ? value.filter((item) => item !== interest)
                        : [...value, interest];
                      onChange(newValue);
                    }}
                    {...(value.includes(interest) && {
                      onDelete: () => {
                        const newValue = value.filter(
                          (item) => item !== interest,
                        );
                        onChange(newValue);
                      },
                      deleteIcon: <CloseIcon />,
                    })}
                    sx={{
                      backgroundColor: value.includes(interest)
                        ? "secondary.main"
                        : "grey.300",
                      color: value.includes(interest)
                        ? "text.primary"
                        : "primary.main",
                      border: value.includes(interest) ? "1px solid" : "none",
                      borderColor: value.includes(interest)
                        ? "primary.main"
                        : "solid grey.300",
                    }}
                  />
                ))}
              </Grid>
            )}
          />
          <Typography color="error" fontSize="12px" mt={1}>
            {errors?.interests?.message}
          </Typography>
        </Grid>
        <Grid justifyContent="center" display="flex" width="100%" mt={2}>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{ width: "150px" }}
            onClick={handleSubmit(onSubmit)}
          >
            <Typography variant="h6">{`Let's go`}</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
