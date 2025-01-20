"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IconButton, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .test("unique", "This email is already added", (value, context) => {
      const { options } = context;
      const emails = options.context?.emails || [];
      return !emails.includes(value);
    }),
});

export default function SharePostDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [emails, setEmails] = React.useState<string[]>([]);

  const { handleSubmit, control, reset, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
    context: { emails },
    defaultValues: { email: "" },
  });

  const handleAddEmail = (data: { email: string }) => {
    if (emails.includes(data.email)) {
      setError("email", { message: "This email is already added" });
      return;
    }
    setEmails((prev) => [...prev, data.email]);
    clearErrors("email");
    reset();
  };

  const handleDeleteEmail = (emailToDelete: string) => {
    setEmails((prev) => prev.filter((email) => email !== emailToDelete));
  };

  const onSubmit = () => {
    console.log("Sharing post with:", emails);
    onClose();
  };

  const handleCancel = () => {
    setEmails([]);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <DialogTitle>Share Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the email addresses of the people you want to share this post
          with. Press "Enter" or "," after typing an email address.
        </DialogContentText>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            marginTop: 2,
            marginBottom: 2,
            maxHeight: 100,
            overflowY: "auto",
            padding: 1,
            borderRadius: "4px",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "4px",
            },
          }}
        >
          {emails.map((email, index) => (
            <Chip
              key={index}
              label={email}
              onDelete={() => handleDeleteEmail(email)}
              color="primary"
            />
          ))}
        </Box>

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              autoFocus
              fullWidth
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              variant="outlined"
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === ",") {
                  event.preventDefault();
                  handleSubmit(handleAddEmail)();
                }
              }}
              helperText={
                fieldState.error?.message ||
                "Press 'Enter' or ',' to add an email"
              }
              error={!!fieldState.error}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        size="large"
                        onClick={() => handleSubmit(handleAddEmail)()}
                        sx={{
                          color: "primary.main",
                          ":hover": { background: "none" },
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            height: "40px",
            px: "12px",
            color: "primary.main",
            backgroundColor: "secondary.main",
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          sx={{
            height: "40px",
            px: "12px",
            backgroundColor: "primary.main",
            color: "white",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            ":disabled": {
              backgroundColor: "common.lightGray",
              color: "text.secondary",
            },
          }}
          disabled={emails.length === 0}
        >
          Share Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}
