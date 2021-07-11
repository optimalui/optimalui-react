import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { Icon } from "../Icon";
import "../../assets/css/button.css";

class Button extends Component {
  static propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    danger: PropTypes.bool,
    large: PropTypes.bool,
    link: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    small: PropTypes.bool,
    text: PropTypes.bool,
    fullWidth: PropTypes.bool,
    icon: PropTypes.string,
    imageUrl: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    iconClass: PropTypes.string,
    iconClassName: PropTypes.string,
    iconStyle: PropTypes.object,
  };

  static defaultProps = {
    type: "button",
    active: false,
    primary: false,
    danger: false,
    link: false,
    small: false,
    large: false,
    className: "",
    secondary: false,
    text: false,
    disabled: false,
    fullWidth: false,
    icon: "",
    imageWidth: 15,
    imageHeight: 15,
    iconClass: "",
    iconClassName: "",
    iconStyle: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.disableids) {
      const parentId = ReactDOM.findDOMNode(this).parentNode.getAttribute(
        "group-id"
      );
      if (nextProps.disableids.includes(parentId)) {
        this.setState({ disabledGroup: true });
      }
    }
  }

  render() {
    const {
      active,
      disabled,
      primary,
      danger,
      link,
      small,
      large,
      secondary,
      text,
      fullWidth,
      className: customClassName,
      dispatch,
      children,
      icon,
      imageUrl,
      imageWidth,
      imageHeight,
      iconClass: customIconClassName,
      iconClassName: customIconClass,
      iconStyle,
      ...other
    } = this.props;

    const className = classNames("uk-button", customClassName, {
      "uk-button-default": !primary && !secondary && !danger && !text && !link,
      "uk-button-primary": primary,
      "uk-button-secondary": secondary,
      "uk-button-danger": danger,
      "uk-button-text": text,
      "uk-button-link": link,
      "uk-button-small": small,
      "uk-button-large": large,
      "uk-active": active,
      "uk-width-1-1": fullWidth,
    });

    const iconCls = classNames("uk-margin-small-right", customIconClass);
    const fontCls = classNames("uk-margin-small-right", customIconClassName);

    return (
      <button {...other} className={className} disabled={disabled}>
        {icon && <Icon name={icon} className={iconCls} style={iconStyle} />}
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            className={iconCls}
            style={iconStyle}
            width={imageWidth}
            height={imageHeight}
          />
        )}
        {customIconClass && <i className={fontCls} style={iconStyle}></i>}
        {children}
      </button>
    );
  }
}
const _Button = Button;
export { _Button as Button };
