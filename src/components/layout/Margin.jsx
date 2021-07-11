import React, { cloneElement } from 'react';
import { marginStyle as styles } from '../../assets/jss'
import PropTypes from 'prop-types';
import classNames from 'classnames'
import withStyles from 'react-jss';




const RegularMargin = ({ children, type,classes }) => {
    const customClassName = classNames({
        [classes.default]:type==='default',
        [classes.top]:type==='top',
        [classes.bottom]:type==='bottom',
        [classes.left]:type==='left',
        [classes.right]:type==='right',
        [classes.small]:type==='small',
        [classes.smallTop]:type==='small-top',
        [classes.smallBottom]:type==='small-bottom',
        [classes.smallLeft]:type==='small-left',
        [classes.smallRight]:type==='small-right',
        [classes.medium]:type==='medium',
        [classes.mediumTop]:type==='medium-top',
        [classes.mediumBottom]:type==='medium-bottom',
        [classes.mediumLeft]:type==='medium-left',
        [classes.mediumRight]:type==='medium-right',
        [classes.large]:type==='large',
        [classes.largeTop]:type==='large-top',
        [classes.largeBottom]:type==='large-bottom',
        [classes.largeLeft]:type==='large-left',
        [classes.largeRight]:type==='large-right',
        [classes.xlarge]:type==='xlarge',
        [classes.xlargeTop]:type==='xlarge-top',
        [classes.xlargeBottom]:type==='xlarge-bottom',
        [classes.xlargeLeft]:type==='xlarge-left',
        [classes.xlargeRight]:type==='xlarge-right',
        [classes.remove]:type==='remove',
        [classes.removeTop]:type==='remove-top',
        [classes.removeBottom]:type==='remove-bottom',
        [classes.removeLeft]:type==='remove-left',
        [classes.removeRight]:type==='remove-right',
        [classes.removeVertical]:type==='remove-vertical',
        [classes.removeAdjacent]:type==='remove-adjacent',
        [classes.auto]:type==='auto',
        [classes.autoTop]:type==='auto-top',
        [classes.autoBottom]:type==='auto-bottom',
        [classes.autoLeft]:type==='auto-left',
        [classes.autoRight]:type==='auto-right',
        [classes.autoVertical]:type==='auto-vertical',
    })

    return (
    <div>
        {
            React.Children.map(children, (item, index) => cloneElement(item, {
                key: `element-${index}`,
                ...item.props,
                className:item.props.className? classNames(item.props.className,customClassName):customClassName
            }))
        }
    </div>
    )
}

RegularMargin.propTypes = {
    type: PropTypes.string
};

RegularMargin.defaultProps = {
    type: 'default'
};


const styledMargin = withStyles(styles)(RegularMargin)

export { styledMargin as Margin }



