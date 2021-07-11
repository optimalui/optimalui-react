/* eslint-disable */
import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";
import { Button, DropDownButtonItem } from "../buttons";
import cx from "classnames";
import styles from "../../assets/css/dropdown-button.module.css";

class DropDownButton extends Component {
  static propTypes = {
    className: PropTypes.string,
    attribute: PropTypes.object,
    items: PropTypes.array,
    listClassName: PropTypes.string,
    text: PropTypes.string,
    disabled: PropTypes.bool,
    buttonProps: PropTypes.object,
    mode: PropTypes.string,
    animation: PropTypes.string,
    duration: PropTypes.string,
    textField: PropTypes.string,
    onItemClick: PropTypes.func,
    onItemKeyDown: PropTypes.func,
  };

  static defaultProps = {
    className: "",
    text: "",
    listClassName: "",
    buttonProps: {},
    mode: "hover",
    animation: "",
    duration: "1s",
    textField: "",
    items: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      animationStyle: {},
      lastItemIndex: -1,
      currentItemIndex: -1,
    };
    this.dropDownRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.openDropDown = this.openDropDown.bind(this);
    this.closeDropDown = this.closeDropDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleItemKeyDown = this.handleItemKeyDown.bind(this);

    this.listRef = React.createRef();

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
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.outSideEvent);
    document.addEventListener("mousemove", this.handleMouseLeave);

    const lastItemIndex = this.listRef.current.childNodes.length - 1;
    this.setState({
      lastItemIndex,
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.outSideEvent);
    document.removeEventListener("mousemove", this.handleMouseLeave);
  }
  setFocusToFirstItem() {
    this.listRef.current.childNodes[0].children[0].focus();
    this.setState({ currentItemIndex: 1 });
  }

  setFocusToPreviousItem() {
    const { currentItemIndex } = this.state;
    if (currentItemIndex > 0) {
      this.setState(this.decrementIndex);
    }
  }

  setFocusToNextItem() {
    const { currentItemIndex, lastItemIndex, isOpen } = this.state;
    if (isOpen) {
      if (currentItemIndex === lastItemIndex) {
        this.setState(this.equalIndex);
      } else {
        this.setState(this.incrementIndex);
      }
    }
  }

  incrementIndex = ({ currentItemIndex }) => ({
    currentItemIndex: currentItemIndex + 1,
  });

  decrementIndex = ({ currentItemIndex }) => ({
    currentItemIndex: currentItemIndex - 1,
  });

  equalIndex = ({ lastItemIndex }) => ({
    currentItemIndex: lastItemIndex,
  });

  handleKeyDown(event) {
    switch (event.keyCode) {
      case this.keyCode.ENTER:
        this.closeDropDown();
        break;
      case this.keyCode.SPACE:
      case this.keyCode.RETURN:
      case this.keyCode.DOWN:
        this.openDropDown();
        this.setFocusToNextItem();
        break;
      case this.keyCode.UP:
        this.openDropDown();
        this.setFocusToPreviousItem();
        break;
      case this.keyCode.ESC:
        this.closeDropDown();
        break;
      default:
        break;
    }
  }

  openDropDown() {
    /**for key binding */
    this.setState({ isOpen: true });
  }

  closeDropDown() {
    /**for key binding */
    this.setState({ isOpen: false });
  }

  toggleDropDown() {
    /**for key binding */
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleClick() {
    if (this.props.mode === "click") {
      this.setState({ isOpen: !this.state.isOpen });
    }

    if (this.props.mode === "hover") {
      this.setState({ isOpen: false });
    }
  }

  handleMouseEnter() {
    if (this.props.mode === "hover") {
      this.setState({ isOpen: true });
    }
  }

  handleMouseLeave(e) {
    if (
      this.props.mode === "hover" &&
      !this.dropDownRef.current.contains(e.target)
    ) {
      this.setState({ isOpen: false });
    }
  }

  handleItemClick(e) {
    this.setState({ isOpen: false });
    if (this.props.onItemClick) {
      this.props.onItemClick(e);
    }
  }

  handleItemKeyDown(e) {
    if (e.keyCode === this.keyCode.ENTER) {
      this.props.onItemKeyDown(e);
    }
  }

  outSideEvent = (e) => {
    if (this.dropDownRef && !this.dropDownRef.current.contains(e.target)) {
      this.setState({ isOpen: false });
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state !== nextState;
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentItemIndex >= 0) {
      console.log(`${nextState.currentItemIndex}`);
      this.listRef.current.childNodes[
        nextState.currentItemIndex
      ].children[0].focus();
    }
  }

  render() {
    const {
      handleMouseEnter,
      handleMouseLeave,
      handleClick,
      handleItemClick,
      handleItemKeyDown,
    } = this;
    const {
      className: customClassName,
      listClassName: customListClassName,
      items,
      text,
      buttonProps,
      mode,
      animation,
      duration,
      textField,
      children,
      attribute,
      onItemClick,
      onItemKeyDown,
      ...other
    } = this.props;


    const { isOpen } = this.state;

    const eventHandlers = {
      onClick: handleClick,
    };
    if (mode === "hover") {
      eventHandlers.onMouseEnter = handleMouseEnter;
      eventHandlers.onMouseLeave = handleMouseLeave;
    }

    const className = cx(customClassName, styles.inline);

    const listClassName = cx(customListClassName, styles.dropDown, {
      [styles.dropDownOpen]: isOpen & !buttonProps["disabled"],
    });

    const itemEventHandlers = {
      onClick: handleItemClick,
      onKeyDown: handleItemKeyDown,
    };

    //WAI-ARIA
    let attrs = {
      ...attribute,
      "aria-haspopup": true,
      "aria-expanded": isOpen,
      "aria-label": text,
      role: this.props.role || "menu",
    };

    return (
      <div
        className={className}
        {...other}
        ref={this.dropDownRef}
        tabIndex={0}
        onKeyDown={this.handleKeyDown}
      >
        <Button {...eventHandlers} {...buttonProps} {...attrs}>
          {text}
        </Button>
        <div className={listClassName}>
          <ul className={styles.dropDownNav} ref={this.listRef}>
            {items.length
              ? items.map((item, index) =>
                  typeof item === "object" ? (
                    <DropDownButtonItem
                      key={`item-${index}`}
                      text={textField ? item[textField] : item.text}
                      {...item.other}
                      {...itemEventHandlers}
                    />
                  ) : (
                    <DropDownButtonItem
                      key={`${item}-${index}`}
                      text={item}
                      {...itemEventHandlers}
                    />
                  )
                )
              : React.Children.map(children, (item, index) =>
                  cloneElement(item, {
                    key: `item-${index}`,
                    ...item.props,
                    ...itemEventHandlers
                  })
                )}
          </ul>
        </div>
      </div>
    );
  }
}
const drp = DropDownButton;
export { drp as DropDownButton };
