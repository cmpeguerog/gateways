import React, {Fragment, memo} from "react";
import {Add as AddIcon} from "@material-ui/icons";
import { createStyles, Drawer, IconButton, makeStyles, Tooltip } from "@material-ui/core";
import { useGateways } from "../context/Context";
import Creation from "./Creation";

const useStyles = makeStyles(() => createStyles({
  root: {
    margin: "0 16px"
  },
  paper: {
    width: "320px"
  }
}))

const Add = function() {
  const classes = useStyles();
  const {create, updateGatewaysCtx} = useGateways();
  return (
    <Fragment>
      <Tooltip
        title={"Add new Gateway"}
        placement={"bottom"}
      >
        <IconButton
          className={classes.root}
          onClick={() => updateGatewaysCtx({ create: true })}
        >
          <AddIcon/>
        </IconButton>
      </Tooltip>

      <Drawer
        open={create}
        onClose={() => updateGatewaysCtx({ create: false })}
        classes={{
          paper: classes.paper
        }}
        anchor={"right"}
      >
        <Creation/>
      </Drawer>
    </Fragment>
  );
};

export default memo(Add);