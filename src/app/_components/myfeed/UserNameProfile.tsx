import { Box, Typography } from "@mui/material";
import Image from "next/image";
import userImage from "~/assets/images/user.jpeg";
import React from "react";

interface Props {
  ImageHeight?: number;
  ImageWidth?: number;
  NameFontSize?: number;
  NameFontWeight?: string;
}
const UserNameProfile: React.FC<Props> = ({
  ImageHeight = 50,
  ImageWidth = 50,
  NameFontSize = "17px",
  NameFontWeight = "bold",
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
        src={userImage}
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
        Steve Jobs
      </Typography>
    </Box>
  );
};

export default UserNameProfile;
