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
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "~/server/client";
import { toast } from "react-toastify";
import { TRPCClientError } from "@trpc/client";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .test("unique", "This email is already added", (value, context) => {
      if (!value) return true;
      const { options } = context;
      const emails = (options.context?.emails as string[]) ?? [];
      return !emails.includes(value);
    }),
});

export default function SharePostDialog({
  open,
  onClose,
  postId,
}: {
  open: boolean;
  onClose: () => void;
  postId: string;
}) {
  const [emails, setEmails] = React.useState<string[]>([]);
  const { user } = useClerk();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const sharePostProcedure = trpc.post.sharePost.useMutation({
    onSuccess: () => {
      setEmails([]);
      toast.success("Post shared successfully.");
      onClose();
    },
  });

  const { handleSubmit, control, reset, setError, clearErrors } = useForm({
    resolver: yupResolver(schema),
    context: { emails },
    defaultValues: { email: "" },
  });

  const handleAddEmail = (data: { email?: string }) => {
    const { email } = data;
    if (!email) return;
    if (emails.includes(email)) {
      setError("email", { message: "This email is already added" });
      return;
    }
    setEmails((prev) => [...prev, email]);
    clearErrors("email");
    reset();
  };

  const handleDeleteEmail = (emailToDelete: string) => {
    setEmails((prev) => prev.filter((email) => email !== emailToDelete));
  };

  const onSubmit = async () => {
    if (!userEmail) return;
    try {
      await sharePostProcedure.mutateAsync({ userEmail, postId, emails });
    } catch (error) {
      if (
        error instanceof TRPCClientError &&
        error.message.includes("Invalid Emails:")
      ) {
        toast.error(error.message);
      } else {
        toast.error("Failed to share post. the emails and try again.");
      }
    }
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
          with. Press &quot;Enter&quot; or &quot;,&quot; after typing an email
          address.
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
                  void handleSubmit(handleAddEmail)();
                }
              }}
              helperText={
                fieldState.error?.message ??
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
            width: "100px",
            px: "12px",
            backgroundColor: "primary.main",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ":disabled": {
              backgroundColor: "common.lightGray",
              color: "text.secondary",
            },
          }}
          disabled={emails.length === 0}
        >
          {sharePostProcedure.isPending ? (
            <CircularProgress size={20} thickness={2} sx={{ color: "white" }} />
          ) : (
            "Share Post"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
