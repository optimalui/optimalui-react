/* eslint-disable */
import React, { Component, cloneElement, useEffect, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { offCanvasStyle } from "../../assets/jss";
import { OffCanvasBody, OffCanvasCloseButton } from "../layout";
import _ from "lodash";
import { noop } from "../../util";
import { StyleSheet, css } from "aphrodite/no-important";
import withStyles from "react-jss";

const styles = (position, width) => {
  const canvasWidth = width ? `${width}px` : "270px";
  const canvasRelWidth = width ? `${width}px` : "350px";
  const pushRightWidth = width ? `${width - 20}px` : "330px";

  const openMode = {
    right: position === "right" ? 0 : null,
    left: position === "left" ? 0 : null,
  };

  const animationMode = {
    background: "#fff",
    right: position === "right" ? `-${canvasWidth}` : null,
    left: position === "left" ? `-${canvasWidth}` : null,
    "@media (min-width: 960px)": {
      right: position === "right" ? `-${canvasRelWidth}` : null,
      left: position === "left" ? `-${canvasRelWidth}` : null,
    },
  };

  return StyleSheet.create({
    pushStyle: {
      right: position === "right" ? `${width} !important` : null,
      left: position === "left" ? `${width} !important` : null,
      "@media (min-width: 960px)": {
        right: position === "right" ? `${pushRightWidth} !important` : null,
        left: position === "left" ? `${canvasRelWidth} !important` : null,
      },
      overflowY: "scroll",
      touchAction: "pan-y pinch-zoom",
    },
    bodyStyle: {
      position: "relative",
      transition: `${position} .3s ease-out`,
      "-webkit-transition": `${position} .3s ease-out`,
      boxSizing: "border-box",
      width: "100%",
    },
    transitionStyle: {
      "-webkit-transition": `${position} .3s ease-out`,
      transition: `${position} .3s ease-out`,
    },
    canvas: {
      position: "fixed",
      top: 0,
      bottom: 0,
      right: position === "right" ? 0 : null,
      left: position === "left" ? 0 : null,
      zIndex: 1300,
    },
    canvasBarStyle: {
      background: "#fff",
      position: "absolute",
      height: "100%",
      "-webkit-overflow-scrolling": "touch",
      top: 0,
      bottom: 0,
      right: position === "right" ? 0 : null,
      left: position === "left" ? 0 : null,
      width: canvasWidth,
      "@media (min-width: 960px)": {
        width: canvasRelWidth,
      },
    },
    canvasContent: {
      position: "absolute",
      width: canvasWidth,
      boxSizing: "border-box",
      padding: "20px 20px",
      "@media (min-width: 960px)": {
        width: canvasRelWidth,
        padding: "40px 40px",
      },
    },
    animationStyle: { ...animationMode },
    openStyle: { ...openMode },
  });
};

const addBodyStyle = (position) => {
  document.body.style.boxSizing = "border-box";
  document.body.style.width = "100%";
  document.body.style.position = "relative";
  document.body.style.transition = `${position} .3s ease-out`;
  switch (position) {
    case "left":
      document.body.style.left = 0;
      document.body.style.right = null;
      break;
    case "right":
      document.body.style.right = 0;
      document.body.style.left = null;
      break;
    default:
      break;
  }
};

const OffCanvas = (props) => {
  const {
    children,
    className: customClassName,
    classes,
    open,
    overlay,
    overlayBackground,
    position,
    overlayClick,
    overlayClassName,
    style: customStyle,
    width,
    onClick,
    ...other
  } = props;

  const [openCanvas, setOpenCanvas] = useState(false);
  const [canvasPosition, setCanvasPosition] = useState("left");

  if (openCanvas !== open) {
    setOpenCanvas(open);
  }

  if (canvasPosition !== position) {
    setCanvasPosition(position);
  }

  const canvasClick = (e) => {
    e.stopPropagation();
    if (typeof onClick === "function") {
      if (onClick(e) === false) return;
    }
  };

  const canvasStyles = styles(canvasPosition, width);

  const pushStyle = canvasStyles.pushStyle;

  addBodyStyle(canvasPosition);

  document.documentElement.style.overflow = null;

  const canvasClass = cx(
    css(canvasStyles.canvas),
    css(canvasStyles.animationStyle),
    css(openCanvas ? canvasStyles.openStyle : ""),
    css(canvasStyles.transitionStyle),
    customClassName
  );

  const overlayClass = cx(
    {
      [classes.overlay]: overlay,
      [classes.overlayBackground]: overlayBackground && overlay,
    },
    overlayClassName
  );

  const canvasBarClass = css(canvasStyles.canvasBarStyle);

  let canvasStyle = customStyle;

  const overlayEvents = {
    onClick: overlayClick,
  };

  const canvasEvents = {
    onClick: canvasClick,
  };

  return (
    <React.Fragment> 
      <div className={overlayClass} {...overlayEvents}></div>
      <div
        className={canvasClass}
        {...other}
        style={canvasStyle}
        {...canvasEvents}
      >
        <div className={canvasBarClass}>
          <div className={css(canvasStyles.canvasContent)}>
            {React.Children.map(children, (child) => {
              if (child.type === OffCanvasBody) {
                return cloneElement(child, { ...child.props });
              }
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

OffCanvas.propTypes = {
  open: PropTypes.bool,
  position: PropTypes.string,
  overlay: PropTypes.bool,
  overlayBackground: PropTypes.bool,
  overlayClick: PropTypes.func,
  overlayClassName: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

OffCanvas.defaultProps = {
  open: false,
  position: "left",
  overlay: false,
  overlayBackground: false,
  overlayClick: noop,
  className: "",
  overlayClassName: "",
  width: null,
  style: {},
};

const styledOffCanvas = withStyles(offCanvasStyle)(OffCanvas);

export { styledOffCanvas as OffCanvas };
