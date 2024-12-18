import { useClerk } from "@clerk/nextjs";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { type FollowButtonProps } from "~/app/(with-sidebar)/myfeed/types/types";
import { handleError } from "~/app/_utils/handleError";
import { trpc } from "~/server/client";

const FollowButton: React.FC<FollowButtonProps> = ({
  authorProfileLink,
  style,
  isFollowing = false,
}) => {
  const { user } = useClerk();

  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

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

        setIsFollowingState(res?.message !== "Unfollowed");
      } catch (error) {
        handleError(error);
        throw error;
      }
    }
  };

  return (
    <Button
      sx={{
        backgroundColor: isFollowingState ? "primary.main" : "secondary.main",
        color: isFollowingState ? "white" : "font.primary",
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
      {isFollowingState ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
