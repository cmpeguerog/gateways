import {createMuiTheme} from "@material-ui/core";
import "typeface-montserrat";

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff604f",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: '"Montserrat"',
  },
});
