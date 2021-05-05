import React, { Fragment, memo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  makeStyles,
  Tooltip,
  Typography
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import Button from "../../../common/components/buttons/Button";
import useHttp from "../../../common/network/useHttp";
import removePeripheral from "../presenter/removePeripheral";
import { error } from "../../../common/utils/logger/logger";
import { useGateways } from "../context/Context";

const useStyles = makeStyles(({ typography: { pxToRem }, palette: {grey} }) => createStyles({
  title: {
    margin: "0 0 8px"
  },
  tip: {
    fontSize: pxToRem(16),
    color: grey[700]
  }
}))

const Remove = function({ gateway }) {
  const classes = useStyles();
  const {updateGatewaysCtx} = useGateways();
  const [isOpen, setIsOpen] = useState(false);

  const doOnDialogToggle = useCallback(() => setIsOpen(prev => !prev), [setIsOpen])

  const [isRemoving, runRemoveGateway] = useHttp(
    useCallback(({ gateway }) => removePeripheral(gateway), []),
    useCallback(() => {
      updateGatewaysCtx({ fetch: true });
      setIsOpen(false)
    }, [updateGatewaysCtx, setIsOpen]),
    useCallback((throwable) => error(throwable, "Details.jsx"), [])
  )

  return (
    <Fragment>
      <Tooltip
        title={"Remove Gateway"}
        placement={"left"}
      >
        <IconButton
          onClick={doOnDialogToggle}
        >
          <Delete/>
        </IconButton>
      </Tooltip>

      <Dialog
        open={isOpen}
        onClose={doOnDialogToggle}
        disableBackdropClick={isRemoving}
        disableEscapeKeyDown={isRemoving}
      >
        <DialogContent>
          <Typography
            className={classes.title}
            variant={"h6"}
          >
            Delete
          </Typography>
          <Typography
            variant={"subtitle1"}
            className={classes.tip}
          >
            Are you sure you want to delete this gateway?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            variant={"text"}
            color={"primary"}
            onClick={doOnDialogToggle}
            disabled={isRemoving}
          >
            Cancel
          </Button>

          <Button
            variant={"text"}
            color={"error"}
            withProgress={isRemoving}
            onClick={() => runRemoveGateway(true, { gateway: gateway?.serial })}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
};

Remove.propTypes = {
  gateway: PropTypes.object
};

export default memo(Remove);