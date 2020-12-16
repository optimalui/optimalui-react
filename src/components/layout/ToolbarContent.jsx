/* eslint-disable */
import React, { cloneElement } from 'react';
import cx from 'classnames';
import { Menu } from '../layout'

export const ToolbarContent = ({ children, align, className: customClassName, ...other }) => {
    const setClassName = cx({
        "uk-navbar-item": !align,
        "uk-navbar-center": align === 'center',
        "uk-navbar-center-left": align === 'left',
        "uk-navbar-center-right": align === 'right',
    }, customClassName)
    return <div className={setClassName} {...other}>
                <div>
                    {
                        React.Children.map(children, (child, index) => {
                            if (child.type === Menu) {
                                return cloneElement(child, { toolbar: true, key: index })
                            }
                            return cloneElement(child, { ...child.props, key: index })
                        })
                    }
                </div>
          </div>
}