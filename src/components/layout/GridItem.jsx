import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const GridItem = (props) => {
  const {
    w_1_2,
    w_1_3,
    w_2_3,
    w_1_4,
    w_3_4,
    w_1_5,
    w_2_5,
    w_3_5,
    w_4_5,
    w_1_6,
    w_5_6,
    className,
    ...other
  } = props;

  const cls = cx(className,{
    "uk-width-1-2": w_1_2,
    "uk-width-1-3": w_1_3,
    "uk-width-2-3": w_2_3,
    "uk-width-1-4": w_1_4,
    "uk-width-3-4": w_3_4,
    "uk-width-1-5": w_1_5,
    "uk-width-2-5": w_2_5,
    "uk-width-3-5": w_3_5,
    "uk-width-4-5": w_4_5,
    "uk-width-1-6": w_1_6,
    "uk-width-5-6": w_5_6,
  });

  return (
    <div className={cls} {...other}>
      {props.children}
    </div>
  );
};

GridItem.propTypes = {
  /**
   * Width props
   */
  w_1_2: PropTypes.bool,
  w_1_3: PropTypes.bool,
  w_2_3: PropTypes.bool,
  w_1_4: PropTypes.bool,
  w_3_4: PropTypes.bool,
  w_1_5: PropTypes.bool,
  w_2_5: PropTypes.bool,
  w_3_5: PropTypes.bool,
  w_4_5: PropTypes.bool,
  w_1_6: PropTypes.bool,
  w_5_6: PropTypes.bool,
};

GridItem.defaultProps = {
  w_1_2: false,
  w_1_3: false,
  w_2_3: false,
  w_1_4: false,
  w_3_4: false,
  w_1_5: false,
  w_2_5: false,
  w_3_5: false,
  w_4_5: false,
  w_1_6: false,
  w_5_6: false
};

export default GridItem;
