"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button, Grid2 as Grid, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Footer } from "../_components/footer/Footer";
import { trpc } from "../_trpc/client";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});

const Page = () => {
  const [submissionStatus, setSubmissionStatus] = useState<string>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const contactUsProcedure = trpc.contactUsRouter.contactUs.useMutation({
    onSuccess: () => {
      setSubmissionStatus("success");
      reset({
        name: "",
        email: "",
        message: "",
      });
    },
  });

  const onSubmit = async (data: { name: string; email: string; message: string }) => {
    if (!data.name || !data.email || !data.message) return;
    try {
      await contactUsProcedure.mutateAsync(data);
    } catch (error) {
      setSubmissionStatus("error");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        justifyItems: "center",
        alignItems: "center",
        height: `calc(100vh - 77px)`,
        backgroundImage: (theme) =>
          `linear-gradient(to top left, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100%"
        size={{ xs: 12, sm: 8, md: 6, lg: 4 }}
      >
        <Grid size={12} padding={3} sx={{ backgroundColor: "#FFF" }}>
          <Typography variant="h4" textAlign="center" mb={3}>
            Contact Us
          </Typography>
          {submissionStatus === "success" && (
            <Alert severity="success">Message sent successfully!</Alert>
          )}
          {submissionStatus === "error" && (
            <Alert severity="error">Failed to send message. Please try again.</Alert>
          )}
          <Grid spacing={2} alignItems="center" size={12}>
            <Grid>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Name"
                    {...field}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Email"
                    {...field}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="normal"
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Message"
                    {...field}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    margin="normal"
                    multiline
                    rows={4}
                  />
                )}
              />
            </Grid>
            <Grid size={12}>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                color="primary"
                fullWidth
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Page;
