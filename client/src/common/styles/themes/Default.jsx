import {createMuiTheme} from "@material-ui/core";
import "typeface-montserrat";

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#67bd4d",
      contrastText: "#fff",
    },
    secondary: {
      main: "#202639",
      contrastText: "#fff",
    },
    error: {
      main: "#ff604f",
      contrastText: "#fff",
    },
    warning: {
      main: "#F5B907",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: '"Montserrat"',
  },
});
