import React, {Component} from 'react'
import {Input, Button, Alert} from 'react-bootstrap'
import {connect} from 'react-redux'
import ApplicationStore, {dispatch} from '../../../ApplicationStore'
import {auth} from '../actions/login'

@connect(({error}) => ({error}))
class Login extends Component {
    constructor (...options) {
        super(...options);
        this.state = {};
        this.login = this.login.bind(this);
    }

    login() {
        dispatch(auth({
            username: this.refs.login.value,
            password: this.refs.password.value
        }));
        this.props.onHide();
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <input className="form-control" ref="login" placeholder="Login" type="text"/>
                </div>
                <div className="form-group">
                    <input className="form-control" ref="password" placeholder="Password" type="password"/>
                </div>
                <Button onClick={this.login} bsStyle="primary" active>Login</Button>
            </div>
        );
    }
}

export default Login