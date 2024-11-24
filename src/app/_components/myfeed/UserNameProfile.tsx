import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface UserNameProfileProps {
  ImageHeight?: number;
  ImageWidth?: number;
  NameFontSize?: number;
  NameFontWeight?: string;
  AuthorName?: string;
  AuthorProfileLink?: string;
  AuthorImage?: string;
}
const UserNameProfile: React.FC<UserNameProfileProps> = ({
  ImageHeight = 50,
  ImageWidth = 50,
  NameFontSize = "17px",
  NameFontWeight = "bold",
  AuthorImage = "https://picsum.photos/200",
  AuthorName = "Joe",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        alt="profile picture "
        src={AuthorImage}
        width={ImageWidth}
        height={ImageHeight}
        style={{
          borderRadius: "100%",
        }}
      ></Image>
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
