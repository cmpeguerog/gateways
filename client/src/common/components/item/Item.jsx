import React, {memo} from "react";
import {
  ButtonBase,
  Grid,
  Typography,
  useTheme,
} from "@material-ui/core";
import PropTypes from "prop-types";
import isEmpty from "../validation/is-empty";
import {CheckBox} from "@material-ui/icons";
import Hidden from "../permissions/Hidden";

const Item = function ({
  title,
  subtitle,
  selected,
  useTypography = true,
  onClick,
}) {
  const {palette, typography} = useTheme();
  return (
    <Grid
      style={{
        width: "100%",
        backgroundColor: palette.grey[100],
        borderRadius: "4px",
        margin: "4px 0 4px 0",
        padding: "8px",
      }}
      container
      component={isEmpty(onClick) ? "div" : ButtonBase}
      onClick={onClick}
      alignItems={"center"}
    >
      <Grid
        container
        item
        xs
        direction={"column"}
        alignItems={"stretch"}
      >
        <Grid
          style={{
            width: "100%",
          }}
          item
        >
          {useTypography === true ? (
            <Typography
              style={{
                width: "100%",
                fontSize: typography.pxToRem(17),
                color: palette.grey[800],
              }}
              noWrap
              align={"left"}
            >
              {title}
            </Typography>
          ) : (
            title
          )}
        </Grid>
        <Grid
          style={{
            width: "100%",
            fontSize: typography.pxToRem(12),
            fontWeight: 500,
            color: palette.grey[600],
          }}
          component={Typography}
          item
          align={"left"}
        >
          {subtitle}
        </Grid>
      </Grid>

      <Grid item>
        <Hidden when={selected !== true}>
          <CheckBox color={"primary"} />
        </Hidden>
      </Grid>
    </Grid>
  );
};

Item.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onClick: PropTypes.func,
  useTypography: PropTypes.bool,
  selected: PropTypes.bool,
};

export default memo(Item);
