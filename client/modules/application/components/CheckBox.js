import React, {Component} from 'react'

class CheckBox extends Component {
    getInputDOMNode() {
        return this.refs.input.getDOMNode();
    }
    getChecked() {
        return this.getInputDOMNode().checked;
    }
    renderLabel(){
        var input = this.renderInput();
        return (
            <label>
                {input}
                {' '}
                {this.props.label}
            </label>
        );
    }
    renderInput(){
        return [
            <input {...this.props} type="checkbox" name={this.props.name} ref="input" key="input" />,
            <span className="checkbox-material">
                <span className="ripple" />
                <span className="check" />
            </span>
        ];
    }
    render(){
        var className = 'checkbox';
        if (this.props.groupClassName) {
            className += ' ' + this.props.groupClassName;
        }
        return (
            <div {...this.props} className={className}>
                {this.renderLabel()}
            </div>
        );
    }
}

export default CheckBox