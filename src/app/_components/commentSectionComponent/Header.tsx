import { Avatar, Grid2 as Grid, Typography } from "@mui/material";
import { type CommentType, UserContext } from "./CommentSection";
import { useContext } from "react";
// import theme from "../styles/theme";

export default function Header({
  createdAt,
  user,
}: Pick<CommentType, "createdAt" | "user">) {
  const currentUser = useContext(UserContext);
  const { username, image } = user;
  const isCurrentUser = currentUser.username === username;

  return (
    <Grid>
      <div
        style={{
          display: "flex",
          gap: "7px",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ width: 30, height: 30 }} src={image.webp} />
        <Typography variant="subtitle2" fontWeight="700">
          {username}
        </Typography>
        {isCurrentUser && (
          <div
            style={{
              color: "#fff",
              padding: "1px 5px",
              borderRadius: "2px",
              display: "flex",
              alignItems: "center",
              fontSize: "0.6rem",
              marginRight: "5px",
            }}
          >
            you
          </div>
        )}
        <Typography variant="subtitle2" color="textSecondary">
          {createdAt}
        </Typography>
      </div>
    </Grid>
  );
}
