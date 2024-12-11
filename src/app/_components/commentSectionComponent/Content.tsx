import {
  Button,
  Grid2 as Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { type CommentType, DataContext } from "./CommentSection";

export default function Content({
  content,
  parentId,
  id,
  replyingTo,
  isEditing,
  setIsEditing,
}: Pick<CommentType, "content" | "parentId" | "id"> & {
  replyingTo?: string;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}) {
  const [comment, setComment] = useState(content);
  const [_, setData] = useContext(DataContext);
  const theme = useTheme();
  const primary = theme.palette.primary;

  if (isEditing) {
    const handleEdit = () => {
      if (parentId) {
        setData((prev) => {
          return prev.map((item) => {
            if (item.id === parentId) {
              return {
                ...item,
                replies: item.replies?.map((reply) => {
                  if (reply.id === id) {
                    return {
                      ...reply,
                      content: comment,
                    };
                  }
                  return reply;
                }),
              };
            }
            return item;
          });
        });
      } else {
        setData((prev) => {
          return prev.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                content: comment,
              };
            }
            return item;
          });
        });
      }
      setIsEditing(false);
    };

    return (
      <>
        <Grid>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a comment..."
            size="small"
            multiline
            value={replyingTo ? "@" + replyingTo + " " + comment : comment}
            onChange={(e) => {
              if (replyingTo && e.target.value.length < replyingTo.length + 2) {
                setComment("");
                return;
              }
              setComment(e.target.value.replace("@" + replyingTo + " ", ""));
            }}
          />
        </Grid>
        <Grid sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEdit}
            disabled={!comment}
          >
            Update
          </Button>
        </Grid>
      </>
    );
  }

  return (
    <Grid>
      <Typography variant="subtitle2" color="textSecondary">
        {replyingTo && (
          <span
            style={{
              color: primary.main,
              fontWeight: 700,
            }}
          >
            @{replyingTo}{" "}
          </span>
        )}
        {content}
      </Typography>
    </Grid>
  );
}
