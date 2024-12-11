import { Button, Grid2 as Grid } from "@mui/material";
import { useContext, useState } from "react";
import { type CommentType, DataContext, UserContext } from "./CommentSection";
import IconButton from "./IconButton";
import ReplyButton from "./ReplyButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "./Dialog";

interface ActionButtonProps {
  comment: CommentType;
  handleReplyClick: () => void;
  handleEditClick: () => void;
}

const DeleteButton = ({ comment }: { comment: CommentType }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useContext(DataContext);

  const handleDelete = () => {
    if (comment.parentId) {
      setData((prev) => {
        const parent = prev.find((parent) => parent.id === comment.parentId);
        if (!parent) {
          return prev;
        }
        const replies = parent.replies ?? [];
        const index = replies.findIndex((reply) => reply.id === comment.id);
        if (index === -1) {
          return prev;
        }
        replies.splice(index, 1);
        return [...prev];
      });
    } else {
      setData((prev) => {
        const index = prev.findIndex((c) => c.id === comment.id);
        if (index === -1) {
          return prev;
        }
        prev.splice(index, 1);
        return [...prev];
      });
    }
    setOpen(false);
  };

  return (
    <Grid>
      <Button color="error" onClick={() => setOpen(true)}>
        <DeleteIcon />
      </Button>
      <Dialog openState={[open, setOpen]} handleDelete={handleDelete} />
    </Grid>
  );
};

export default function ActionButton({
  comment,
  handleReplyClick,
  handleEditClick,
}: ActionButtonProps) {
  const user = useContext(UserContext);
  const author = comment.user;
  const isAuthor = user.username === author.username;

  if (!isAuthor) {
    return <ReplyButton onClick={handleReplyClick} />;
  }

  return (
    <Grid container justifyContent="flex-end" spacing={1}>
      <DeleteButton comment={comment} />
      <Grid>
        <Button onClick={handleEditClick}>
          <EditIcon /> &nbsp;Edit
        </Button>
      </Grid>
    </Grid>
  );
}
