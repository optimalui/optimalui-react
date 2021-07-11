import React from 'react'
import { offCanvasStyle } from '../../assets/jss'
import cx from 'classnames'
import {Icon} from '../Icon'

const OffCanvasCloseButton = ({ children, className, ...other }) => {
    const classes = offCanvasStyle(other)
    return (
        <Icon className={cx(classes.closeButton, className)} {...other}/>
    )
}

const styledComponent = OffCanvasCloseButton

export {styledComponent as OffCanvasCloseButton}