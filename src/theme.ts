"use client";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CommonColors {
    lightGray?: string;
    gray?: string;
    strokePrimary?: string;
    percentageGreen?: string;
    percentageYellow?: string;
    percentageRed?: string;
  }
}

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
      lightGray: "#F2F3F5",
      gray: "#535353",
      strokePrimary: "#E4E4E4",
      percentageGreen: "#17B752",
      percentageYellow: "#E2AC22",
      percentageRed: "#B71717",
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
    h4: {
      fontSize: "15px",
      lineHeight: "21px",
      fontWeight: "550",
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
    MuiFormControl: {
      styleOverrides: {
        root: {
          padding: 0,
          "& .MuiTextField-root": {
            "margin-bottom": "16px",
            "margin-top": "8px",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiTextField-input:-webkit-autofill": {
            "-webkit-text-fill-color": "black",
            "-webkit-box-shadow": "0 0 0px 1000px white inset",
          },
          marginBottom: "8px",
          marginTop: "8px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          height: "38px",
          padding: 0,
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
          padding: "6px 9px",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          minHeight: "48px",
          "&.MuiButton-root": {
            "min-height": "48px",
          },
          "&.MuiChip-root": {
            "min-height": "32px",
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
