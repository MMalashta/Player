import React, {Component} from 'react'
import {Input, Button} from 'react-bootstrap'

export default class Registration extends Component {
    constructor (...options) {
        super(...options);
        this.register = this.register.bind(this);
    }

    register() {
        this.props.onRegister && this.props.onRegister({
            email: this.refs.email.value,
            login: this.refs.login.value,
            password: this.refs.password.value,
            confirmation: this.refs.confirmation.value
        })
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <input className="form-control" ref="email" placeholder="Email" type="text"/>
                </div>
                <div className="form-group">
                    <input className="form-control" ref="login" placeholder="Login" type="text"/>
                </div>
                <div className="form-group">
                    <input className="form-control" ref="password" placeholder="Password" type="password"/>
                </div>
                <div className="form-group">
                    <input className="form-control" ref="confirmation" placeholder="Confirm Password" type="password"/>
                </div>
                <Button onClick={this.register}>Register</Button>
            </div>
        );
    }
}