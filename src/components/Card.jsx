import * as React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const Card = React.forwardRef(function Card(props, ref) {
  const { className, children, color, size, title, ...other } = props;

  let headerComponentExist = false;
  let mediaClass = "";
  React.Children.map(children, (child, index) => {
    if (child.type.displayName === "CardHeader" || child.type.displayName === "CardBody") {
      headerComponentExist = true;
    }
    if(child.type.displayName==="CardMedia"){
      if(child.props.align==="left" || child.props.align==="right"){
        mediaClass = "uk-grid-collapse uk-child-width-1-2@s uk-margin uk-grid";
      }
    }
  });

  return (
    <div
      ref={ref}
      className={cx(
        "uk-card",
        `uk-card-${color}`,
        {
          "uk-card-body": !headerComponentExist,
          "uk-card-small": size === "small",
          "uk-card-large": size === "large",
        },
        mediaClass,
        className
      )}
      {...other}
    >
      {title && !headerComponentExist && (
        <h3 className="uk-card-title">{title}</h3>
      )}
      {children}
    </div>
  );
});

Card.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Set bg color
   */
  color: PropTypes.oneOf(["default", "primary", "secondary"]),
  /**
   * Card title
   */
  title: PropTypes.string,
  /**
   * size prop
   */
  size: PropTypes.oneOf(["small", "large"]),
};

Card.defaultProps = {
  color: "default",
};

export default Card;
