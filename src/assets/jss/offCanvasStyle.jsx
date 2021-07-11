

// export const offCanvasStyle = {
//     canvas:props => ({
//         position: 'fixed',
//         top: 0,
//         bottom: 0,
//         left: props.position==='left'?0:null,
//         right: props.position==='right'?0:null,
//         zIndex: 1000
//     }),
//     canvasContent:{
//         position: 'absolute',
//         boxSizing: 'border-box',
//     },
//     canvasContentWrapper:{
//         background: '#fff',
//         padding: '20px 20px',
//     },
//     slide:props=>({ 
//         width: '300px',
//         height: '100%',
//         '-webkit-transform': props.position==='left'?'translate3d(-340px,0,0)':props.position==='right'?'translate3d(340px,0,0)':null,
//         transform: props.position==='left'?'translate3d(-340px,0,0)':props.position==='right'?'translate3d(340px,0,0)':null,
//         '-webkit-transition': '-webkit-transform 0.3s ease-out',
//         transition: 'transform 0.3s ease-out',
//         '@media (min-width: 960px)': {
//             '-webkit-transform':  props.position==='left'?'translate3d(-440px,0,0)':props.position==='right'?'translate3d(440px,0,0)':null,
//             transform:  props.position==='left'?'translate3d(-440px,0,0)':props.position==='right'?'translate3d(440px,0,0)':null,
//             width: '350px',
//             padding: '40px 40px'
//         }
//     }),
//     openSlide:{
//         display: 'block',
//         '-webkit-transform': 'translate3d(0,0,0)',
//         transform: 'translate3d(0,0,0)',
//         '-webkit-transition':' -webkit-transform 0.3s ease-out',
//         transition: 'transform 0.3s ease-out'
//     },

//     overlay: {
//         position: 'fixed',
//         width: '100%', /* Full width (cover the whole page) */
//         height: '100%', /* Full height (cover the whole page) */
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 1000, /* Specify a stack order in case you're using a different order for other elements */
//     },
//     overlayBackground: {
//         backgroundColor: 'rgba(0,0,0,0.1)', /* Black background with opacity */
//     },

//     closeButton: {
//         position: 'absolute',
//         zIndex: 1000,
//         top: '20px',
//         right: '20px',
//         padding: '5px',
//         cursor: 'pointer',
//         color: '#999',
//         transition: '0.1s ease-in-out',
//         transitionProperty: 'color, opacity',
//     }
//   }

export const offCanvasStyle = {
    canvas:{
        position: 'fixed',
    },
    overlay: {
        position: 'fixed',
        width: '100%', /* Full width (cover the whole page) */
        height: '100%', /* Full height (cover the whole page) */
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000, /* Specify a stack order in case you're using a different order for other elements */
    },
    overlayBackground: {
        backgroundColor: 'rgba(0,0,0,0.1)', /* Black background with opacity */
    },

    closeButton: {
        position: 'absolute',
        zIndex: 1000,
        top: '20px',
        right: '20px',
        padding: '5px',
        cursor: 'pointer',
        color: '#999',
        transition: '0.1s ease-in-out',
        transitionProperty: 'color, opacity',
    }

}
