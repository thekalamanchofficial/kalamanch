import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { type UserNameProfileProps } from "~/app/(with-sidebar)/myfeed/types/types";

const UserNameProfile: React.FC<UserNameProfileProps> = ({
  ImageHeight = 50,
  ImageWidth = 50,
  NameFontSize = "17px",
  NameFontWeight = "bold",
  AuthorImage,
  AuthorName,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        alt="user profile picture"
        src={AuthorImage}
        sx={{ width: ImageWidth, height: ImageHeight }}
      />

      <Typography
        sx={{
          fontSize: NameFontSize,
          fontWeight: NameFontWeight,
          color: "text.primary",
          marginLeft: "8px",
        }}
      >
        {AuthorName}
      </Typography>
    </Box>
  );
};

export default UserNameProfile;
