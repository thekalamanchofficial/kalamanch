import React, { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { Button } from "@mui/material";
import { handleError } from "~/app/_utils/handleError";
import { type FollowButtonProps } from "~/app/(with-sidebar)/myfeed/types/types";
import { trpc } from "~/server/client";

const FollowButton: React.FC<FollowButtonProps> = ({
  authorProfileLink,
  style,
  isFollowing = false,
}) => {
  const { user } = useClerk();
  const utils = trpc.useUtils();

  const [isFollowingState, setIsFollowingState] = useState(isFollowing);

  const userMutation = trpc.user;
  const followUser = userMutation.followUser.useMutation({
    onSuccess: async () => {
      await utils.user.getUserDetails.invalidate();

      if (user?.primaryEmailAddress?.emailAddress) {
        await utils.user.getUserDetails.invalidate(user.primaryEmailAddress.emailAddress);
        await utils.user.getUserDetailsById.invalidate(user.primaryEmailAddress.emailAddress);
      }

      if (authorProfileLink) {
        await utils.user.getUserDetailsById.invalidate(authorProfileLink);
      }
    },
  });

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
