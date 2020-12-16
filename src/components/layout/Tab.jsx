import React, { Component, cloneElement } from "react";
import cx from "classnames";
import { tabStripStyle } from "../../assets/jss";
import PropTypes from "prop-types";
import { css } from "aphrodite/no-important";
import { Icon } from "../Icon";
import { TabItem } from "../layout";

export default class Tab extends Component {
  static propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    tabIndex: PropTypes.string,
    selectedTabItemIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    onSelect: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
    title: PropTypes.string.isRequired,
    alignment: PropTypes.string,
    dropdown: PropTypes.bool,
    tabItemContent: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
    ]),
    openDropDown: PropTypes.bool,
  };
  static defaultProps = {
    className: "",
    disabled: false,
    selected: false,
    text: "",
    id: null,
    title: "",
    alignment: "",
    dropdown: false,
    openDropDown: false,
    selectedTabItemIndex: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      dropDownOpen: false,
      selected: false,
      tabItemIndex: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.dropDownWrapperRef = React.createRef();
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.dropDownClickOutSide = this.dropDownClickOutSide.bind(this);

    this.keyCode = Object.freeze({
      TAB: 9,
      RETURN: 13,
      ESC: 27,
      SPACE: 32,
      PAGEUP: 33,
      PAGEDOWN: 34,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40,
      ENTER: 13,
    });
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

  handleItemClick(index, tabItem) {
    const { onSelect } = this.props;
    if (tabItem) {
      if (!tabItem.props.disabled) {
        this.setState({ tabItemIndex: index });
        const info = {
          selectedItemIndex: index,
        };
        if (typeof onSelect === "function") {
          if (onSelect(info) === false) return;
        }
      }
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.dropDownClickOutSide);
  }

  dropDownClickOutSide = (e) => {
    if (this.dropDownWrapperRef.current) {
      if (!this.dropDownWrapperRef.current.contains(e.target)) {
        this.setState({ dropDownOpen: false });
      }
    }
  };

  componentWillUnmount() {
    document.removeEventListener("click", this.dropDownClickOutSide);
  }
  getCssClasses() {
    const { alignment, selected, disabled } = this.props;
    return tabStripStyle(alignment, selected, disabled);
  }
  toggleDropDown() {
    const { dropDownOpen } = this.state;
    this.setState({ dropDownOpen: !dropDownOpen });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selected !== state.selected) {
      if (props.dropdown) {
        if (props.selectedTabItemIndex !== state.tabItemIndex) {
          return {
            selected: props.selected,
            tabItemIndex: props.selectedTabItemIndex,
          };
        }
      }
      return {
        selected: props.selected,
      };
    }
    return null;
  }

  render() {
    const {
      text,
      id,
      tabIndex,
      disabled,
      className: customClassName,
      classes,
      children,
      title,
      alignment,
      dropdown,
      animation,
      openDropDown,
      selectedTabItemIndex,
      store,
      ...other
    } = this.props;

    const { dropDownOpen, selected, tabItemIndex } = this.state;

    const styles = tabStripStyle(alignment, selected, disabled);

    const className = cx(customClassName, css(styles.text));

    const tabItems = React.Children.map(children, (child, index) => {
      if (child.type === TabItem) {
        return cloneElement(child, {
          key: index,
          ref: this.tabItemRef,
          onClick: this.handleItemClick.bind(this, index, child),
          selected: tabItemIndex === index,
        });
      }
    });

    return (
      <li
        {...other}
        role="tab"
        aria-selected={selected}
        aria-disabled={disabled}
        selected-tabitem={selectedTabItemIndex}
        tabIndex={tabIndex || (selected ? 0 : null)}
        className={className}
        onClick={this.handleClick}
        onSelect={this.handleItemClick}
      >
        {dropdown && (
          <div ref={this.dropDownWrapperRef} onClick={this.toggleDropDown}>
            {title}{" "}
            {dropDownOpen ? (
              <Icon name="triangle-up" />
            ) : (
              <Icon name="triangle-down" />
            )}
            {(dropDownOpen || openDropDown) && (
              <div className={css(styles.dropDownWrapper)}>
                <ul className={css(styles.dropDownStyle)}>{tabItems}</ul>
              </div>
            )}
          </div>
        )}
        {dropdown === false && <span>{title}</span>}
      </li>
    );
  }
}
