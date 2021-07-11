/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon.jsx";
import classNames from "classnames";
import styles from "../../assets/css/dropdown-button.module.css";

class DropDownButtonItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    link: PropTypes.string,
    linkTarget: PropTypes.string,
    icon: PropTypes.string,
    imageUrl: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    iconClass: PropTypes.string,
    iconClassName: PropTypes.string,
    iconStyle: PropTypes.object,
    listClassName: PropTypes.string,
  };

  static defaultProps = {
    className: "",
    text: "",
    link: "",
    disabled: false,
    linkTarget: "",
    icon: "",
    imageUrl: "",
    imageWidth: 15,
    imageHeight: 15,
    iconClass: "",
    iconClassName: "",
    iconStyle: {},
    listClassName: "",
  };
  handleClick(e) {
    e.preventDefault();
    const info = {
      item: this,
      domEvent: e,
    };
    this.props.onClick(info);
  }
  handleKeyDown(e) {
    this.props.onKeyDown({
      item: this,
      domEvent: e,
    });
  }
  render() {
    const {
      className: customClassName,
      listClassName: customListClassName,
      text,
      disabled,
      link,
      linkTarget,
      icon,
      imageUrl,
      imageWidth,
      imageHeight,
      iconClass: customIconClassName,
      iconClassName: customIconClass,
      iconStyle,
      ...other
    } = this.props;

    const listClass = classNames(customListClassName, {
      [styles.disabledItem]: disabled,
    });
    const linkClass = classNames(customClassName, styles.dropDownItem, {
      [styles.disabledItem]: disabled,
    });
    const iconClassName = classNames(styles.iconStyle,customIconClass);
    const iconClass = classNames(styles.iconStyle,customIconClassName);
    const eventHandlers = {
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
    };

    return (
      <li {...other} className={listClass} {...eventHandlers}>
        <a href={link} className={linkClass} target={linkTarget}>
          {icon ? (
            <Icon name={icon} className={iconClassName} style={iconStyle} />
          ) : (
            ""
          )}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className={iconClassName}
              style={iconStyle}
              width={imageWidth}
              height={imageHeight}
            />
          ) : (
            ""
          )}
          {iconClass ? <i className={iconClass} style={iconStyle}></i> : ""}
          {text}
        </a>
      </li>
    );
  }
}

const item = DropDownButtonItem;

export { item as DropDownButtonItem };
