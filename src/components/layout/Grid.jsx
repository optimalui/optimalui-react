import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

export default class Grid extends Component {
    
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: "",
  }; 

  render() {
    const { className,...props} = this.props;  
    return <div className={cx("uk-grid uk-margin",this.props.className)} {...props}>{this.props.children}</div>;
  }
}
