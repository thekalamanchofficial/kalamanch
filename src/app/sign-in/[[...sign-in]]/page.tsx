"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useSignInPage } from "../_hooks/useSignInPage";
import { SignInFormStages } from "../_config/config";
import OwlSVG from "~/assets/svg/owl.svg";
import GoogleLogo from "~/assets/svg/GoogleLogo.svg";
import { STATIC_TEXTS } from "~/app/_components/static/staticText";
import Link from "next/link";
import SignInForm from "~/app/_components/signIn/SignInForm";
import { Icons } from "react-toastify";
import { Box, Button, Divider, Grid2 as Grid, Typography } from "@mui/material";

const SignInPage = () => {
  const { signInState, setSignInState, handleLogin } = useSignInPage();
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
            px: 26,
            width: "100%",
            minHeight: "100%",
          }}
        >
          <SignIn.Root>
            <Clerk.Loading>
              {(isGlobalLoading) =>
                isGlobalLoading ? (
                  <Icons.spinner />
                ) : (
                  <SignIn.Step
                    name="start"
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      gap: "60px",
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <OwlSVG />
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        color="primary"
                      >
                        {STATIC_TEXTS.APP_TITLE}
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      flexDirection="column"
                      width="100%"
                    >
                      <Typography variant="h5" mb={4}>
                        {STATIC_TEXTS.APP_DESCRIPTION}
                      </Typography>
                      <Clerk.Connection
                        name="google"
                        disabled={isGlobalLoading}
                        style={{ padding: "0px", border: "0px", width: "100%" }}
                      >
                        <Clerk.Loading scope="provider:google">
                          {(isLoading) =>
                            isLoading ? (
                              <Icons.spinner />
                            ) : (
                              <Button
                                variant="contained"
                                color="primary"
                                startIcon={<GoogleLogo />}
                                sx={{ width: "100%", maxWidth: "400px" }}
                              >
                                <Typography variant="h6">
                                  {STATIC_TEXTS.SIGNUP_GOOGLE}
                                </Typography>
                              </Button>
                            )
                          }
                        </Clerk.Loading>
                      </Clerk.Connection>
                      <Link
                        href="/sign-up"
                        color="secondary"
                        style={{
                          width: "100%",
                          maxWidth: "400px",
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
                        <Typography variant="subtitle1" color="textSecondary">
                          {STATIC_TEXTS.DISCLAIMER}&nbsp;
                          <Link
                            href="/terms"
                            className="border-b border-b-brand-primary text-brand-primary"
                          >
                            {
                              STATIC_TEXTS.SIGNIN_FORM.LINKS_TEXT
                                .TERMS_OF_SERVICE
                            }
                          </Link>
                          &nbsp;{STATIC_TEXTS.AND}&nbsp;
                          {
                            <Link
                              href="/terms"
                              className="border-b border-b-brand-primary text-brand-primary"
                            >
                              {
                                STATIC_TEXTS.SIGNIN_FORM.LINKS_TEXT
                                  .PRIVACY_POLICY
                              }
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
                  </SignIn.Step>
                )
              }
            </Clerk.Loading>
          </SignIn.Root>
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
            px: 26,
            flexDirection: "column",
            width: "100%",
            minHeight: "100%",
          }}
        >
          <SignIn.Root>
            <SignIn.Step
              name="start"
              style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <Box display="flex" alignItems="center">
                <OwlSVG />
                <Typography variant="h4" fontWeight="bold" color="primary">
                  {STATIC_TEXTS.APP_TITLE}
                </Typography>
              </Box>
              <Clerk.GlobalError style={{ display: "block", color: "red" }} />
              <Clerk.Connection
                name="google"
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0,
                  border: 0,
                  margin: "32px 0",
                }}
              >
                <Clerk.Loading scope="provider:google">
                  {(isLoading) =>
                    isLoading ? (
                      <Icons.spinner />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<GoogleLogo />}
                        fullWidth
                      >
                        <Typography variant="h6">
                          {STATIC_TEXTS.SIGNIN_GOOGLE}
                        </Typography>
                      </Button>
                    )
                  }
                </Clerk.Loading>
              </Clerk.Connection>
              <Divider orientation="horizontal" color="common.black" flexItem>
                or
              </Divider>
            </SignIn.Step>
          </SignIn.Root>
          <SignInForm onSubmit={handleLogin} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default SignInPage;
