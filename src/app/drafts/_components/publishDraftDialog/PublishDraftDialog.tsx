"use client";

import React, { useState } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/Publish";
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
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import { type Iteration } from "~/app/editor/types/types";

export type PublishDialogProps = {
  iterations: Iteration[];
  onPublish: (iterationId: string) => Promise<void>;
  onCancel?: () => void;
  open: boolean;
  title?: string;
  description?: string;
};

const StyledRadio = styled(Radio)(({ theme }) => ({
  // TODO: lint error
  "&.Mui-checked": {
    color: "primary.main",
  },
}));

export default function PublishDraftDialog({
  iterations,
  onPublish,
  onCancel,
  open,
  title = STATIC_TEXTS.EDITOR_PAGE.PUBLISH_DRAFT,
  description = STATIC_TEXTS.EDITOR_PAGE.SELECT_ITERATION_DESCRIPTION,
}: PublishDialogProps) {
  const [selectedIteration, setSelectedIteration] = useState<string>("");
  const [error] = useState<string | null>(null);

  const handleOnPublish = async (selectedIteration: string) => {
    await onPublish(selectedIteration);
  };

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
              value={selectedIteration}
              onChange={(e) => setSelectedIteration(e.target.value)}
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
            onClick={async () => {
              await handleOnPublish(selectedIteration);
            }}
            disabled={!selectedIteration}
            startIcon={<DescriptionOutlinedIcon />}
          >
            {STATIC_TEXTS.EDITOR_PAGE.PUBLISH}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
