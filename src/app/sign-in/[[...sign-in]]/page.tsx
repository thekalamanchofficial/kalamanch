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
import { Box, Button, Grid2 as Grid, Typography } from "@mui/material";

const SignInPage = () => {
  const { signInState, setSignInState, handleLogin } = useSignInPage();
  return (
    <Grid
      sx={{
        height: "100vh",
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
            maxWidth: "824px",
            backgroundColor: "common.white",
            borderRadius: 3,
            py: 5,
            px: 26,
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
        <div className="flex aspect-square h-auto max-h-[642px] w-full max-w-3xl flex-col items-center gap-y-2 rounded-lg bg-white px-6 py-14 md:aspect-auto">
          <SignIn.Root>
            <SignIn.Step
              name="start"
              className="flex w-full flex-col items-center justify-center gap-4"
            >
              <div className="stepper flex w-full items-center justify-center gap-2">
                <OwlSVG />
                <h1 className="text-3xl font-semibold text-brand-primary">
                  {STATIC_TEXTS.APP_TITLE}
                </h1>
              </div>
              <Clerk.GlobalError className="block text-sm text-rose-400" />
              <Clerk.Connection
                name="google"
                className="flex w-full flex-col items-center justify-center gap-4"
              >
                <Clerk.Loading scope="provider:google">
                  {(isLoading) =>
                    isLoading ? (
                      <Icons.spinner />
                    ) : (
                      <>
                        <Link
                          className="mt-6 flex w-1/2 items-center justify-center gap-4 rounded-md bg-brand-primary px-2 py-2 text-white"
                          href="#"
                        >
                          <GoogleLogo />
                          <h1 className="text-xl">
                            {STATIC_TEXTS.SIGNIN_GOOGLE}
                          </h1>
                        </Link>
                      </>
                    )
                  }
                </Clerk.Loading>
              </Clerk.Connection>
              <span className="my-4 flex w-full items-center justify-center gap-4">
                <div className="h-1 w-[100px] border-t border-font-tertiary"></div>
                <p className="text-base font-normal">or</p>
                <div className="h-1 w-[100px] border-t border-font-tertiary"></div>
              </span>
            </SignIn.Step>
          </SignIn.Root>
          <SignInForm onSubmit={handleLogin} />
        </div>
      ) : null}
    </Grid>
  );
};

export default SignInPage;
