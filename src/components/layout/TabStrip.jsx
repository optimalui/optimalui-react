import React, { Component, cloneElement } from "react";
import { tabStripStyle } from "../../assets/jss";
import PropTypes from "prop-types";
import cx from "classnames";
import { Tab} from "./index";
import {
  onSelectPropType,
  selectedIndexPropType,
} from "../../_helpers/propTypes";
import { css } from "aphrodite/no-important";

export default class TabStrip extends Component {
  static propTypes = {
    className: PropTypes.string,
    selected: selectedIndexPropType,
    onSelect: onSelectPropType,
    alignTabs: PropTypes.string,
    animation: PropTypes.string,
    duration: PropTypes.string,
    contentClassName: PropTypes.string,
  };
  static defaultProps = {
    className: "",
    selected: 0,
    alignTabs: "",
    animation: "",
    contentClassName: "",
    duration: "1s",
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedTabItemIndex: 0,
      selectedContent: null,
      contentAnimation: false,
      tabCount: 0,
      openDropDown: false,
    };
    this.tabStripRef = React.createRef();
    this.getSelectedTab = this.getSelectedTab.bind(this);
    this.setSelectedTabState = this.setSelectedTabState.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.setFocusToNextTab = this.setFocusToNextTab.bind(this);
    this.setFocusToPreviousTab = this.setFocusToPreviousTab.bind(this);

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
  handleSelected(index, event) {
    const { onSelect } = this.props;
    const tab = this.getSelectedTab(index);
    if (tab) {
      this.setSelectedTabState(index, tab);
    }
    const info = {
      selectedIndex: index, // selected Tab Index
      selectedTab: tab,
    };

    if (typeof onSelect === "function") {
      if (onSelect(info) === false) return;
    }
    if (typeof event === "function") {
      //tab click event
      if (event(info) === false) return;
    }
  }

  componentDidMount() {
    const { selected } = this.props;

    if (selected != null) {
      const tab = this.getSelectedTab(selected);
      if (tab) {
        this.setSelectedTabState(selected, tab);
      }
    }

    const tabCount = React.Children.count(this.props.children);
    this.setState({ tabCount });
  }

  getSelectedTab(tabIndex) {
    const tab = this.props.children.filter((item, index) => tabIndex === index);
    if (tab[0]) {
      return tab[0];
    }
    return null;
  }

  setSelectedTabState(index, tab) {
    if (!tab.props.disabled) {
      if (tab.props.dropdown) {
        this.setState({
          selectedIndex: index,
        });
      } else {
        this.setState({
          selectedIndex: index,
        });
      }
    }
  }

  toggleDropDown() {
    const { openDropDown, selectedIndex } = this.state;
    const { store } = this.props;
    const tab = this.getSelectedTab(selectedIndex);
    if (tab) {
      if (tab.props.dropdown) {
        this.setState({ openDropDown: !openDropDown, selectedTabItemIndex: 0 });
        store.setState({
          selectedTabItemIndex: 0,
        });
      }
    }
  }

  handleKeyDown(event) {
    const { selectedIndex, selectedTabItemIndex } = this.state;

    switch (event.keyCode) {
      case this.keyCode.RIGHT:
        this.setFocusToNextTab(selectedIndex);
        break;
      case this.keyCode.LEFT:
        this.setFocusToPreviousTab(selectedIndex);
        break;
      case this.keyCode.SPACE:
        this.toggleDropDown();
        break;
      case this.keyCode.DOWN:
        this.setFocusToNextTabItem(selectedIndex, selectedTabItemIndex);
        break;
      case this.keyCode.UP:
        this.setFocusToPreviousTabItem(selectedIndex, selectedTabItemIndex);
        break;
      default:
        break;
    }
  }

  setNextIndex = (nextIndex) => {
    if (nextIndex >= this.state.tabCount) {
      this.setState({
        selectedIndex: 0,
        openDropDown: false,
      });
    } else {
      this.setState({
        selectedIndex: nextIndex,
        openDropDown: false,
      });
    }
  };

  setPreviousIndex = (preIndex) => {
    const { tabCount } = this.state;
    if (preIndex < 0) {
      this.setState({
        selectedIndex: tabCount - 1,
        openDropDown: false,
      });
    } else {
      this.setState({
        selectedIndex: preIndex,
        openDropDown: false,
      });
    }
  };

  setNextTabItemIndex = (nextIndex, tabItemCount) => {
    if (nextIndex >= tabItemCount) {
      this.setState({ selectedTabItemIndex: 0 });
    } else {
      this.setState({ selectedTabItemIndex: nextIndex });
    }
  };

  setPreviousTabItemIndex = (preIndex, tabItemCount) => {
    if (preIndex < 0) {
      this.setState({ selectedTabItemIndex: tabItemCount - 1 });
    } else {
      this.setState({ selectedTabItemIndex: preIndex });
    }
  };

  setFocusToNextTabItem = (currentIndex, currentTabItemIndex) => {
    let nextTabItemIndex = currentTabItemIndex + 1;
    const tab = this.getSelectedTab(currentIndex);
    if (tab) {
      if (tab.props.dropdown && !tab.props.disabled) {
        this.setNextTabItemIndex(nextTabItemIndex, tab.props.children.length);
      }
    }
  };

  setFocusToPreviousTabItem = (currentIndex, currentTabItemIndex) => {
    let preTabItemIndex = currentTabItemIndex - 1;
    const tab = this.getSelectedTab(currentIndex);
    if (tab) {
      if (tab.props.dropdown && !tab.props.disabled) {
        this.setPreviousTabItemIndex(
          preTabItemIndex,
          tab.props.children.length
        );
      }
    }
  };

  setFocusToNextTab = (currentIndex) => {
    let nextIndex = currentIndex + 1;

    const nextTab = this.getSelectedTab(nextIndex);
    if (nextTab) {
      if (nextTab.props.disabled) {
        nextIndex++;
      }
    }

    this.setNextIndex(nextIndex);
  };

  setFocusToPreviousTab = (currentIndex) => {
    let preIndex = currentIndex - 1;

    const preTab = this.getSelectedTab(preIndex);
    if (preTab) {
      if (preTab.props.disabled) {
        preIndex--;
      }
    }
    this.setPreviousIndex(preIndex);
  };

  getSelectedTabItemIndex(value) {
    this.setState({ selectedTabItemIndex: value.selectedItemIndex });
  }

  render() {
    const {
      classes,
      className: customClassName,
      contentClassName,
      selected,
      children,
      alignTabs,
      store,
      animation,
      duration,
      items,
      ...other
    } = this.props;

    const { selectedIndex, selectedTabItemIndex, openDropDown } = this.state;

    const styles = tabStripStyle(alignTabs, null, null, animation, duration);

    const className = css(styles.default);

    const events = {
      onSelect: this.handleSelected,
    };

    const tabElements = React.Children.map(children, (child, index) => {
      if (child.type === Tab) {
        return cloneElement(child, {
          key: `tab-${index}`,
          onClick: this.handleSelected.bind(this, index, child.props.onClick),
          onSelect: this.getSelectedTabItemIndex.bind(this),
          openDropDown,
          selected: selectedIndex === index,
          alignment: alignTabs,
        });
      }
    });

    // TabStrip Active Selected Content
    let tabStripSelectedContent = tabElements.map((item, index) => {
      if (item.props.dropdown && item.props.selected) {
        return item.props.children.map((tabItem, tabItemIndex) => {
          if (tabItemIndex === selectedTabItemIndex && !tabItem.props.disabled) {
            return (
              <div
                className={cx(
                  contentClassName,
                  css(styles.content, styles.animation)
                )}
                key={`${index}-${tabItemIndex}`}
              >
                {tabItem.props.children}
              </div>
            );
          }
          return null;
        });
      } else if (index === selectedIndex && !item.props.disabled) {
        return (
          <div
            className={cx(
              contentClassName,
              css(styles.content, styles.animation)
            )}
            key={index}
          >
            {item.props.children}
          </div>
        );
      }
      return null;
    });

    return (
      <React.Fragment>
        <div className={css(styles.gridStyle)}>
          <div
            className={css(styles.tabWrapper)}
            tabIndex={0}
            onKeyDown={this.handleKeyDown}
          >
            <ul
              className={cx(className, customClassName)}
              {...other}
              {...events}
              ref={this.tabStripRef}
              role="tablist"
            >
              {tabElements}
            </ul>
          </div>
          {tabStripSelectedContent}
        </div>
      </React.Fragment>
    );
  }
}
