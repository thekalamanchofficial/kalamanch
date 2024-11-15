"use client";
import { createTheme } from "@mui/material/styles";

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
    text: {
      primary: "#101828",
      secondary: "#4D5565",
      disabled: "#A5A5A5",
    },
    background: {
      default: "#F5F7FE",
      paper: "#fff",
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    h1: {
      fontSize: "40px",
      lineHeight: "100%",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "28px",
      lineHeight: "21px",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "18px",
      lineHeight: "21px",
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: "20px",
      lineHeight: "22px",
      fontWeight: "500",
      color: "#4D5565",
    },
    subtitle2: {
      fontSize: "16px",
      lineHeight: "22px",
      fontWeight: "500",
      color: "#4D5565",
    },
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
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiTextField-input:-webkit-autofill": {
            "-webkit-text-fill-color": "black",
            "-webkit-box-shadow": "0 0 0px 1000px white inset",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input:-webkit-autofill": {
            "-webkit-text-fill-color": "black",
            "-webkit-box-shadow": "0 0 0px 1000px white inset",
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: "gray",
        },
        root: {
          "&.Mui-completed .MuiStepConnector-line": {
            borderColor: "blue",
          },
        },
      },
    },
  },
  cssVariables: true,
});

export default theme;
