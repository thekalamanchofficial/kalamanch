"use client";

import { Box, Typography } from "@mui/material";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import OwlSVG from "~/assets/svg/owl.svg";

export type LogoProps = {
  onClick: () => void;
};

const Logo = ({ onClick }: LogoProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <OwlSVG />
      <Typography
        variant="h5"
        fontWeight="bold"
        color="primary"
        sx={{ ml: 1, display: { xs: "none", sm: "block" } }}
      >
        {STATIC_TEXTS.APP_TITLE}
      </Typography>
    </Box>
  );
};

export default Logo;
