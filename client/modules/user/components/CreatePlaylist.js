import React, {Component} from 'react'
import {Button, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import ApplicationStore, {dispatch} from '../../../ApplicationStore'
import {createPl} from '../actions/createPlaylist'

@connect(({auth: {user}}) => ({user}))
export default class CreatePlaylist extends Component {
    constructor() {
        super();
        this.create = this.create.bind(this);
    }

    create() {
        if (this.refs.title.value !== "") {
            dispatch(createPl({
                title: this.refs.title.value,
                owner: this.props.user._id
            }));
            this.props.wrapModal(null);
        } else {

        }
    }

    render() {
        return (
            <Row>
                <Col md="4">
                    <input style={{margin: '10px'}} className="form-control" ref="title" placeholder="Title" type="text"/>
                </Col>
                <Col md="2">
                    <Button onClick={this.create} bsStyle="primary" active>Create</Button>
                </Col>
            </Row>
        );
    }
}