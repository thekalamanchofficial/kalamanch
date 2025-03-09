"use client";

import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <IconButton
      aria-label="Go back"
      onClick={handleBack}
      sx={{
        mr: 1,
        minHeight: 40,
        minWidth: 40,
        width: 40,
        height: 40,
        backgroundColor: "rgba(38, 14, 185, 0.1)",
        "&:hover": {
          backgroundColor: "rgba(38, 14, 185, 0.2)",
        },
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}
