/* eslint-disable */
import React, { Component, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { toolbarStyle } from '../../assets/jss'
import injectSheet from 'react-jss'
import {Menu} from '../layout'
import _ from 'lodash'


class ToolbarItem extends Component {
    static propTypes = {
        align:PropTypes.string
    }

    static defaultProps = {
        align:'left'
    }

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }
     

    render() {

        const {
            children,
            classes,
            align,
            className: customClassName,
            ...other
        } = this.props;
        

        const itemClass = cx({
            "uk-navbar-left": align === 'left',
            "uk-navbar-right": align === 'right',
            "uk-navbar-center": align === 'center',
        },customClassName)

        return (
                <div className={itemClass} {...other}>
                    {
                        React.Children.map(children, (child, index) => {
                            if (child.type === Menu) {
                                return cloneElement(child, { toolbar: true,key:index })
                            }
                            return cloneElement(child, { ...child.props,key:index })
                        })
                    }
                </div>
        )
    }
}

const styledToolbarItem = injectSheet(toolbarStyle)(ToolbarItem)

export { styledToolbarItem as ToolbarItem }