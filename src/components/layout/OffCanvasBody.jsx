import React from "react";
import PropTypes from 'prop-types'

let OffCanvasBody = ({ children, style, className, ...others }) => (
    <div style={{ ...style }} className={className} {...others}> 
        {children}
    </div>
)

OffCanvasBody.propTypes = {
    style: PropTypes.object,
    className: PropTypes.string
};

const content = OffCanvasBody

export { content as OffCanvasBody }

  

