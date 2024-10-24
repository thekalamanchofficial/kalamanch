"use client";
import { createTheme } from "@mui/material/styles";

const th = createTheme();

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#260EB9",
    },
    secondary: {
      main: "#F5F7FE",
    },
    error: {
      main: "#F04438",
    },
    common: {
      white: "#fff",
      black: "#101828",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: "4px",
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
          minHeight: "56px",
        },
        contained: {
          "&:hover": {
            backgroundColor: "#260EB9",
            boxShadow: "none",
          },
        },
        containedSecondary: {
          "&:hover": {
            backgroundColor: "#F5F7FE",
            boxShadow: "none",
          },
        },
        disableElevation: true,
      },
    },
  },
  cssVariables: true,
});

export default theme;
