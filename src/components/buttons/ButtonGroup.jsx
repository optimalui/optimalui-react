/* eslint-disable */
import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { buttonGroupStyle as styles } from '../../assets/jss'
import cx from 'classnames'
import withStyles from 'react-jss';
import '../../assets/css/button.css'

class RegularButtonGroup extends Component {
    static propTypes = {
        className: PropTypes.string,
        disabled: PropTypes.bool
    }

    static defaultProps = {
        className: '',
        disabled: false
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {
            children,
            className: customClassName,
            disabled,
            classes,
            ...other
        } = this.props;
        const className = cx(styles.root,customClassName);
        return (
            <span {...other} className={className}>
                {
                    React.Children.map(children, (item, index) => cloneElement(item, {
                        key: `btn-${index}`,
                        ...item.props,
                        disabled,
                    }))
                }
            </span>
        );
    }
}


const styledButtonGroup = withStyles(styles)(RegularButtonGroup)

export { styledButtonGroup as ButtonGroup }
