import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Icon } from "../Icon";
import { SelectOption } from "./SelectOption";

const HelperText = styled.div`
  display: block;
  margin-bottom: 10px;
  margin-top: 30px;
  margin-left: 15px;
  color: ${(props) => (props.error ? "#F44336" : "#f9c7d0")};
  position: absolute;
`;

const SelectWrapper = styled.div`
  padding: 15px;
  z-index: 1;
  &:hover {
    cursor: pointer !important;
  }
`;
const Options = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  border-width: 0 1px;
  background: #fff;
  border: 1px solid #ccc;
  padding-left: 0px;
  z-index: 1000;
`;
const Placeholder = styled.div`
  color: #898989;
`;
const OptionWrapper = styled.div`
padding:5px;
background:${(props) => (props.group ? "#FAF8F5" : "inherit")};
cursor:${(props) => (props.group ? "initial" : "inherit")};
&:hover{
  background:${(props) => (props.group ? "inherit" : "#5A81F1")};
  color:${(props) => (props.group ? "inherit" : "#fff")};#fff;
  cursor:pointer;
}
`;

const SelectedValue = styled.span`
  padding: 5px;
  border: 1px solid #5a81f1;
  margin-left: 5px;
  background: #faf8f5;
  min-width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

const DeleteValue = styled.span`
  cursor: pointer;
`;

const ChevronWrapper = styled.div`
  float: right;
`;

const FilterWrapper = styled.div`
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

const FilterInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  font-family: "Montserrat", sans-serif;
  border: 0;
  outline: none;
`;


const Option = ({ children, className, group, ...props }) => (
  <li className={className} {...props}>
    {children}
  </li>
);

const StyledOption = styled(Option)`
  position: relative;
  list-style: none;
  cursor: pointer;
  ul {
    display: ${(props) => (props.group ? "contents" : "block")};
  }
`;

StyledOption.propTypes = {
  group: PropTypes.bool,
};

StyledOption.defaultProps = {
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
    const { values} = this.state;
    return (
      <Options>
        {options.map((option, index) => {
          return (
            <StyledOption
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
            </StyledOption>
          );
        })}
      </Options>
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
            <SelectedValue key={index}>
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
    const { placeholder,filterable } = this.props;
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
    const { showOptions, showFilter,filteredOptions } = this.state;
    return (
      <div className="uk-margin" style={{ width: "100%", maxWidth: "100%" }}>
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
                <FilterInput
                  type="text"
                  ref={this.filterRef}
                  placeholder={placeholder}
                  className="uk-input"
                />
                {/**uncontrolled */}
              </FilterWrapper>
            )}

            {!showFilter && !disabled && this.renderValues()}
            {showOptions  && !disabled && this.renderOptions(filteredOptions.length ? filteredOptions : options)}
          </div>
        </SelectWrapper>
        {helperText && <HelperText error={error}>{helperText}</HelperText>}
      </div>
    );
  }
}

const styledSelect = styled(Select)`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: 100%;
  max-width: 100%;
  padding: 10px;
  border: 1px solid #e5e5e5;
  transition: 0.2s ease-in-out;
  transition-property: color, background-color, border;
  position: absolute;
  display: inline-block;
  background-color: ${(props) => (props.disabled ? "#FAF8F5" : "inherit")};
`;

export { styledSelect as Select };
