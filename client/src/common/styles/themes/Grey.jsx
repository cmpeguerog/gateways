import {createMuiTheme} from "@material-ui/core";
import "typeface-montserrat";

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#BABABA",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Montserrat"',
  },
});
