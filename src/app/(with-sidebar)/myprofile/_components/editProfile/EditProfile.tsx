import { type FieldErrors, FormProvider } from "react-hook-form";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import type { Genre, Tag } from "@prisma/client";
import { useEditProfileForm } from "~/app/(with-sidebar)/myprofile/_hooks/useEditProfileForm";
import { useGenresTags } from "~/app/editor/_hooks/useGenreTags";
import { type EditProfileDetails, type SaveUserInfo } from "../../types/types";
import { BioField } from "./fields/BioField";
import { BirthdateField } from "./fields/BirthdateField";
import { EducationField } from "./fields/EducationField";
import InterestsSection from "./fields/InterestsSection";
import { NameField } from "./fields/NameField";

export type EditProfileProps = {
  open: boolean;
  handleClose: () => void;
  profileData: EditProfileDetails;
  handleProfileSave: (data: SaveUserInfo) => Promise<void>;
};

interface FormFieldsProps {
  errors: FieldErrors<EditProfileDetails>;
  profileData: EditProfileDetails;
  genres: Genre[];
  tags: Tag[];
  isLoading: boolean;
}

const FormFields: React.FC<FormFieldsProps> = ({
  errors,
  profileData,
  genres,
  tags,
  isLoading,
}) => {
  return (
    <>
      <NameField defaultValue={profileData.name ?? ""} />
      <BioField errors={errors} defaultValue={profileData.bio ?? ""} />
      <BirthdateField
        errors={errors}
        defaultValue={profileData.birthdate ?? ""}
      />

      <InterestsSection
        title="Reading Interests"
        name="readingInterests"
        defaultValue={profileData.readingInterests ?? { genres: [], tags: [] }}
        isLoading={isLoading}
        errors={errors}
        genres={genres}
        tags={tags}
      />

      <InterestsSection
        title="Writing Interests"
        name="writingInterests"
        defaultValue={profileData.writingInterests ?? { genres: [], tags: [] }}
        isLoading={isLoading}
        errors={errors}
        genres={genres}
        tags={tags}
      />

      <EducationField
        errors={errors}
        defaultValue={profileData.education ?? []}
      />
    </>
  );
}

export const EditProfile: React.FC<EditProfileProps> = ({
  open,
  handleClose,
  profileData,
  handleProfileSave,
}) => {
  const { genres, tags, isGenresLoading, isTagsLoading } = useGenresTags();
  const methods = useEditProfileForm({ defaultValues: profileData });
  const { handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data: EditProfileDetails) => {
    await handleProfileSave({
      ...data,
      birthdate: new Date(data.birthdate),
    });
  };

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
      <DialogTitle>Edit Profile</DialogTitle>
      <FormProvider {...methods}>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            pb: 3,
            pt: 2,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "4px",
            },
          }}
        >
          <FormFields
            errors={errors}
            profileData={profileData}
            genres={genres ?? []}
            tags={tags ?? []}
            isLoading={isGenresLoading || isTagsLoading}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", padding: 3 }}>
          <Button variant="outlined" onClick={handleClose} sx={{ width: "100px" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            sx={{ width: "100px" }}
          >
            Save
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};
