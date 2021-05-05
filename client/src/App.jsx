import React, {memo} from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { Theme } from "./common/styles/themes/Default";
import Index from "./modules/gateways";

const App = function () {
    return (
        <MuiThemeProvider theme={Theme}>
            <Index/>
        </MuiThemeProvider>
    );
};

export default memo(App);