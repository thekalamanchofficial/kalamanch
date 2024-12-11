import { Box, Grid2 as Grid } from "@mui/material";
import { createContext, useState } from "react";
import defaultData from "./data.json";
import Comment from "./Comment";
import Editor from "../commentCard/Editor";

export interface User {
  username: string;
  image: {
    webp: string;
  };
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies?: CommentType[];
  replyingTo?: string;
  parentId?: number;
}
export type DataState = [
  CommentType[],
  React.Dispatch<React.SetStateAction<CommentType[]>>,
];
export const DataContext = createContext<DataState>([
  defaultData.comments,
  console.error,
]);

export const UserContext = createContext<User>(defaultData.currentUser);

const sortByScore = (a: CommentType, b: CommentType) => b.score - a.score;

export default function CommentSection() {
  const [data, setData] = useState<CommentType[]>(defaultData.comments);

  const comments: CommentType[] = [...data].sort(sortByScore);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <UserContext.Provider value={defaultData.currentUser}>
        <DataContext.Provider value={[data, setData]}>
          <Grid
            spacing={2}
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "10px",
              maxHeight: "600px",
              overflowY: "scroll",
              textWrap: "wrap",
              scrollbarWidth: "none",
            }}
            gap={2}
          >
            {comments.map((comment, index) => (
              <Grid key={comment.id}>
                <div
                  style={{
                    zIndex: comments.length - index,
                  }}
                >
                  <Comment {...comment} />
                </div>
              </Grid>
            ))}
            <Grid
              sx={{
                marginTop: "8px",
              }}
            >
              <Editor />
            </Grid>
          </Grid>
        </DataContext.Provider>
      </UserContext.Provider>
    </Box>
  );
}
