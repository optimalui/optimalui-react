import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon";
import { SelectOption } from "./SelectOption";
import styles from "../../assets/css/select.module.css";
import cx from "classnames";

const SelectWrapper = ({ className, children, ...props }) => {
  return (
    <div className={cx(className, styles.selectWrapper)} {...props}>
      {children}
    </div>
  );
};

const HelperText = ({ error, children, ...props }) => {
  return (
    <div
      className={cx(styles.helperText, {
        [styles.helperTextError]: error,
      })}
      {...props}
    >
      {children}
    </div>
  );
};

const Placeholder = ({ children, ...props }) => (
  <div className={styles.placeholder} {...props}>
    {children}
  </div>
);

const OptionWrapper = ({ children, className, group, ...props }) => {
  return (
    <div
      className={cx(styles.optionWrapper, {
        [styles.optionWrapperGroup]: group,
      })}
      {...props}
    >
      {children}
    </div>
  );
};

const SelectedValue = ({ children, group, ...props }) => (
  <span
    className={cx(styles.selectedValue, {
      [styles.selectedValueGroup]: group,
    })}
    {...props}
  >
    {children}
  </span>
);

const DeleteValue = ({ children, ...props }) => (
  <span className={styles.deleteValue} {...props}>
    {children}
  </span>
);

const ChevronWrapper = ({ children, ...props }) => (
  <div className={styles.chevronWrapper} {...props}>
    {children}
  </div>
);

const FilterWrapper = ({ children, ...props }) => (
  <div className={styles.filterWrapper} {...props}>
    {children}
  </div>
);

const Option = ({ children, className, group, ...props }) => {
  return (
    <li
      className={cx(className, styles.optionStyle, {
        [styles.optionGroupStyle]: group,
      })}
      {...props}
    >
      {children}
    </li>
  );
};

Option.propTypes = {
  group: PropTypes.bool,
};

Option.defaultProps = {
  group: false,
};

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [], //keeps selected values,
      selectedOptions: [],
      showFilter: false,
      filteredOptions: [],
      showOptions: false, // manages options hide and show (chevron up-down,outside click)
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.toogleOptions = this.toogleOptions.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.closeOptions = this.closeOptions.bind(this);
    this.handleDeleteValue = this.handleDeleteValue.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.multiRef = React.createRef();
    this.filterRef = React.createRef();
  }

  static propTypes = {
    error: PropTypes.bool,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    helperText: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    options: PropTypes.array,
  };

  static defaultProps = {
    disabled: false,
    error: false,
    helperText: "",
    multiple: false,
  };

  componentDidMount() {
    document.addEventListener("click", this.closeOptions);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closeOptions);
  }

  /**
   * close option when outside click
   * @param {e} e
   */
  closeOptions(e) {
    if (this.multiRef.current) {
      if (!this.multiRef.current.contains(e.target)) {
        this.setState({ showOptions: false });
      }
    }
  }

  /**
   *
   * push selected values to values state
   * @param {e} e
   */
  handleSelect(e) {
    e.stopPropagation();
    const value = e.currentTarget.getAttribute("data-value");
    const text = e.currentTarget.dataset.value;
    const { multiple } = this.props;

    //clear filtered options
    this.setState({ filteredOptions: [] });

    this.setState((prevState) => {
      if (!multiple) {
        return {
          values: [value],
          showOptions: false,
          showFilter: false,
        };
      }
      const [...values] = prevState.values;
      const index = values.indexOf(text);
      if (index === -1) {
        values.push(value);
      } else {
        values.splice(index, 1);
      }
      return { values };
    });
  }

  /**
   * renders options by giving options values
   * @param {} options
   */
  renderOptions(options = []) {
    const { multiple } = this.props;
    const { values } = this.state;
    return (
      <ul className={styles.options}>
        {options.map((option, index) => {
          return (
            <Option
              key={index}
              onClick={
                !option.hasOwnProperty("group") ? this.handleSelect : null
              }
              data-value={option.value}
              group={option.hasOwnProperty("group")}
            >
              {multiple && (
                <OptionWrapper group={option.hasOwnProperty("group")}>
                  {option.text}{" "}
                  {values.includes(option.value) && (
                    <span>
                      <Icon name="check" />
                    </span>
                  )}
                </OptionWrapper>
              )}
              {!multiple && (
                <OptionWrapper group={option.hasOwnProperty("group")}>
                  {option.text}
                </OptionWrapper>
              )}
              {option.hasOwnProperty("group") &&
                this.renderOptions(option.group)}
            </Option>
          );
        })}
      </ul>
    );
  }

  //sends values to onChange event
  handleOnChange(values) {
    if (this.state.showFilter) {
      this.handleFilterChange();
    }

    const { onChange } = this.props;
    if (typeof onChange === "function" && values.nativeEvent === undefined) {
      // just send values not event
      if (onChange(values) === false) return;
    }
  }

  //handle multiple delete value
  handleDeleteValue = (value) => (e) => {
    e.stopPropagation();
    this.setState((prevState) => {
      const [...values] = prevState.values;
      const index = values.indexOf(value);

      values.splice(index, 1);

      return { values };
    });
  };

  getSelectedOptions(options = [], values = []) {
    var selectedOptions = [];
    options.forEach((option) => {
      if (option.hasOwnProperty("group")) {
        option.group.forEach((opt) => {
          if (values.includes(opt.value)) {
            selectedOptions.push(opt);
          }
        });
      } else {
        if (values.includes(option.value)) {
          selectedOptions.push(option);
        }
      }
    });
    return selectedOptions;
  }

  /**
   * Render selected values
   */
  renderValues() {
    const { values, showFilter } = this.state;
    const { multiple, options } = this.props;

    var selectedOptions = this.getSelectedOptions(options, values);

    if (values.length) {
      if (multiple) {
        return selectedOptions.map((option, index) => {
          return (
            <SelectedValue key={index} group={option.hasOwnProperty("group")}>
              {" "}
              {option.text}{" "}
              <DeleteValue onClick={this.handleDeleteValue(option.value)}>
                <Icon name="minus-circle" fontawesome solid />
              </DeleteValue>
            </SelectedValue>
          );
        });
      }
      return !showFilter && <span> {selectedOptions[0]["text"]} </span>;
    }
  }

  renderPlaceHolder() {
    const { values, showOptions, showFilter } = this.state;
    const { placeholder, filterable } = this.props;
    return (
      <Placeholder>
        {values.length === 0 ? placeholder : ""}
        {
          <ChevronWrapper>
            {!showFilter && filterable && (
              <>
                <Icon
                  onClick={() => {
                    this.setState({ showFilter: !this.state.showFilter });
                  }}
                  name="close"
                  size={0.8}
                  fontawesome
                  solid
                />
              </>
            )}
            <Icon
              name={showOptions ? "chevron-up" : "chevron-down"}
              fontawesome
              solid
            />
          </ChevronWrapper>
        }
      </Placeholder>
    );
  }

  toogleOptions() {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (
      prevProps.multiple &&
      prevState.values.length !== this.state.values.length
    ) {
      return this.state.values;
    }
    if (!prevProps.multiple && prevState.values !== this.state.values) {
      return this.state.values[0];
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.handleOnChange(snapshot);
    }
  }

  handleFilterChange() {
    let list = [];
    if (this.filterRef.current) {
      this.props.options.forEach((option) => {
        if (option.hasOwnProperty("group")) {
          let opt = option.group.filter(
            (d) =>
              d.text
                .toLowerCase()
                .indexOf(this.filterRef.current.value.toLowerCase()) > -1
          );
          if (opt.length) {
            let newOpt = { text: option.text, group: opt };
            list.push(newOpt);
          }
        } else {
          if (
            option.text
              .toLowerCase()
              .indexOf(this.filterRef.current.value.toLowerCase()) > -1
          ) {
            list.push(option);
          }
        }
      });

      if (list.length === 0) {
        list.push({ value: null, text: "No records found!" });
      }

      this.setState({
        filteredOptions: list,
        showOptions: true,
        filterVal: this.filterRef.current.value,
      });
    }
  }

  static Option = SelectOption;

  render() {
    const {
      children,
      filterable,
      className,
      helperText,
      disabled,
      error,
      value,
      multiple,
      placeholder,
      options,
      onChange,
      ...other
    } = this.props;
    const { showOptions, showFilter, filteredOptions } = this.state;
    return (
      <div
        className={cx(styles.selectStyle,{
          [styles.selectStyleDisabled]:disabled
        })}
        style={{ width: "100%", maxWidth: "100%" }}
      >
        <SelectWrapper>
          <div
            className={className}
            onClick={this.toogleOptions}
            ref={this.multiRef}
            onChange={this.handleOnChange}
            {...other}
          >
            {!showFilter && this.renderPlaceHolder()}
            {showFilter && (
              <FilterWrapper>
                {multiple ? !disabled && this.renderValues() : ""}
                <input
                  type="text"
                  ref={this.filterRef}
                  placeholder={placeholder}
                  className={cx("uk-input", styles.filterInput)}
                />
                {/**uncontrolled */}
              </FilterWrapper>
            )}

            {!showFilter && !disabled && this.renderValues()}
            {showOptions &&
              !disabled &&
              this.renderOptions(
                filteredOptions.length ? filteredOptions : options
              )}
          </div>
        </SelectWrapper>
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </div>
    );
  }
}

const _Select = Select;

export { _Select as Select };
