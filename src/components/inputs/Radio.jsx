
import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Margin } from "../layout";


class Radio extends Component {
    state = {
      selected:false
    }

    static propTypes = {
        name:PropTypes.string,
        value: PropTypes.string,
        selected: PropTypes.bool,
        className: PropTypes.string,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        selected: false,
        disabled: false
    };

    toggleSelected(){
      this.setState({selected:!this.state.selected});
    }



    render() {
        const { className,name, selected, value, ...other } = this.props;

        const inputClass = cx("uk-radio", className);

        return (
            <label>
                    <input
                        name={name}
                        className={inputClass}
                        type="radio"
                        selected={this.state.selected}
                        onChange={this.toggleSelected.bind(this)}

                        {...other}
                    />
            </label>
        );
    }
}

const _rd = Radio;

export {_rd as Radio};
