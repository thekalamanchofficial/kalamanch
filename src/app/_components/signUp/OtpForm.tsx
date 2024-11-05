import { Button, Grid2 as Grid, Typography } from "@mui/material";
import React from "react";
import OtpInput from "react-otp-input";

type OTPVerificationProps = {
  otp: string;
  setOtp: (otp: string) => void;
  onNext: () => Promise<void>;
  verifying: boolean;
  onPrev: () => void;
};

const OTPVerification: React.FC<OTPVerificationProps> = ({
  otp,
  setOtp,
  onNext,
  verifying,
  onPrev,
}) => {
  return (
    <Grid
      container
      width="100%"
      justifyContent="center"
      alignItems="center"
      gap={12}
    >
      <Typography variant="h1">Verify your email</Typography>
      <Grid
        gap={4}
        display="flex"
        flexDirection="column"
        textAlign="center"
        width="100%"
      >
        <Grid>
          <Typography variant="h6" fontWeight="bold">
            Enter your verification code
          </Typography>
          <Typography variant="subtitle2">
            Please enter the 6 digit code we sent to your email address
          </Typography>
        </Grid>
        <Grid gap={2} display="flex" justifyContent="center" overflow="auto">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{ width: "2.5rem" }}
            renderSeparator={<div style={{ margin: "0 10px" }}> </div>}
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  transitionDuration: "150ms",
                  transition: "ease-in-out",
                  width: "50px",
                  height: "50px",
                  textAlign: "center",
                }}
              />
            )}
          />
        </Grid>
        <Grid justifyContent="space-between" display="flex" width="100%" mt={2}>
          <Button
            type="button"
            onClick={onPrev}
            variant="contained"
            size="large"
            sx={{ width: "150px" }}
          >
            <Typography variant="h6">Cancel</Typography>
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={onNext}
            disabled={verifying}
            sx={{ width: "150px" }}
          >
            <Typography variant="h6">Verify</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OTPVerification;
