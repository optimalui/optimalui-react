import * as React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

export const CardMedia = React.forwardRef(function CardMedia(props, ref) {
  const { className, align, children, width, height, src,alt, ...other } = props;

  return (
    <div
      className={cx(
        `uk-card-media-${align}`,
        {
          "uk-cover-container": align === "right" || align === "left",
        },
        className
      )}
      ref={ref}
      {...other}
    >
      <img
        alt={alt}
        src={src}
        style={{ height: "100%", width: "100%" }}
        className={align === "right" || align === "left" ? "uk-cover" : ""}
      />
      {(align === "left" || align === "right") && (
        <canvas width={width} height={height}></canvas>
      )}
    </div>
  );
});

CardMedia.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * align media
   */
  align: PropTypes.oneOf(["top", "left", "right", "bottom"]),
  /**
   * image src
   */
  src: PropTypes.string,
  /**
   * canvas width and height
   */
  width: PropTypes.number,
  height: PropTypes.number,
};

CardMedia.defaultProps = {
  align: "top",
  width: 600,
  height: 400,
};

CardMedia.displayName = "CardMedia";
