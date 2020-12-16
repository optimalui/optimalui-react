import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

export default class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    type: PropTypes.string,
    className: PropTypes.string,
    placeHolder: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.string,
    width: PropTypes.string,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
  };

  static defaultProps = {
    type: "text",
    className: "",
    placeHolder: "",
    disabled: false,
    multiline: false,
    rows: 4,
  };
  render() {
    const {
      type,
      className,
      value,
      placeHolder,
      size,
      width,
      rows,
      multiline,
      ...other
    } = this.props;

    const inputClass = cx(className, {
      "uk-input": !multiline,
      "uk-textarea": multiline,
      "uk-form-width-medium": size === "medium",
      "uk-form-width-medium uk-form-large": size === "large",
      "uk-form-width-medium uk-form-small": size === "small",
      "uk-form-width-large": width === "large",
      "uk-form-width-small": width === "small",
      "uk-form-width-xsmall": width === "xsmall",
    });

    return (
      <div className="uk-margin">
        {!multiline && (
          <input
            className={inputClass}
            type={type}
            placeholder={placeHolder}
            {...other}
          />
        )}
        {multiline && (
          <textarea
            className={inputClass}
            placeholder={placeHolder}
            {...other}
          />
        )}
      </div>
    );
  }
}
