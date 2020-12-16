/* eslint-disable */ 
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import injectSheet from 'react-jss'
import { menuStyle } from '../../assets/jss'
import { Icon } from '../Icon'
import {  Link, withRouter } from 'react-router-dom'
import uuidv4 from 'uuid'


class RegularMenuItem extends Component {

    static propTypes = {
        parent: PropTypes.bool,
        active: PropTypes.bool,
        className:PropTypes.string,
        text: PropTypes.string.isRequired,
        eventKey: PropTypes.string,
        children: PropTypes.any,
        selectedKeys: PropTypes.array,
        disabled: PropTypes.bool,
        onItemHover: PropTypes.func,
        onSelect: PropTypes.func,
        onClick: PropTypes.func,
        onDeselect: PropTypes.func,
        onDestroy: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        isSelected: PropTypes.bool,
        mode:PropTypes.string,
        menuId:PropTypes.string,
        url:PropTypes.string,
        urlTarget:PropTypes.string,
        icon:PropTypes.string,
        iconClassName:PropTypes.string,
        vertical:PropTypes.bool,
        route:PropTypes.string,
        itemId:PropTypes.string,
        toolbar:PropTypes.bool,
        collapsible:PropTypes.bool,
        header:PropTypes.bool,
        divider:PropTypes.bool,
    };

    static defaultProps = {
        active: false,
        parent: false,
        className: '',
        customDropdownClassName: '',
        textCustomClassName: '',
        mode:"hover",
        itemId:`menu-item-${uuidv4()}`,
        url:'',
        urlTarget:'',
        icon:'',
        iconClassName:'',
        vertical:false,
        route:'',
        toolbar:false,
        collapsible:false,
        header:false,//for collapsible
        divider:false,// for collapsible
        text:''
    };

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            active: false,
            itemMode:"hover",
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleLinkClick = this.handleLinkClick.bind(this)
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }


    handleClick = (e) => {
        e.stopPropagation();
        const { onSelect,onClick} = this.props;
        const { isOpen,itemMode } = this.state

        if (itemMode === "click") {
            this.setState({ isOpen: !isOpen })
        }

        if (onSelect(e) === false) return;
    };


    handleLinkClick(e){
        const {url,disabled,collapsible} = this.props
        const {isOpen} = this.state
        if((!url || disabled) && !collapsible){
            e.preventDefault()
        }else if(collapsible){
            this.setState({ isOpen: !isOpen })
        }
    }

    handleMouseEnter = (e) => {
        const {onMouseEnter,collapsible} = this.props;

        if (this.state.itemMode === "hover") {
            this.setState({ isOpen: true}) 
        }

        const info = {
            item: this,
            domEvent: e,
        };

        if (typeof onMouseEnter === 'function') {
            if (onMouseEnter(info) === false) return;
        }
    };

    handleMouseLeave = (e) => {
        const { mode,onMouseLeave } = this.props;

        if (mode==="hover") {
            this.setState({ isOpen: false}) 
        }

        const info = {
            item: this,
            domEvent: e,
        };

        if (typeof onMouseLeave === 'function') {
            if (onMouseLeave(info) === false) return;
        }
    };

    static getDerivedStateFromProps(props, state) {
        if (props.mode != state.itemMode && !props.collapsible) {
            return { itemMode: props.mode };
        }

        if (props.collapsible) {
            return { itemMode: "click" };
        }
        return null;
      }


    render() {
        
        const {
            parent,
            active,
            disabled,
            text,
            className:customClassName,
            textCustomClassName,
            customDropdownClassName,
            children,
            classes,
            itemId,
            menuId,
            mode,
            url,
            urlTarget,
            icon,
            iconClassName:customIconClassName,
            vertical, 
            route,
            staticContext,
            store,
            toolbar,
            collapsible,
            header,
            divider,
            ...other
        } = this.props;

        const { isOpen,itemMode } = this.state

        const customClass = cx(customClassName, {
            [classes.disabledItem]: disabled,
            'parent uk-parent': parent,
            'uk-nav-header':header,
            'uk-nav-divider':divider,
        })




        const mouseEvents = {
            onClick: disabled ? null : this.handleClick, 
            onMouseEnter: disabled ? null : this.handleMouseEnter,
            onMouseLeave: disabled ? null :  this.handleMouseLeave,
        }

        const iconClass = cx(classes.iconClass,customIconClassName)

        const parentClassName = cx(customDropdownClassName, { 
            "uk-navbar-dropdown": parent,
            [classes.subMenuWrapper]: parent
        })

        const itemTextClass = cx({
            [classes.menuItemText]:!toolbar,
            [classes.activeMenuItem]:active
        })

        const renderCollapsibleSubMenu = (parent && !disabled) &&
            <ul className="uk-nav-sub">
                {
                    children
                }
            </ul>

        const renderSubMenu = (parent && !disabled) &&
            <div className={parentClassName} ref={(item) => { this.subMenuRef = item; }} uk-drop={vertical ? `boundary:!li; boundary-align: true; mode:${itemMode};pos: right-justify;` : `mode:${itemMode}`}>
                <ul className={cx("uk-nav uk-navbar-dropdown-nav", classes.subMenu)}>
                    {
                        children
                    }
                </ul>
            </div>
        
        
        return (
            <li
                {...mouseEvents}
                {...other}
                className={customClass}
                ref={(item) => { this.menuItemRef = item; }}
                role = "menuitem"
                aria-label = {text}
                aria-disabled = {disabled}
                aria-haspopup = {parent}
                aria-expanded = {isOpen}
                >

                {!(header || divider) ? (
                    route ?
                        <Link replace={route === this.props.history.location.pathname} to={route} className={itemTextClass}>
                            {icon && <Icon name={icon} className={iconClass} />}
                            {text}
                            {parent && !toolbar && !collapsible && <Icon name="triangle-right" className={classes.iconStyle} />}
                        </Link> :
                        <a href={`//${url}`} target={urlTarget} className={itemTextClass} onClick={this.handleLinkClick}>
                            {icon && <Icon name={icon} className={iconClass} />}
                            {text}
                            {parent && !toolbar && !collapsible && <Icon name="triangle-right" className={classes.iconStyle} />}
                        </a>) : ''

                } 
                {!(header || divider) ?
                        (collapsible ? renderCollapsibleSubMenu : renderSubMenu) : ''} 
                {header ? text : ''}
            </li >
        )
    }
}


const styledMenuItem = injectSheet(menuStyle)(RegularMenuItem)

const routeMenuItem = withRouter(styledMenuItem)

export { routeMenuItem as MenuItem }