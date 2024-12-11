import {
  Dialog as BasicDialog,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2 as Grid,
} from "@mui/material";

interface DialogProps {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  handleDelete: () => void;
}

export default function Dialog({ openState, handleDelete }: DialogProps) {
  const [open, setOpen] = openState;
  const handleClose = () => setOpen(false);

  return (
    <BasicDialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "350px",
          borderRadius: "5px",
          paddingTop: "8px",
          paddingBottom: "8px",
        },
      }}
    >
      <DialogTitle>
        <strong>Delete comment</strong>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: "16px" }}>
          Are you sure you want to delete this comment? This will remove the
          comment
        </DialogContentText>
        <Grid container spacing={2} sx={{ marginTop: "10px" }}>
          <Grid>
            <Button
              onClick={handleClose}
              fullWidth
              variant="contained"
              color="secondary"
              size="small"
              sx={{
                padding: "10px 0",
                boxShadow: "none",
                fontWeight: "700",
              }}
            >
              No, cancel
            </Button>
          </Grid>
          <Grid>
            <Button
              onClick={handleDelete}
              color="error"
              fullWidth
              size="small"
              variant="contained"
              sx={{
                padding: "10px 0",
                boxShadow: "none",
                fontWeight: "700",
              }}
            >
              Yes, delete
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </BasicDialog>
  );
}
