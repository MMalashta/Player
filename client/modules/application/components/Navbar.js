import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar, Nav, NavItem, Modal, Button} from 'react-bootstrap'
import {Registration, Login} from './../../user/index'
import {dispatch} from '../../../ApplicationStore'
import logOut from './../../../actions/logout'

const MODAL_REGISTER = 'MODAL_REGISTER';
const MODAL_LOGIN = 'MODAL_LOGIN';

@connect(({auth: {authenticated}}) => ({authenticated}))
class Navigation extends Component {
    constructor(...options) {
        super(...options);
        this.logout = this.logout.bind(this);
        this.onHide = this.onHide.bind(this);
        this.state = {
            modal: false,
            onBtnClicked: false
        };
    }

    wrapModal(type) {
        this.setState({
            modal: type,
            onBtnClicked: true
        });
    }

    logout(event) {
        event.preventDefault();
        dispatch(logOut());
    }

    onHide() {
        this.setState({
            modal:false,
            onBtnClicked:false
        });
    }

    render() {
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>Player</Navbar.Brand>
                </Navbar.Header>
                {!this.props.authenticated ? (
                    <Nav pullRight>
                        <NavItem eventKey={1} onClick={this.wrapModal.bind(this, MODAL_REGISTER)}>Register</NavItem>
                        <NavItem eventKey={2} onClick={this.wrapModal.bind(this, MODAL_LOGIN)}>Login</NavItem>
                    </Nav>
                ) : <Nav pullRight>
                        <NavItem eventKey={1} onClick={this.logout}>Logout</NavItem>
                    </Nav>}

                <Modal onHide={this.onHide} show={!!this.state.modal && this.state.onBtnClicked} aria-labelledby="contained-modal-title-sm">

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm">{this.state.modal == MODAL_REGISTER ? "Registation" : "Login "}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.modal == MODAL_REGISTER ? <Registration onHide={this.onHide}/> : <Login onHide={this.onHide}/>}
                    </Modal.Body>
                </Modal>
            </Navbar>
        );
    }
}

export default Navigation
