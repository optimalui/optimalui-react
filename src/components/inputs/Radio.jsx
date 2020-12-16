import * as React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import useRadioGroup from './useRadioGroup';
import createChainedFunction from '../../utils/createChainedFunction';


const Radio = React.forwardRef(function Radio(props, ref) {
  const {
    checked: checkedProp,
    name: nameProp,
    onChange: onChangeProp,
    ...other
  } = props;
  const radioGroup = useRadioGroup();

  let checked = checkedProp;
  const onChange = createChainedFunction(onChangeProp, radioGroup && radioGroup.onChange);
  let name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = radioGroup.value === props.value;
    }
    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return (
    <input
      type="radio"
      name={name}
      checked={checked}
      onChange={onChange}
      ref={ref}
      className={cx(props.className,"uk-radio")}
      {...other}
    />
  );
});

Radio.propTypes = {
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * If `true`, the radio will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element will be required.
   */
  required: PropTypes.bool,
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any,
};

export default Radio;