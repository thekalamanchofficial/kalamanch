import React from "react";
import { useSignUpInterestForm } from "~/app/sign-up/_hooks/useSignUpForm";
import { Controller } from "react-hook-form";
import {
  type FormDataPartial,
  type FormDataInterest,
} from "~/app/sign-up/_types/types";
import { INTEREST_ARRAY } from "~/app/sign-up/_config/config";
import { STATIC_TEXTS } from "../static/staticText";
import { Button, Chip, Grid2 as Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type InterestsFormProps = {
  onNext: (data: FormDataInterest) => Promise<void>;
  onPrev: () => void;
  data: FormDataPartial;
};

const Interests: React.FC<InterestsFormProps> = ({
  onNext,
  onPrev,
  data: interestData,
}) => {
  const {
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useSignUpInterestForm();

  const handleNext = async (data: FormDataInterest) => {
    const isValid = await trigger();
    if (isValid) {
      await onNext(data);
    }
  };

  return (
    <Grid container width="100%">
      <Grid display="flex" width="100%" flexDirection="column" mb={3}>
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
            defaultValue={
              interestData && "interests" in interestData
                ? interestData.interests
                : []
            }
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
        <Grid justifyContent="space-between" display="flex" width="100%" mt={2}>
          <Button
            type="button"
            onClick={onPrev}
            variant="contained"
            size="large"
            sx={{ width: "150px" }}
          >
            <Typography variant="h6">{STATIC_TEXTS.NAVIGATION.BACK}</Typography>
          </Button>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{ width: "150px" }}
            onClick={handleSubmit(handleNext)}
          >
            <Typography variant="h6">{STATIC_TEXTS.NAVIGATION.NEXT}</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Interests;
