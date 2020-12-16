/* eslint-disable */
import React, { Component, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { toolbarStyle } from '../../assets/jss'
import injectSheet from 'react-jss'
import { ToolbarItem } from '../layout'
import _ from 'lodash'


class Toolbar extends Component {
    static propTypes = {
        transparent: PropTypes.bool
    }

    static defaultProps = {
        transparent: false
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
            className: customClassName,
            transparent,
            ...other
        } = this.props;  
        

        const toolbarClass = cx('uk-navbar uk-navbar-container uk-margin',
        {
            "uk-navbar-transparent":transparent 
        },classes.root,customClassName)

        return (
            <nav className={toolbarClass} {...other} uk-navbar=""> 
                    {
                        React.Children.map(children, (child) => {
                            if (child.type === ToolbarItem) {
                                return cloneElement(child, { ...child.props })
                            }
                        })
                    }
            </nav>
        )
    }
}

const styledToolBar = injectSheet(toolbarStyle)(Toolbar)

export { styledToolBar as Toolbar }