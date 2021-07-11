import React, { cloneElement } from 'react';
import { heightStyle as styles } from '../../assets/jss'
import PropTypes from 'prop-types';
import classNames from 'classnames'
import withStyles from 'react-jss';
import {boxModelAdjust, css, endsWith, height, isNumeric, isString, offset, query, toFloat} from 'uikit/src/js/util';

const Height = ({ children, size,classes }) => {
    const customClassName = classNames({
        [classes.default]:size==="default",
        [classes.small]:size==="small",
        [classes.maxSmall]:size==="max-small",
        [classes.medium]:size==="medium",
        [classes.maxMedium]:size==="max-medium",
        [classes.large]:size==="large",
        [classes.maxLarge]:size==="max-large",
    })

    return (
        <div>
            {
                React.Children.map(children, (item, index) => cloneElement(item, {
                    key: `height-element-${index}`,
                    ...item.props,
                    className: item.props.className ? classNames(item.props.className, customClassName) : customClassName
                }))
            }
        </div>
    )
}

Height.propTypes = {
    size: PropTypes.string
};

Height.defaultProps = {
    size: 'default'
};


const styledHeight = withStyles(styles)(Height)

export { styledHeight as Height }