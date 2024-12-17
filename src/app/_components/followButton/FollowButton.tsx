import { useClerk } from "@clerk/nextjs";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { type FollowButtonProps } from "~/app/(with-sidebar)/myfeed/types/types";
import { handleError } from "~/app/_utils/handleError";
import { trpc } from "~/server/client";

const FollowButton: React.FC<FollowButtonProps> = ({
  authorProfileLink,
  style,
  followState = "Follow",
}) => {
  const { user } = useClerk();

  const [title, setTitle] = useState(followState);
  const userMutation = trpc.user;
  const followUser = userMutation.followUser.useMutation();

  const followWriter = async () => {
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (userEmail) {
      try {
        const res = await followUser.mutateAsync({
          currentUserEmail: userEmail,
          followerId: authorProfileLink,
        });

        setTitle(res?.message === "Unfollowed" ? "Follow" : "Following");
      } catch (error) {
        handleError(error);
        throw error;
      }
    }
  };

  return (
    <Button
      sx={{
        backgroundColor:
          title === "Following" ? "primary.main" : "secondary.main",
        color: title === "Following" ? "white" : "font.primary",
        minHeight: "auto",
        height: "25px",
        margin: "3px 5px ",
        fontSize: "15px",
        ...style,
      }}
      onClick={async () => {
        await followWriter();
      }}
    >
      {title}
    </Button>
  );
};

export default FollowButton;
