import React, {memo} from "react";
import Container from "./container/Container";
import GatewaysProvider from "./context/Context";

const Index = function() {
  return (
    <GatewaysProvider>
      <Container/>
    </GatewaysProvider>
  );
};

export default memo(Index)