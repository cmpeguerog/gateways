import React, {Fragment, memo} from "react";
import PropTypes from "prop-types";

const Hidden = function ({children, when}) {
  return <Fragment>{!when && children}</Fragment>;
};

Hidden.propTypes = {
  children: PropTypes.element.isRequired,
  when: PropTypes.bool.isRequired,
};

export default memo(Hidden);
