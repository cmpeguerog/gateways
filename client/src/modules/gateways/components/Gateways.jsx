import React, {memo} from "react";
import Scrollbar from "../../../common/components/scrollbars/Scrollbar";
import { Table, TableBody } from "@material-ui/core";
import Header from "./Header";
import { useGateways } from "../context/Context";
import Gateway from "./Gateway";

const Gateways = function() {

  const {gateways} = useGateways();

  return (
    <Scrollbar scale={"match parent"}>
      <Table stickyHeader>
        <Header/>
        <TableBody>
          {gateways.map((gateway, index) => (
            <Gateway
              key={index}
              gateway={gateway}
            />
          ))}
        </TableBody>
      </Table>
    </Scrollbar>
  )
}

export default memo(Gateways);