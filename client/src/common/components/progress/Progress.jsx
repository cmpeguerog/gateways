import React, {memo} from "react";
import PropTypes from "prop-types";
import {LinearProgress, useTheme} from "@material-ui/core";
import Hidden from "../permissions/Hidden";

const Progress = function ({visible}) {
  const {zIndex} = useTheme();
  return (
    <div
      style={{
        zIndex: zIndex.appBar + 1,
        width: "100%",
        position: "relative",
      }}
    >
      <Hidden when={!visible}>
        <LinearProgress
          style={{
            width: "100%",
            height: "4px",
            position: "absolute",
            borderTopLeftRadius: "2px",
            borderTopRightRadius: "2px",
          }}
          color={"primary"}
        />
      </Hidden>
    </div>
  );
};

Progress.propTypes = {
  visible: PropTypes.bool,
};

Progress.defaultProps = {
  visible: false,
};

export default memo(Progress);
