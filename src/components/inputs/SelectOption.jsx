import React from "react";

const SelectOption = ({ children, selected, group = false, label, value }) => (
  <React.Fragment>
    {!group && (
      <option value={value} selected={selected}>
        {" "}
        {children}
      </option>
    )}
    {group && <optgroup label={label}> {children}</optgroup>}
  </React.Fragment>
);

const _SelectOption = SelectOption;
export { _SelectOption as SelectOption };
