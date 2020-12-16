/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types'
import { iconList } from '../assets/jss/'
import withStyles from 'react-jss'
import cx from 'classnames';
import { iconStyle } from '../assets/jss'
import {css} from 'aphrodite/no-important'


const RegularIcon = ({ ...props }) => {
    const {
        name,
        size,
        isButton,
        linkClassName:customLinkClassName,
        link,
        className: customClassName,
        classes,
        formIcon,
        smallRightMargin,
        ...other
    } = props;
    const className = cx("uk-icon",{
       "uk-margin-small-right": smallRightMargin
    },css(formIcon ? iconStyle.formIcon:''), customClassName) 
    const iconProp = `icon:${props.name};ratio:${props.size};`;
    const width = props.size * 20;
    const height = props.size * 20;

    const linkClassName = cx(customLinkClassName,"uk-margin-small-right",{
        "uk-icon-button":isButton,
        "uk-icon-link":link
    })
    return props.link || props.isButton ?
        <a href={`//${props.link}`} target={props.target} className={linkClassName}>
            <span dangerouslySetInnerHTML={{ __html: iconList(width, height, props.name) }}  {...other} className={className}></span>
        </a> : <span dangerouslySetInnerHTML={{ __html: iconList(width, height, props.name) }}  {...other} className={className}></span>

}

RegularIcon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    isButton: PropTypes.bool,
    linkClassName:PropTypes.string,
    link:PropTypes.string,
    className: PropTypes.string,
    formIcon:PropTypes.bool,
    smallRightMargin:PropTypes.bool,
}
RegularIcon.defaultProps = {
    name: '',
    size: 1,
    isButton: false,
    className: '',
    linkClassName:'',
    link:'',
    formIcon:false,
    smallRightMargin:false
}

const styledIcon = withStyles(iconStyle)(RegularIcon)

export { styledIcon as Icon }