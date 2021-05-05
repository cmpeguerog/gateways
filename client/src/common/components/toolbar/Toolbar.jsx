import React, {memo} from "react";
import {Typography, useTheme} from "@material-ui/core";
import SearchInput from "../../../common/components/search/SearchInput";
import PropTypes from "prop-types";

const Toolbar = function ({
  children,
  title,
  size,
  placeholder,
  delayed,
  onChange,
}) {
  const {palette} = useTheme();

  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        display: "flex",
        backgroundColor: palette.grey[50],
        alignItems: "center",
      }}
    >
      <Typography
        style={{
          fontWeight: 550,
          fontSize: "1.205rem",
          color: palette.secondary.main,
          flexGrow: 1,
          margin: "0 0 0 16px",
        }}
      >
        {title}
      </Typography>

      <SearchInput
        placeholder={placeholder}
        delayed={delayed}
        onChange={onChange}
        expandable={size !== "small"}
      />

      {children ?? <div style={{margin: "0 0 0 16px"}} />}
    </div>
  );
};

Toolbar.propTypes = {
  children: PropTypes.element,
  title: PropTypes.string,
  size: PropTypes.oneOf(["small", "default"]).isRequired,
  placeholder: PropTypes.string,
  delayed: PropTypes.bool,
  onChange: PropTypes.func,
};

Toolbar.defaultProps = {
  title: "",
  size: "default",
  placeholder: "Search by name",
  delayed: false,
  onChange: () => {},
};

export default memo(Toolbar);
