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
});

export default theme;
