
import { StyleSheet } from 'aphrodite/no-important';

export const tabStripStyle = (alignment, selected, disabled,animationName,duration) => {

    let animObject = {}
    if (animationName) {
        const _module = require(`react-animations/lib/${animationName}`);
        Object.assign(animObject, {
            animationName: [_module.default],
            animationDuration: duration
        })
    }

    let _default = {
        display: 'flex',
        flexWrap: 'wrap',
        padding: 0,
        listSyle: 'none',
        position: 'relative',
        bottom: 0,
        right: 0,
        '& > * ': {
            flex: 'none',
            paddingLeft: '20px',
            position: 'relative'
        },
    }, borderStyle = {
        borderBottom: '1px solid #e5e5e5'
    }, borderColorStyle = {},
        textColor = {
            color: '#999',
        },
        pointerEvents = {},
        textAlign = {
            textAlign: 'center'
        }, content = {
            margin: 0,
            padding: 0,
            listStyle: 'none'
        }, gridStyle = {},
        tabWrapper = {
            width: 'auto',
            outline:'none'
        }

    if(alignment==='center'){
        _default.justifyContent='center'
    }else if(alignment==='left'){
        _default.justifyContent = 'flex-start'
    }else if(alignment==='right'){
        _default.justifyContent = 'flex-end'
    } else if(alignment === 'bottom') {
        borderStyle = {
            borderTop: '1px solid #e5e5e5',
        }
    } else if (alignment === 'v-left') {
        borderStyle = {
            borderBottom: 'none',
        }
        _default = {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            marginLeft: 0,
            top: 0,
            bottom: 0,
            left: 'auto',
            right: 0,
            borderRight: '1px solid #e5e5e5',
            listSyle: 'none',
            position: 'relative',
            '& > * ': {
                paddingLeft: 0,
            },
        }
        textAlign = {
            textAlign: 'left'
        }
        content = {
            flex: 1,
            minWidth: '1px',
            margin: 0,
            paddingLeft: '30px',
            listStyle: 'none'
        }
        gridStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            margin: 0,
            padding: 0,
            listStyle: 'none',
        }
    } else if (alignment === 'v-right') {
        borderStyle = {
            borderBottom: 'none',
        }
        _default = {
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            padding: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 'auto',
            borderLeft: '1px solid #e5e5e5',
            listSyle: 'none',
            position: 'relative',
            '& > * ': {
                paddingLeft: 0,
            },
        }

        textAlign = {
            textAlign: 'left'
        }

        gridStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            margin: 0,
            padding: 0,
            listStyle: 'none',
        }

        content = {
            flex: 1,
            minWidth: '1px',
            margin: 0,
            paddingRight: '30px',
            listStyle: 'none',
            order: '-1'
        }

        tabWrapper.order = '99'
    }


    if (selected) {
        textColor.color = '#333 !important';
        if (alignment === 'bottom') {
            borderColorStyle.borderTopColor = '#1e87f0 !important'
        } else if (alignment === 'v-left') {
            borderColorStyle.borderRightColor = '#1e87f0 !important'
        } else if (alignment === 'v-right') {
            borderColorStyle.borderLeftColor = '#1e87f0 !important'
        }
        else {
            borderColorStyle.borderBottomColor = '#1e87f0 !important'
        }
    }

    if (disabled) {
            textColor = {
                color: '#999 !important',
            }
            pointerEvents = {
                pointerEvents: 'none'
            }
    }

    const styles = StyleSheet.create({
        default: {
            ..._default,
            ...borderStyle
        },
        text: {
            ...textColor,
            ...pointerEvents,
            ...borderColorStyle,
            border: '2px solid transparent',
            display: 'block',
            ...textAlign,
            padding: '9px 20px',
            fontSize: '12px',
            textTransform: 'uppercase',
            transition: 'color 0.1s ease-in-out',
            lineHeight: '20px',
            cursor: 'pointer',
            outline:'none'
        },
        content: {
            ...content
        },
        gridStyle: {
            ...gridStyle
        },
        tabWrapper: {
            ...tabWrapper
        },
        dropDownWrapper : {
            display: 'block',
            position: 'absolute',
            zIndex: 1020,
            boxSizing: 'border-box',
            minWidth: '200px',
            padding: '25px',
            background: '#fff',
            color: '#666',
            boxShadow: '0 5px 12px rgba(0, 0, 0, 0.15)',
            listStyle: 'none',
            marginTop:'20px'
        },
        dropDownStyle:{
            margin: 0,
            padding: 0,
            listStyle: 'none',
            whiteSpace: 'nowrap',
            fontSize: '0.875rem',
            textAlign:'left !important'
        },
        dropdownItemStyle:{
            /* Hover + Focus + Active */
            padding: '5px 0',
            display: 'block',
            textDecoration: 'none !important',
            textTransform:'none !important',
            cursor: 'pointer',
            color: '#999',
            ':hover': {
                color: '#666',
                textDecoration: 'none',
            },
            ':focus': {
                color: '#666',
                outline: 'none',
                textDecoration: 'none',
            },
        },
        activeTab:{
            color: '#666',
            outline: 'none',
            textDecoration: 'none',
        },
        disabledDropDownItem:{
            color: '#999 !important',
            pointerEvents:'none !important',
            opacity:'0.6',
            ':hover,:focus': {
                color: '##999 !important',
            },
        },
        animation: animObject,
        hideContent:{
            display:'none'
        }
    })

    return styles

}