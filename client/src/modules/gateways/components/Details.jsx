import React, { Fragment, memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { createStyles, Drawer, Grid, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import { Add, Close, Visibility } from "@material-ui/icons";
import Scrollbar from "../../../common/components/scrollbars/Scrollbar";
import Autocomplete from "./Autocomplete";
import isEmpty from "../../../common/components/validation/is-empty";
import Peripheral from "./Peripheral";
import Hidden from "../../../common/components/permissions/Hidden";
import useHttp from "../../../common/network/useHttp";
import addPeripheral from "../presenter/addPeripheral";
import { error } from "../../../common/utils/logger/logger";
import removePeripheral from "../presenter/removePeripheral";
import { useGateways } from "../context/Context";

const useStyles = makeStyles(({typography: {pxToRem}, palette: {grey}}) => createStyles({
  paper: {
    width: "320px"
  },

  root: {
    padding: "8px",
    width: "100%",
    height: "100%",
  },

  header: {
    padding: "0 4px 8px",
  },

  title: {
    fontSize: pxToRem(17),
    fontWeight: 600,
    margin: "0 0 0 8px",
  },

  peripheral: {
    fontSize: pxToRem(16),
    color: grey[700],
    fontWeight: 500
  },

  wrapper: {
    padding: "0 8px"
  },

  autocomplete: {
    margin: "16px 0 8px"
  },

  action: {
    margin: "4px 0 0 8px"
  }
}))

const Details = function({ gateway }) {

  const {updateGatewaysCtx} = useGateways();

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [peripheral, setPeripheral] = useState(undefined);

  const [, runAddPeripheral] = useHttp(
    useCallback(({ gateway, peripheral }) => addPeripheral(gateway, peripheral), []),
    useCallback(() => {
      updateGatewaysCtx({ fetch: true });
      setPeripheral(undefined)
    }, [updateGatewaysCtx, setPeripheral]),
    useCallback((throwable) => error(throwable, "Details.jsx"), [])
  )

  const [isRemoving, runRemovePeripheral] = useHttp(
    useCallback(({ gateway, peripheral }) => removePeripheral(gateway, peripheral), []),
    useCallback(() => {
      updateGatewaysCtx({ fetch: true });
    }, [updateGatewaysCtx]),
    useCallback((throwable) => error(throwable, "Details.jsx"), [])
  )

  const doOnDialogToggle = useCallback(() => setIsOpen(prev => !prev), [setIsOpen])

  return (
    <Fragment>
      <Tooltip
        title={"View Gateway details"}
        placement={"left"}
      >
        <span>
          <IconButton
            onClick={doOnDialogToggle}
          >
          <Visibility/>
        </IconButton>
        </span>
      </Tooltip>

      <Drawer
        open={isOpen}
        onClose={doOnDialogToggle}
        PaperProps={{
          className: classes.paper
        }}
        anchor={"right"}
      >
        <Grid
          className={classes.root}
          container
          direction={"column"}
          alignItems={"stretch"}
        >
          <Grid
            className={classes.header}
            container
            item
            alignItems={"center"}
          >
            <IconButton
              style={{
                color: "inherit",
              }}
              aria-label={"menu"}
              onClick={() => setIsOpen(false)}
            >
              <Close />
            </IconButton>

            <Typography
              className={classes.title}
            >
              Gateway Details
            </Typography>
          </Grid>

          <Grid
            item
            xs
          >
            <Scrollbar scale={"match parent"}>
              <Grid
                className={classes.wrapper}
                container
                direction={"column"}
                alignItems={"stretch"}
              >
                <Typography
                  className={classes.peripheral}
                >
                  Peripherals
                </Typography>

                <Hidden when={gateway?.peripherals?.length >= 10}>
                  <Grid
                    className={classes.autocomplete}
                    container
                    item
                    alignItems={"flex-start"}
                  >
                    <Grid
                      item
                      xs
                    >
                      <Autocomplete
                        autoFocus={true}
                        exclusion={gateway?.peripherals?.map(({_id}) => _id)?.join(",")}
                        onChange={setPeripheral}
                      />
                    </Grid>

                    <Grid
                      item
                    >
                      <Hidden when={isEmpty(peripheral)}>
                        <IconButton
                          className={classes.action}
                          disabled={isEmpty(peripheral) || isRemoving}
                          onClick={() => {
                            runAddPeripheral(true, {
                              gateway: gateway?.serial,
                              peripheral: peripheral?._id
                            })
                          }}
                        >
                          <Add/>
                        </IconButton>
                      </Hidden>
                    </Grid>
                  </Grid>
                </Hidden>

                {gateway?.peripherals?.map((element, index) => (
                  <Peripheral
                    key={index}
                    peripheral={element}
                    onDelete={(value) => {
                      runRemovePeripheral(true, {
                        gateway: gateway?.serial,
                        peripheral: value?._id
                      })
                    }}
                  />
                ))}
              </Grid>
            </Scrollbar>
          </Grid>
        </Grid>
      </Drawer>
    </Fragment>
  )
};

Details.propTypes = {
  gateway: PropTypes.object
};

export default memo(Details);