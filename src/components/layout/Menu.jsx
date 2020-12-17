/* eslint-disable */
import React, { Component, cloneElement, createElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { MenuItem } from './MenuItem'
import { menuStyle } from '../../assets/jss'
import injectSheet from 'react-jss'
import { noop } from '../../util'
import uuidv4 from 'uuid'
import _ from 'lodash'
import { withTheme } from 'theming'; 

class RegularMenu extends Component {
    static propTypes = {
        alignItems: PropTypes.string,
        items: PropTypes.array,
        mode: PropTypes.string,
        vertical: PropTypes.bool,
        onSelect: PropTypes.func,
        menuId: PropTypes.string,
        toolbar:PropTypes.bool,
        transparent: PropTypes.bool,
        collapsible:PropTypes.bool,
        style:PropTypes.object,
        menuTheme:PropTypes.string,
    }

    static defaultProps = {
        alignItems: 'left',
        items: [],
        mode: "hover",
        vertical: false,
        onSelect: noop,
        menuId: `menu-${uuidv4()}`,
        toolbar:false,
        transparent: false,
        collapsible:false,
        style:{},
        menuTheme:'default'
    }

    constructor(props) {
        super(props)
        this.state = {
            activeMenuItemId: null,
            menuItems: [],
            closeMenuItems: false,
            updateComponent: true
        }

        this.subMenu = [];
        this.menu = []
        this.menuRef = React.createRef()
    }


    onSelect = (item,event) => {
        event.stopPropagation()
        const { onSelect } = this.props;
        const info = {
            event,
            item: {
                itemId: item.props ? 
                (item.props.itemId ? item.props.itemId : 'undefined-item-id') : 
                (item.itemId ? item.itemId : 'undefined-item-id'),
                text: item.props ? item.props.text : item.text
            }
        }

        if (typeof onSelect === 'function') {
            if (onSelect(info) === false) return;
        }

        this.setState({ updateComponent: false });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.updateComponent 
    }


    render() {

        const {
            children,
            alignItems,
            className: customClassName,
            classes,
            items,
            mode,
            vertical,
            menuId,
            toolbar,
            transparent,
            collapsible,
            menuTheme,
            theme,
            style:customMenuStyle,
            ...other
        } = this.props;

        const navClass = cx("uk-navbar-container",{
            "uk-navbar-transparent":transparent 
        }, customClassName, {
            [classes.verticalNavStyle]: vertical
        })


        const containerClassName = cx({
            "uk-navbar-left": alignItems === 'left',
            "uk-navbar-right": alignItems === 'right',
            "uk-navbar-center": alignItems === 'center',
        })

        const SubMenu = ({ menuItems, mode,collapsible, itemIndex }) => {
            return _.map(menuItems, (item, index) => {
                const itemId = typeof itemIndex!=='undefined' ? `${menuId}-menu-item-${itemIndex}-${index}` : `${menuId}-menu-item-${index}`
                return createElement(
                    MenuItem,
                    {
                        ...item,
                        vertical,
                        parent: item.hasOwnProperty('items'),
                        key: itemId,
                        mode: mode,
                        menuId: menuId,
                        collapsible,
                        toolbar,
                        itemId,
                        onClick: this.onSelect.bind(this, item)
                    },
                    item.hasOwnProperty('items') && <SubMenu menuItems={item['items']} mode={mode} vertical={vertical} collapsible={collapsible} itemIndex={index} />
                )
            })
        }

        const mapRecursive = (children, callback) => (
            React.Children.map(
                children,
                child => (
                    child.props.children
                        ? mapRecursive(child.props.children)
                        : callback(child)
                ),
            )
        );

        const CloneItems = ({ children }) => {
            return React.Children.map(children, (child, index) => {
                return cloneElement(child, {
                    key: `menu-item-${index}`,
                    vertical: vertical,
                    onSelect: this.onSelect.bind(this, child),
                    collapsible,
                    mode,
                    toolbar,
                    menuId
                },
                    child.props.parent && <CloneItems children={child.props.children} />
                )
            })

        }

        let setMenuStyle =customMenuStyle
        if(menuTheme==='dark'){
            setMenuStyle = Object.assign(setMenuStyle,theme.darkTheme)
        }

        return (
            <React.Fragment>
                {collapsible && <div className="uk-nav uk-nav-default tm-nav">
                    <ul className="uk-nav-default uk-nav-parent-icon" uk-nav="">
                        {
                            items.length ? <SubMenu menuItems={items} mode={mode} collapsible={collapsible} /> : <CloneItems children={children} />
                        }
                    </ul>
                </div>
                }

                {!collapsible && <nav className={navClass} uk-navbar={`mode:${mode};vertical:${vertical};`} {...other} ref={this.menuRef}  style={setMenuStyle}>
                    <div className={containerClassName} >
                        <ul className="uk-navbar-nav" role="menu" aria-orientation={vertical ? 'vertical' : ''}>
                            {
                                items.length ? <SubMenu menuItems={items} mode={mode} collapsible={collapsible} /> : <CloneItems children={children} />
                            }
                        </ul>
                    </div>
                </nav>
                }
            </React.Fragment>
        )
    }
}
const themedMenu = withTheme(RegularMenu)
const styledMenu = injectSheet(menuStyle)(themedMenu)

export { styledMenu as Menu }