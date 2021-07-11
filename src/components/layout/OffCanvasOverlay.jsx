import React  from 'react'
import { offCanvasStyle } from '../../assets/jss'
import injectSheet from 'react-jss'
import cx from 'classnames'

const OffCanvasOverlay = ({ children,offCanvasPosition="left", overlay = false, overlayBackground = false, className, classes, ...other }) => {
    const overlayClass = cx({
        [classes.overlay]: overlay,
        [classes.overlayBackground]: overlayBackground
    }, className)
    return <div className={overlayClass} {...other}>
        {children}
    </div>
}

const styledComponent = injectSheet(offCanvasStyle)(OffCanvasOverlay)

export { styledComponent as OffCanvasOverlay }