import React from 'react'


export const SelectOption = ({
    children,
    selected,
    group = false,
    label,
    value
}) => (
        <React.Fragment>
            {!group && <option value={value} selected={selected} > {children}</option>}
            {group && <optgroup label={label}> {children}</optgroup>}
        </React.Fragment>
    )