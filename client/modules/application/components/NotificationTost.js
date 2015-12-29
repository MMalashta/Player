import React, {Component} from 'react'
import {connect} from 'react-redux'

@connect(({error}) => ({error}))
class NotificationTost extends Component {

    constructor() {
        super();
        this.state = {};
    }

    componentWillReceiveProps(newProps) {
        this.setState(Object.assign({}, this.state, newProps));
        setTimeout(()=>{
            this.setState(Object.assign({}, this.state, {error: false}));
        }, 1000);
    }

    render() {
        return (
            <div className="snackbar-container">
                <div className={`snackbar ${this.state.error && this.state.error.visible ? 'snackbar-opened' : ''}`}>
                    <div className="snackbar-content">
                        {this.props.error.message}
                    </div>
                </div>
            </div>
        );
    }
}

export default NotificationTost