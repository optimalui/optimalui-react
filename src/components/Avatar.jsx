import * as React from "react";
import PropTypes from "prop-types";

export const Avatar = React.forwardRef(function Avatar(props, ref) {
  const {
    alt,
    children: childrenProp,
    classes,
    className,
    width,
    height,
    src,
    ...other
  } = props;

  return (
    <React.Fragment>
      <img
        alt={alt}
        src={src}
        width={width}
        height={height}
        className="uk-border-circle"
        {...other}
        ref={ref}
      />
    </React.Fragment>
  );
});

Avatar.propTypes = {
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: PropTypes.string,
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: PropTypes.string,
  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,
};
