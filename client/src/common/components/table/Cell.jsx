import {memo} from "react";
import styled from "styled-components";
import {TableCell} from "@material-ui/core";

const Cell = styled(TableCell)`
  && {
    &.MuiTableCell-root {
      padding: 0 4px 0 4px;
      height: ${({height = 56}) => height}px;
    }
  }
`;

export default memo(Cell);
