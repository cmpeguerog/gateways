import React, {forwardRef, memo} from "react";
import {
  Button as MuiButton,
  CircularProgress,
  MuiThemeProvider as ThemeProvider,
  withStyles,
} from "@material-ui/core";
import {fade, lighten} from "@material-ui/core/styles";
import "typeface-montserrat";

import {Theme as Error} from "../../styles/themes/Error";
import {Theme as Grey} from "../../styles/themes/Grey";
import PropTypes from "prop-types";

const Styled = withStyles((theme) => ({
  root: {
    padding: "8px 24px 8px 24px",
    "&:hover": {
      backgroundColor: lighten(theme.palette.primary.main, 0.15),
    },
  },

  containedPrimary: {
    "&:hover": {
      backgroundColor: lighten(theme.palette.primary.main, 0.15),
    },
  },

  containedSecondary: {
    "&:hover": {
      backgroundColor: lighten(theme.palette.secondary.main, 0.15),
    },
  },

  textPrimary: {
    "&:hover": {
      backgroundColor: fade(
        theme.palette.primary.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },

  textSecondary: {
    "&:hover": {
      backgroundColor: fade(
        theme.palette.secondary.main,
        theme.palette.action.hoverOpacity
      ),
    },
  },
}))(MuiButton);

const Button = forwardRef(function Button(
  {color, disabled, children, withProgress, ...props},
  ref
) {
  return (
    <div style={{position: "relative"}}>
      {color === "error" ? (
        <ThemeProvider theme={Error}>
          <Styled
            {...props}
            disabled={withProgress || disabled}
            color={"primary"}
            disableElevation
            ref={ref}
          >
            {children}
          </Styled>
        </ThemeProvider>
      ) : color === "gray" ? (
        <ThemeProvider theme={Grey}>
          <Styled
            {...props}
            disabled={withProgress || disabled}
            color={"primary"}
            disableElevation
            ref={ref}
          >
            {children}
          </Styled>
        </ThemeProvider>
      ) : (
        <Styled
          {...props}
          color={color}
          disabled={withProgress || disabled}
          disableElevation
          ref={ref}
        >
          {children}
        </Styled>
      )}
      {withProgress && (
        <CircularProgress
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: -12,
            marginLeft: -12,
          }}
          size={24}
        />
      )}
    </div>
  );
});

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  color: PropTypes.oneOf(["primary", "secondary", "error", "grey"])
    .isRequired,
  variant: PropTypes.oneOf(["outlined", "contained", "text"])
    .isRequired,
  disabled: PropTypes.bool,
  withProgress: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  withProgress: false,
  variant: "text",
};

export default memo(Button);
