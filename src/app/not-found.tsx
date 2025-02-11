"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  keyframes,
  Typography,
  useTheme,
} from "@mui/material";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export default function NotFound() {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Container component="main" maxWidth="lg" sx={{ px: { xs: 0, sm: 3 } }}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          p: { xs: 2, sm: 3 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: { xs: -50, sm: -100 },
            left: { xs: -50, sm: -100 },
            width: { xs: 150, sm: 300 },
            height: { xs: 150, sm: 300 },
            borderRadius: "50%",
            opacity: 0.1,
            filter: "blur(40px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: -50, sm: -100 },
            right: { xs: -50, sm: -100 },
            width: { xs: 150, sm: 300 },
            height: { xs: 150, sm: 300 },
            borderRadius: "50%",
            background: theme.palette.secondary.light,
            opacity: 0.1,
            filter: "blur(40px)",
          }}
        />

        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: { xs: 300, sm: 500, md: 600 },
            height: { xs: 150, sm: 250, md: 400 },
            mb: { xs: 2, sm: 4 },
            animation: `${floatAnimation} 4s ease-in-out infinite`,
          }}
        >
          <Image
            src="/images/work-in-progress.png"
            alt="Work in Progress"
            fill
            style={{
              objectFit: "contain",
              filter: "drop-shadow(0 5px 15px rgba(0,0,0,0.1))",
            }}
            priority
            sizes="(max-width: 600px) 80vw, 60vw"
          />
        </Box>

        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 3, sm: 4 },
            px: { xs: 1, sm: 0 },
          }}
        >
          <Typography
            variant="body1"
            component="h2"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              fontSize: { xs: "0.875rem", sm: "1.2rem" },
              lineHeight: 1.5,
            }}
          >
            Oops! The page you&apos;re looking for is currently being worked on.
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            sx={{
              color: theme.palette.text.secondary,
              maxWidth: 600,
              fontSize: { xs: "0.875rem", sm: "1.2rem" },
              lineHeight: 1.5,
            }}
          >
            Check back soon or return to our homepage.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, sm: 3 },
            mt: { xs: 2, sm: 4 },
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
            maxWidth: 500,
          }}
        >
          <Button
            variant="outlined"
            size="medium"
            onClick={() => router.back()}
            startIcon={<ArrowBackIcon sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }} />}
            sx={{
              px: { xs: 3, sm: 6 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: "0.875rem", sm: "1rem" },
              textTransform: "none",
              borderRadius: 3,
              borderWidth: 2,
              minWidth: { xs: "140px", sm: "auto" },
              "&:hover": {
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Go Back
          </Button>
          <Button
            component={Link}
            href="/"
            variant="contained"
            size="medium"
            startIcon={<HomeIcon sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }} />}
            sx={{
              px: { xs: 3, sm: 6 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: "0.875rem", sm: "1rem" },
              textTransform: "none",
              borderRadius: 3,
              minWidth: { xs: "140px", sm: "auto" },
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: theme.shadows[3],
              },
              transition: "all 0.2s ease",
            }}
          >
            Return Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
