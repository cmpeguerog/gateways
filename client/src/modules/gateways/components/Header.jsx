import React, {memo} from "react";
import {TableHead, TableRow} from "@material-ui/core";
import Cell from "../../../common/components/table/Cell";
import {columns} from "../container/const";

const Header = function () {
  return (
    <TableHead>
      <TableRow>
        {columns?.map(({key, title}) => (
          <Cell key={key} height={32} align={"center"}>
            {title}
          </Cell>
        ))}
        <Cell height={32} align={"center"}>
          Details
        </Cell>
      </TableRow>
    </TableHead>
  );
};

export default memo(Header);
