import React, { Component } from "react";
import cx from "classnames";
import { tabStripStyle } from "../../assets/jss";
import PropTypes from "prop-types";
import { css } from "aphrodite/no-important";

export default class TabItem extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
    title: PropTypes.string.isRequired,
    onItemClick: PropTypes.func,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    selected: PropTypes.bool,
  };
  static defaultPropTypes = {
    disabled: false,
    className: "",
    selected: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
    this.handleClick = this.handleClick.bind(this);
    this.tabItemRef = React.createRef();
  }

  handleClick(e) {
    const { onClick } = this.props;
    const info = {
      item: this,
      domEvent: e,
    };
    if (typeof onClick === "function") {
      if (onClick(info) === false) return;
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selected !== state.selected) {
      return {
        selected: props.selected,
      };
    }
    return null;
  }

  render() {
    const {
      title,
      className: customClassName,
      disabled,
      ...other
    } = this.props;

    const { selected } = this.state;

    const styles = tabStripStyle();
    const className = cx(
      customClassName,
      css(
        styles.dropdownItemStyle,
        disabled ? styles.disabledDropDownItem : "",
        selected ? styles.activeTab : ""
      )
    );
    return (
      <li
        ref={this.tabItemRef}
        className={className}
        onClick={this.handleClick}
        role="tab"
        aria-selected={selected}
        aria-disabled={disabled}
        {...other}
      >
        {title}
      </li>
    );
  }
}
