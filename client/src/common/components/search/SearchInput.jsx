import React, {memo, useCallback, useRef} from "react";
import {createStyles, InputBase, makeStyles} from "@material-ui/core";
import {Search} from "@material-ui/icons";
import PropTypes from "prop-types";
import clsx from "clsx";

const useStyles = makeStyles(({shape, palette, transitions}) =>
  createStyles({
    "container-root": {
      position: "relative",
      borderRadius: shape.borderRadius,
      background: palette.grey[200],
      "&:hover": {
        background: palette.grey[300],
      },
    },

    icon: {
      width: "81px",
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: palette.secondary.main,
    },

    "input-root": {
      color: "inherit",
      width: "100%",
      textOverflow: "ellipsis !important",
    },

    "input-input": {
      borderRadius: 4,
      padding: "8px 16px 8px 80px",
      textOverflow: "ellipsis !important",
      transition: transitions.create("width"),
    },
    "input-expandable": {
      width: 180,
      "&:focus": {
        width: 250,
      },
    },
  })
);

const SearchInput = function ({
  placeholder,
  expandable,
  delayed,
  onChange,
}) {
  const classes = useStyles();
  const timeout = useRef(undefined);
  const handleChange = useCallback(
    (event) => {
      if (delayed) {
        event.persist();
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          onChange(event.target.value);
        }, 1000);
      } else {
        onChange(event.target.value);
      }
    },
    [delayed, timeout, onChange]
  );

  return (
    <div className={classes["container-root"]}>
      <div className={classes.icon}>
        <Search />
      </div>

      <InputBase
        classes={{
          root: classes["input-root"],
          input: clsx(classes["input-input"], {
            [classes["input-expandable"]]: expandable,
          }),
        }}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  delayed: PropTypes.bool,
  expandable: PropTypes.bool,
};

SearchInput.defaultProps = {
  onChange: () => {},
  delayed: true,
  expandable: true,
};

export default memo(SearchInput);
