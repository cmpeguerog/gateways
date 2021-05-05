import React, {memo} from "react";
import PropTypes from "prop-types";
import { createStyles, Grid, makeStyles, TableRow, Typography } from "@material-ui/core";
import { columns } from "../container/const";
import Cell from "../../../common/components/table/Cell";
import traverse from "../../../common/utils/traverse";
import truncate from "../../../common/utils/truncate";
import Details from "./Details";
import Remove from "./Remove";

const useStyles = makeStyles(({palette: {grey}, typography: {pxToRem}}) => createStyles({
  item: {
    fontSize: pxToRem(16),
    color: grey[700],
    fontWeight: 450
  }
}))

const Gateway = function({ gateway }) {
  const classes = useStyles();

  const render = (key, type) => {
    const value = traverse(gateway, key);
    switch (type) {
      case "uuid":
        return (
          <b>
            {truncate(value, 30)}
          </b>
        );
      case "array":
        return (value?.length === 0 ? "Empty" : value?.length)
      default:
        return value
    }
  }

  return (
    <TableRow>
      {columns.map(({key, type}) => (
        <Cell key={key} align={"center"}>
          <Typography className={classes.item}>
            {render(key, type)}
          </Typography>
        </Cell>
      ))}
      <Cell align={"center"}>
        <Grid
          container
          alignItems={"center"}
          justify={"center"}
          wrap={"nowrap"}
          spacing={1}
        >
          <Remove gateway={gateway}/>
          <Details gateway={gateway} />
        </Grid>
      </Cell>
    </TableRow>
  )
};

Gateway.propTypes = {
  gateway: PropTypes.object
}

export default memo(Gateway);