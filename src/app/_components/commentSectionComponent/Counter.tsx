import { type CommentType, DataContext } from "./CommentSection";

import AddIcon from "@mui/icons-material/Add";
import MinusIcon from "/images/icon-minus.svg";
import { useContext } from "react";
import { useMediaQuery } from "@mui/material";
import styles from "./Counter.module.css";
import IconButton from "./IconButton";

export default function Counter({
  id,
  parentId,
}: Pick<CommentType, "id"> & { parentId?: number }) {
  const [data, setData] = useContext(DataContext);
  const mainComment = data.find((comment) => comment.id === (parentId ?? id));
  const comment = parentId
    ? mainComment?.replies?.find((comment) => comment.id === id)
    : mainComment;

  const matches = useMediaQuery("(min-width:600px)");

  if (!comment) {
    return null;
  }

  const handleChange = (direction: -1 | 1) => () => {
    const newData = data.map((comment) => {
      if (comment.id === (parentId ?? id)) {
        return {
          ...comment,
          score: comment.score + (parentId ? 0 : direction),
          replies: comment.replies?.map((reply) => {
            if (reply.id === id) {
              return {
                ...reply,
                score: reply.score + direction,
              };
            }
            return reply;
          }),
        };
      }
      return comment;
    });
    setData(newData);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: matches ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "5px",
        backgroundColor: "hsla(239, 57%, 85%, 0.2)",
        userSelect: "none",
        borderRadius: "10px",
        padding: "0 10px",
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleChange(1)}
      >
        <IconButton icon={<AddIcon />}></IconButton>
      </div>
      <div
        style={{
          color: "hsl(238, 40%, 52%)",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {comment.score}
      </div>
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleChange(-1)}
      >
        <IconButton icon={<AddIcon />}></IconButton>
      </div>
    </div>
  );
}
