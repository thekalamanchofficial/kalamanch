"use client";

import Link from "next/link";
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";
import OwlSVG from "~/assets/svg/owl.svg";
import { Footer } from "../_components/footer/Footer";

const Page = () => {
  return (
    <Box
      sx={{
        width: "100%",
        justifyItems: "center",
        alignItems: "center",
        backgroundImage: (theme) =>
          `linear-gradient(to top left, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          padding: 4,
          maxWidth: "1200px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <Grid display="flex" alignItems="center" justifyContent="center" width="100%">
          <OwlSVG />
        </Grid>
        <Grid>
          <Typography
            sx={{
              fontSize: "4.6rem",
              fontWeight: 200,
              lineHeight: "1.09",
              color: "primary.main",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            About Kalamanch
          </Typography>
          <Typography
            textAlign="center"
            fontSize="2.1rem"
            lineHeight="1.14"
            color="text.secondary"
            fontFamily="system-ui, sans-serif"
            fontWeight="200"
          >
            Welcome to Kalamanch, a platform for writers which helps you hone your craft, connect
            with other writers, and monetize your work.
          </Typography>
        </Grid>
        <Grid>
          <Typography
            fontSize="3.2rem"
            fontWeight="200"
            color="primary"
            fontFamily="system-ui, sans-serif"
          >
            Vision
          </Typography>
          <Typography
            fontSize="1.7rem"
            fontFamily="system-ui, sans-serif"
            color="text.secondary"
            fontWeight="200"
          >
            Create economic opportunities for writers by providing a platform to publish and
            monetize their work.
          </Typography>
        </Grid>
        <Grid>
          <Typography
            fontSize="3.2rem"
            fontWeight="200"
            color="primary"
            fontFamily="system-ui, sans-serif"
          >
            Mission
          </Typography>
          <Typography
            fontSize="1.7rem"
            fontFamily="system-ui, sans-serif"
            color="text.secondary"
            fontWeight="200"
          >
            We believe every story deserves to be heard. Our mission is to provide writers with a
            dedicated space to publish their work, gain visibility, and collaborate with like-minded
            artists.
          </Typography>
        </Grid>
        <Grid>
          <Typography
            fontSize="3.2rem"
            fontWeight="200"
            color="primary"
            fontFamily="system-ui, sans-serif"
          >
            Why Kalamanch?
          </Typography>
          <Typography
            fontSize="1.7rem"
            fontFamily="system-ui, sans-serif"
            color="text.secondary"
            fontWeight="200"
          >
            Kalamanch offers a space to publish and showcase your work, a community that values and
            supports writers, and opportunities to collaborate, grow, and monetize your content.
          </Typography>
        </Grid>
        <Grid width="100%">
          <Typography
            fontSize="3.2rem"
            fontWeight="200"
            color="primary"
            fontFamily="system-ui, sans-serif"
          >
            How It Works
          </Typography>
          <Typography
            fontSize="1.7rem"
            fontFamily="system-ui, sans-serif"
            color="text.secondary"
            fontWeight="200"
          >
            Sign Up – Create your account and set up your profile.
          </Typography>
          <Typography
            fontSize="1.7rem"
            fontFamily="system-ui, sans-serif"
            color="text.secondary"
            fontWeight="200"
          >
            Write & Share – Publish your stories, poems, or articles.
          </Typography>
          <Typography
            fontSize="1.7rem"
            fontFamily="system-ui, sans-serif"
            color="text.secondary"
            fontWeight="200"
          >
            Engage – Connect with other writers, receive feedback, and grow your audience.
          </Typography>
        </Grid>
        <Grid textAlign="center" width="100%">
          <Typography
            fontSize="3.2rem"
            fontWeight="200"
            color="primary"
            fontFamily="system-ui, sans-serif"
          >
            Join Us!
          </Typography>
          <Typography
            fontSize="1.7rem"
            fontFamily="system-ui, sans-serif"
            color="text.secondary"
            fontWeight="200"
          >
            Become part of a growing community that values storytelling and creativity.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: 2, color: "primary.main", textTransform: "none" }}
            component={Link}
            href="/sign-in"
          >
            Sign up now
          </Button>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
};

export default Page;
