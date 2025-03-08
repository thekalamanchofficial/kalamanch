"use client";

import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import WriteLogo from "~/assets/svg/WriteLogo.svg";
import { STATIC_TEXTS } from "../static/staticText";

const CreatePostFormButton = () => {
  const router = useRouter();
  const handleCreatePostForm = () => {
    const url = new URL("/editor", window.location.origin);
    url.searchParams.set("draftPost", "true");
    router.push(url.toString());
  };
  return (
    <Box
      sx={{
        marginTop: 2,
        px: "8px",
      }}
    >
      <Button
        startIcon={<WriteLogo />}
        variant="contained"
        size="small"
        fullWidth
        sx={{
          display: "flex",
          height: "40px",
          backgroundColor: "primary.main",
          justifyContent: "center",
          alignItems: "center",
          px: "12px",
        }}
        onClick={handleCreatePostForm}
      >
        <Typography
          variant="h6"
          color="#fff"
          style={{
            fontSize: "16px",
          }}
        >
          {STATIC_TEXTS.USER_FEED.BUTTONS.WRITE}
        </Typography>
      </Button>
    </Box>
  );
};

export default CreatePostFormButton;
