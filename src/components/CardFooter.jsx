import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';


export const CardFooter = React.forwardRef(function CardFooter(props, ref) {
  const { className, ...other } = props;

  return (
    <div
      className={cx("uk-card-footer",className)}
      ref={ref}
      {...other}
    />
  );
});

CardFooter.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
};