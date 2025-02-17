"use client";

import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import PublishPostFormButton from "~/app/_components/sidebar/PublishPostFormButton";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { type Iteration } from "~/app/editor/types/types";

export type PublishDialogProps = {
  iterations: Iteration[];
  onCancel?: () => void;
  open: boolean;
  title?: string;
  description?: string;
  postTitle?: string;
  draftPostId?: string;
};

const StyledRadio = styled(Radio)(({ theme: _ }) => ({
  // TODO: lint error
  "&.Mui-checked": {
    color: "primary.main",
  },
}));

export default function PublishDraftDialog({
  iterations,
  onCancel,
  open,
  title = STATIC_TEXTS.EDITOR_PAGE.PUBLISH_DRAFT,
  description = STATIC_TEXTS.EDITOR_PAGE.SELECT_ITERATION_DESCRIPTION,
  postTitle,
  draftPostId,
}: PublishDialogProps) {
  const [selectedIteration, setSelectedIteration] = useState<Iteration | null>(null);
  const [error] = useState<string | null>(null);

  return (
    <>
      <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}
          <FormControl component="fieldset" sx={{ mt: 2, width: "100%" }}>
            <RadioGroup
              value={selectedIteration?.id}
              onChange={(e) =>
                setSelectedIteration(
                  iterations.find((iteration) => iteration.id === e.target.value) ?? null,
                )
              }
            >
              {iterations.map((iteration) => (
                <FormControlLabel
                  key={iteration.id}
                  value={iteration.id}
                  control={<StyledRadio />}
                  label={
                    <Typography component="div">
                      <Typography variant="subtitle1">{iteration.iterationName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last modified: {new Date(iteration.updatedAt).toLocaleDateString()}
                      </Typography>
                    </Typography>
                  }
                  sx={{
                    border: `1px solid`,
                    borderRadius: 1,
                    width: "100%",
                    mb: 1,
                    p: 1,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{
              color: "primary.main",
              backgroundColor: "secondary.main",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
            onClick={onCancel}
          >
            {STATIC_TEXTS.EDITOR_PAGE.CANCEL}
          </Button>
          <PublishPostFormButton
            title={postTitle ?? ""}
            content={selectedIteration?.content ?? ""}
            draftPostId={draftPostId ?? ""}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}
