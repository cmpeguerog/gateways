import React, { memo, useCallback, useEffect } from "react";
import {
  Container as MuiContainer,
  createStyles, Grid,
  makeStyles, Paper
} from "@material-ui/core";
import useHttp from "../../../common/network/useHttp";
import getGateways from "../presenter/getGateways";
import { error } from "../../../common/utils/logger/logger";
import Progress from "../../../common/components/progress/Progress";
import Toolbar from "../../../common/components/toolbar/Toolbar";
import Gateways from "../components/Gateways";
import { useGateways } from "../context/Context";
import Button from "../../../common/components/buttons/Button";
import { Refresh } from "@material-ui/icons";
import Add from "../components/Add";

const useStyles = makeStyles(({palette: {grey}}) => createStyles({
  root: {
    height: "100vh",
    background: grey[100],
    padding: "32px"
  },

  wrapper: {
    width: "100%",
    height: "100%",
    border: `1px solid ${grey[300]}`,
  },

  footer: {
    height: "56px",
    padding: "0 8px 0 8px",
    background: grey[50],
  }
}));

const Container = function() {
  const classes = useStyles()
  const {updateGatewaysCtx, fetch, filters} = useGateways();

  const [isGettingGateways, runGetGateways] = useHttp(
    useCallback((filters) => getGateways(filters), []),
    useCallback((response) => {
      updateGatewaysCtx({
        fetch: false,
        gateways: response,
      })
    }, [updateGatewaysCtx]),
    useCallback((throwable) => {
      error(throwable)
      updateGatewaysCtx({ fetch: false })
    }, [updateGatewaysCtx])
  );

  useEffect(() => {
    if (fetch) {
      runGetGateways(true, filters);
    }
  }, [fetch, filters, runGetGateways])

  return (
    <MuiContainer
      className={classes.root}
      disableGutters
      maxWidth={false}
    >
      <Grid
        className={classes.wrapper}
        container
        direction={"column"}
        alignItems={"stretch"}
        component={Paper}
        elevation={0}
      >

        <Grid item>
          <Progress visible={isGettingGateways}/>
        </Grid>

        <Grid item>
          <Toolbar
            title={"Gateways"}
            placeholder={"Search by Gateway Name"}
            delayed={true}
            onChange={(value) => {
              updateGatewaysCtx({
                filters: { name: value },
                fetch: true,
              })
            }}
          >
            <Add/>
          </Toolbar>
        </Grid>

        <Grid item xs>
          <Gateways/>
        </Grid>

        <Grid
          className={classes.footer}
          container
          item
          justify={"flex-end"}
          alignItems={"center"}
        >
          {isGettingGateways ? (
            <Button
              color={"error"}
              variant={"contained"}
              onClick={() => runGetGateways(false)}
            >
              Cancel
            </Button>
          ) : (
            <Button
              color={"primary"}
              variant={"contained"}
              onClick={() => runGetGateways(true, filters)}
              startIcon={<Refresh />}
            >
              Refresh
            </Button>
          )}
        </Grid>
      </Grid>
    </MuiContainer>
  );
};

export default memo(Container);