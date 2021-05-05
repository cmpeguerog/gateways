import React, {memo} from "react";
import PropTypes from "prop-types";
import { createStyles, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import clsx from "clsx";

const useStyles = makeStyles(({typography: {pxToRem}, palette: {grey, primary, error}}) => createStyles({
  root: {
    width: "100%",
    background: grey[100],
    borderRadius: "4px",
    margin: "4px 0",
    padding: "8px"
  },

  title: {
    width: "100%",
    fontSize: pxToRem(17),
    color: grey[800],
  },

  subtitle: {
    width: "100%",
    fontSize: pxToRem(12),
    fontWeight: 500,
    color: grey[600],
  },

  up: {
    color: primary.main
  },

  down: {
    color: error.main
  }
}))

const Peripheral = function({ peripheral, onDelete }) {
  const classes = useStyles();
  return (
    <Grid
      className={classes.root}
      container
      alignItems={"center"}
    >
      <Grid
        container
        item
        xs
        direction={"column"}
        alignItems={"stretch"}
      >
        <Typography
          className={classes.title}
          noWrap
          align={"left"}
        >
          <b>{peripheral?.uid}</b>
        </Typography>

        <Typography
          className={classes.subtitle}
          noWrap
          align={"left"}
        >
          {peripheral?.vendor} - <b className={clsx({ [classes.up]: peripheral?.status, [classes.down]: !peripheral?.status })}>{peripheral?.status ? "UP" : "DOWN"}</b>
        </Typography>
      </Grid>

      <Grid item>
        <IconButton onClick={() => onDelete(peripheral)}>
          <Delete/>
        </IconButton>
      </Grid>
    </Grid>
  )
}

Peripheral.propTypes = {
  peripheral: PropTypes.object
}

export default memo(Peripheral);