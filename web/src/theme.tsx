import green from "@material-ui/core/colors/green";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0279D2",
    },
    secondary: {
      main: green[500],
    },
    background: {
      default: "#DAE0E6",
    },
    text: {
      secondary: "#7c7c7c",
    },
  },
  typography: {
    body2: {
      fontSize: 14,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
