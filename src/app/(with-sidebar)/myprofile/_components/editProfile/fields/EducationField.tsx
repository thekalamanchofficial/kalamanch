import { useState } from "react";
import { Controller, type FieldErrors, useFormContext } from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, FormControl, IconButton, Paper, TextField, Typography } from "@mui/material";
import { type EditProfileDetails } from "../../../types/types";

interface EducationFieldProps {
  errors: FieldErrors<EditProfileDetails>;
  defaultValue: string[];
}

export const EducationField: React.FC<EducationFieldProps> = ({ 
  errors, 
  defaultValue 
}) => {
  const [education, setEducation] = useState("");
  const { control } = useFormContext<EditProfileDetails>();

  return (
    <Controller
      control={control}
      name="education"
      defaultValue={defaultValue}
      render={({ field: { value = [], onChange } }) => {
        const handleAddEducation = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && education.trim()) {
            const updatedEducation = [...value, education.trim()];
            onChange(updatedEducation);
            setEducation("");
          }
        };

        const handleRemoveEducation = (index: number) => {
          const updatedEducation = value.filter((_, i) => i !== index);
          onChange(updatedEducation);
        };

        return (
          <FormControl fullWidth>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h6">Education</Typography>
              <TextField
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                onKeyDown={handleAddEducation}
                id="education"
                label="Add Education"
                placeholder="Enter your education and press Enter"
                helperText={errors?.education?.message}
                error={!!errors?.education?.message}
                variant="outlined"
                fullWidth
              />
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1 
                }}
              >
                {value.map((edu, index) => (
                  <Paper
                    key={index}
                    elevation={3}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 2,
                      borderRadius: 2,
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Typography variant="body1">{edu}</Typography>
                    <IconButton onClick={() => handleRemoveEducation(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </Box>
          </FormControl>
        );
      }}
    />
  );
}; 