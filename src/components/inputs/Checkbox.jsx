
import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Margin } from "../layout";


class Checkbox extends Component {
    state = {
        checked: this.props.checked
    }
    static propTypes = {
        value: PropTypes.string,
        checked: PropTypes.bool,
        className: PropTypes.string,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        checked: false,
        disabled: false
    };

    toggleChecked() {
        this.setState({ checked: !this.state.checked })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== this.props.checked) {
            this.setState({
                checked: nextProps.checked
            });
        }
    }
    render() {
        const { className, checked, value, ...other } = this.props;

        const inputClass = cx("uk-checkbox", className);

        return (
            <label>
                <Margin type="small-right">
                    <input
                        className={inputClass}
                        type="checkbox"
                        checked={this.state.checked}
                        onClick={this.toggleChecked.bind(this)}
                        {...other}
                    />
                    <span>{value}</span>
                </Margin>
            </label>
        );
    }
}

const _Checkbox = Checkbox;

export {_Checkbox as Checkbox};
