import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Navbar, Nav, NavItem, Modal, Button} from 'react-bootstrap'
import {Registration, Login} from './../../user/index'

const MODAL_REGISTER = 'MODAL_REGISTER';
const MODAL_LOGIN = 'MODAL_LOGIN';

@connect(({auth: {authenticated}}) => ({authenticated}))
class Navigation extends Component {
    constructor(...options) {
        super(...options);

        this.state = {
            modal: false
        };
    }

    wrapModal(type) {
        this.setState({
            modal: type
        })
    }

    register(data) {
        console.log("Navigation", data);
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
                ) : null}

                <Modal onHide={() => {this.setState({modal:false})}} show={!!this.state.modal} aria-labelledby="contained-modal-title-sm">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm">Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.modal == MODAL_REGISTER ? <Registration onRegister={this.register} /> : <Login />}
                    </Modal.Body>
                </Modal>
            </Navbar>
        );
    }
}

export default Navigation