import {StyleSheet} from 'aphrodite/no-important'

export const iconStyle = StyleSheet.create({
    root: {
        margin: 0,
        border: 'none',
        borderRadius: 0,
        overflow: 'visible',
        font: 'inherit',
        color: 'inherit',
        textTransform: 'none',
        padding: '0',
        backgroundColor: 'transparent',
        display: 'inline-block',
        fill: 'currentcolor',
        lineHeight: '0',
        '& > *': {
            transform: 'translate(0, 0)'
        },
        '&::-moz-focus-inner': {
            border: 0,
            padding: 0
        }
    },
    iconSmallRight: {
        marginRight: '10px !important'
    },
    iconLink: {
        color: '#999',
        ':hover':{
            color: '#666',
            outline: 'none'
        },
        ':focus': {
            color: '#666',
            outline: 'none'
        }
    },
    iconButton: {
        boxSizing: 'border-box',
        width: '36px',
        height: '36px',
        borderRadius: '500px',
        background: '#f8f8f8',
        color: '#999',
        verticalAlign: 'middle',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: '0.1s ease-in-out',
        transitionProperty: 'color',
        ':hover,:focus': {
            backgroundColor: '#ebebeb',
            color: '#666',
            outline: 'none'
        }
    },
    formIcon:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 'auto',
        width: '40px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#999',
        ':hover':{
            color: '#666',
        },
        ':not(a):not(button):not(input)':{
            pointerEvents: 'none'
        }
    }

})