import React, {Component} from 'react'
import {Input, Button} from 'react-bootstrap'

export default class Login extends Component {
    constructor (...options) {
        super(...options);
        this.login = this.login.bind(this);
    }

    login() {
        console.log(this);
        this.props.onLogin && this.props.onLogin({
            login: this.refs.login.value,
            password: this.refs.email.value,
        })
    }

    render() {
        return (
            <div>
                <Input ref="login" placeholder="login" type="text"/>
                <Input ref="password" type="password"/>
                <Button onClick={this.login}>Login</Button>
            </div>
        );
    }
}