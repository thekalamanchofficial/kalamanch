import { Button } from "@mui/material";
import React from "react";
import { type FollowButtonProps } from "~/app/(with-sidebar)/myfeed/types/types";

const FollowButton: React.FC<FollowButtonProps> = ({
  authorProfileLink,
  yPadding = "3px",
  xPadding = "4px",
}) => {
  const followWriter = (authorProfileLink: string) => {
    console.log(`followed writer ${authorProfileLink} `);
  };

  return (
    <Button
      sx={{
        backgroundColor: "secondary.main",
        color: "primary.main",
        minHeight: "auto",
        height: "20px",
        paddingY: yPadding,
        paddingX: xPadding,
        margin: "3px 5px ",
        fontSize: "15px",
      }}
      onClick={() => {
        followWriter(authorProfileLink);
      }}
    >
      Follow
    </Button>
  );
};

export default FollowButton;
