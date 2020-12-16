/* eslint-disable */
import React, { PureComponent } from 'react'


export const noop = ()=>{
    
}

export const getFileExtension = (filename) => filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2)


