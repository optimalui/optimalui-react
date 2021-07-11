import * as React from "react";
import PropTypes from "prop-types";
import clsx from "classnames";
import { Grid } from "./layout";

const CardHeader = React.forwardRef(function CardHeader(props, ref) {
  const {
    action,
    className,
    component: Component = "div",
    subheader: subheaderProp,
    subheaderTypographyProps,
    title: titleProp,
    titleTypographyProps,
    avatar,
    ...other
  } = props;

  let title = titleProp;

  if (title != null) {
    title = (
      <div className="uk-card-title" component={"h3"} {...titleTypographyProps}>
        {title}
      </div>
    );
  }

  let subheader = subheaderProp;
  if (subheader != null) {
    subheader = (
      <div
        className="uk-text-meta"
        component="span"
        {...subheaderTypographyProps}
      >
        {subheader}
      </div>
    );
  }

  return (
    <Component
      className={clsx("uk-card-header", className)}
      ref={ref}
      {...other}
    >
      <Grid className="uk-grid-small uk-flex-middle" >
        {avatar && (
          <div class="uk-width-auto">
            {avatar}
          </div>
        )}
        <div class="uk-width-expand">
          {title}
          {subheader}
        </div>
      </Grid>
      {action && <div className="uk-card-badge">{action}</div>}
    </Component>
  );
});

CardHeader.propTypes = {
  /**
   * The action to display in the card header.
   */
  action: PropTypes.node,
  /**
   * @ignore
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
  component: PropTypes /* @typescript-to-proptypes-ignore elementType*/,
  /**
   * The content of the component.
   */
  subheader: PropTypes.node,
  /**
   * These props will be forwarded to the subheader
   * (as long as disableTypography is not `true`).
   */
  subheaderTypographyProps: PropTypes.object,
  /**
   * The content of the Card Title.
   */
  title: PropTypes.node,
  /**
   * These props will be forwarded to the title
   * (as long as disableTypography is not `true`).
   */
  titleTypographyProps: PropTypes.object,
  /**
   * The Avatar for the Card Header.
   */
  avatar: PropTypes.node,
};

CardHeader.displayName = "CardHeader";

export default CardHeader;
