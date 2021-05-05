import React, {useMemo} from "react";
import {Scrollbar as Bars} from "react-scrollbars-custom";
import PropTypes from "prop-types";
import isEmpty from "../validation/is-empty";
import {AutoSizer} from "react-virtualized";

function Wrapper({
  children,
  width,
  height,
  color,
  thickness,
  margin,
  ...others
}) {
  let thumb = useMemo(() => {
    if (isEmpty(color)) {
      return undefined;
    }

    return {
      thumbYProps: {
        renderer: (props) => {
          const {elementRef, style, ...restProps} = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              style={{...style, backgroundColor: color}}
            />
          );
        },
      },
    };
  }, [color]);

  return (
    <Bars
      disableTracksWidthCompensation
      style={{width, height, position: ""}}
      {...thumb}
      {...others}
      trackYProps={{
        renderer: (props) => {
          const {elementRef, style, ...restProps} = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              style={{
                ...style,
                marginRight: margin,
                width: thickness,
              }}
            />
          );
        },
      }}
      trackXProps={{
        renderer: (props) => {
          const {elementRef, style, ...restProps} = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              style={{
                ...style,
                marginBottom: margin,
                height: thickness,
              }}
            />
          );
        },
      }}
    >
      {children}
    </Bars>
  );
}

function Scrollbar({children, scale, ...props}) {
  return scale === "wrap content" ? (
    <Wrapper {...props}>{children}</Wrapper>
  ) : (
    <AutoSizer>
      {({width, height}) => (
        <Wrapper {...props} width={width} height={height}>
          {typeof children === "function"
            ? children({width, height})
            : children}
        </Wrapper>
      )}
    </AutoSizer>
  );
}

Scrollbar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
  scale: PropTypes.oneOf(["match parent", "wrap content"]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onScroll: PropTypes.func,
  color: PropTypes.string,
  thickness: PropTypes.number,
  translateContentSizesToHolder: PropTypes.bool,
};

Scrollbar.defaultProps = {
  thickness: 8,
  margin: 4,
  color: "rgba(0, 0, 0, 0.18)",
  translateContentSizesToHolder: false,
  scale: "wrap content",
  onScroll: () => {},
};

export default Scrollbar;
