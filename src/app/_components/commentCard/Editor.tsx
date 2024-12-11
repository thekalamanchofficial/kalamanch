import { useClerk } from "@clerk/nextjs";
import { Avatar, Button, Grid2 as Grid, Paper, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useTheme } from "@mui/material/styles";

export interface EditorProps {
  handleReply?: (reply: string) => void;
  replyingTo?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: () => void;
}

export default function Editor({ handleReply, replyingTo }: EditorProps) {
  const { user } = useClerk();
  const theme = useTheme();
  const [comment, setComment] = useState("");

  const handleAdd = () => {
    if (handleReply) {
      handleReply(comment);
    }

    setComment("");
  };

  const Picture = (
    <Avatar sx={{ width: 30, height: 30 }} src={user?.imageUrl} />
  );
  const Field = (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Add a comment..."
      size="small"
      multiline
      rows={3}
      value={comment}
      onChange={(e) => {
        setComment(e.target.value);
      }}
    />
  );
  const ActionButton = (
    <Button
      variant="contained"
      onClick={handleAdd}
      sx={{
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
          boxShadow: "none",
        },
        boxShadow: "none",
        minHeight: "auto",
        px: "1.2rem",
      }}
    >
      Send
    </Button>
  );

  return (
    <Grid
      sx={{
        width: "100%",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          padding: "1rem",
          boxShadow: "none",
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid size={1}>{Picture}</Grid>
          <Grid size={9}>{Field}</Grid>
          <Grid size={2}>{ActionButton}</Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
