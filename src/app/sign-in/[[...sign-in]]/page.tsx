"use client";

import Link from "next/link";
import { Alert, Box, Button, Divider, Grid2 as Grid, Typography } from "@mui/material";
import SignInForm from "~/app/_components/signIn/SignInForm";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import GoogleLogo from "~/assets/svg/GoogleLogo.svg";
import OwlSVG from "~/assets/svg/owl.svg";
import { SignInFormStages } from "../_config/config";
import { useSignInPage } from "../_hooks/useSignInPage";

const SignInPage = () => {
  const { signInState, setSignInState, handleLogin, handleSSOLogin, ssoLoginErrors } =
    useSignInPage();
  return (
    <Grid
      sx={{
        minHeight: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "secondary.main",
        px: 6,
        py: 14,
      }}
      container
      spacing={2}
    >
      {signInState === SignInFormStages.WITH_GOOGLE ? (
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "824px",
            backgroundColor: "common.white",
            borderRadius: 3,
            py: 5,
            px: 2,
            width: "100%",
            minHeight: "100%",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "60px",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Box display="flex" alignItems="center">
              <OwlSVG />
              <Typography variant="h4" fontWeight="bold" color="primary">
                {STATIC_TEXTS.APP_TITLE}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" flexDirection="column" width="100%">
              <Typography variant="h5" mb={4}>
                {STATIC_TEXTS.APP_DESCRIPTION}
              </Typography>
              <Button
                startIcon={<GoogleLogo />}
                variant="contained"
                fullWidth
                onClick={() => handleSSOLogin("oauth_google")}
              >
                <Typography variant="h6" color="#fff">
                  {STATIC_TEXTS.SIGNUP_GOOGLE}
                </Typography>
              </Button>
              <Link
                href="/sign-up"
                color="secondary"
                style={{
                  width: "100%",
                  marginTop: "16px",
                  textAlign: "center",
                  textDecoration: "none",
                  backgroundColor: "#F5F7FE",
                  borderRadius: "4px",
                  height: "56px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" color="primary">
                  {STATIC_TEXTS.CREATE_ACCOUNT}
                </Typography>
              </Link>
              <Box mt={4} textAlign="center">
                <Typography variant="body2" color="textSecondary">
                  {STATIC_TEXTS.DISCLAIMER}&nbsp;
                  <Link
                    href="/terms"
                    className="border-b border-b-brand-primary text-brand-primary"
                  >
                    {STATIC_TEXTS.SIGNIN_FORM.LINKS_TEXT.TERMS_OF_SERVICE}
                  </Link>
                  &nbsp;{STATIC_TEXTS.AND}&nbsp;
                  {
                    <Link
                      href="/terms"
                      className="border-b border-b-brand-primary text-brand-primary"
                    >
                      {STATIC_TEXTS.SIGNIN_FORM.LINKS_TEXT.PRIVACY_POLICY}
                    </Link>
                  }
                  .
                </Typography>
              </Box>
            </Box>
            <Box width="100%" textAlign="center">
              <Typography variant="h6" mb={1}>
                {STATIC_TEXTS.SIGNIN_FORM.LINKS_TEXT.HAVE_ACCOUNT}
              </Typography>
              <Button
                onClick={() => {
                  setSignInState(SignInFormStages.WITH_EMAIL);
                }}
                variant="contained"
                color="secondary"
                fullWidth
              >
                <Typography variant="h6" color="primary">
                  {STATIC_TEXTS.SIGNIN}
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : null}
      {signInState === SignInFormStages.WITH_EMAIL ? (
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "824px",
            backgroundColor: "common.white",
            borderRadius: 3,
            py: 5,
            px: 2,
            flexDirection: "column",
            width: "100%",
            minHeight: "100%",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
              maxWidth: "400px",
            }}
          >
            <Box display="flex" alignItems="center">
              <OwlSVG />
              <Typography variant="h4" fontWeight="bold" color="primary">
                {STATIC_TEXTS.APP_TITLE}
              </Typography>
            </Box>
            <Button
              startIcon={<GoogleLogo />}
              variant="contained"
              fullWidth
              sx={{ my: 4 }}
              onClick={() => handleSSOLogin("oauth_google")}
            >
              <Typography variant="h6" color="#fff">
                {STATIC_TEXTS.SIGNUP_GOOGLE}
              </Typography>
            </Button>
            <Divider orientation="horizontal" color="common.black" flexItem>
              or
            </Divider>
          </Grid>
          <SignInForm onSubmit={handleLogin} />
        </Grid>
      ) : null}

      {ssoLoginErrors && (
        <ul>
          {ssoLoginErrors.map((el, index) => (
            <Alert severity="error" key={index}>
              {el.longMessage}
            </Alert>
          ))}
        </ul>
      )}
    </Grid>
  );
};

export default SignInPage;
