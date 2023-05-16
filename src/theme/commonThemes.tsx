import { Box, Container } from "@mui/material";
import { ThemeOptions, createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#84DD7C",
    },
    secondary: {
      main: "#d47cdd",
    },
    background: {
      default: "#121212",
      paper: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#7cddd4",
      disabled: "#7c84dd",
    },
    divider: "rgba(255,255,255,0.13)",
  },
};

export const mainTheme = createTheme(themeOptions);

export const ContainerStyle = styled(Container)({
  color: mainTheme.palette.text.primary,
  backgroundColor: mainTheme.palette.background.default,
  marginTop: "1rem",
  borderRadius: "2rem",
  padding: "1rem",
  width: "600px",
  maxWidth: "600px",
});
