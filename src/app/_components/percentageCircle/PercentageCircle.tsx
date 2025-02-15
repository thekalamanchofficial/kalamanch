import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress, { type CircularProgressProps } from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const PercentageCircle = (props: CircularProgressProps & { value: number; fillColor: string }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        size="4rem"
        thickness={5}
        sx={{
          color: `${props.fillColor} !important`,
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary", fontSize: "14px" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default PercentageCircle;
