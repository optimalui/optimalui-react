import * as React from 'react';
import PropTypes from 'prop-types';
import cx from "classnames";


export const CardBody = React.forwardRef(function CardBody(props, ref) {
  const { classes, className, component: Component = 'div', ...other } = props;

  return <Component className={cx("uk-card-body", className)} ref={ref} {...other} />;
});

CardBody.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
};

CardBody.displayName = "CardBody";