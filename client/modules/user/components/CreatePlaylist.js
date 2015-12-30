import React, {Component} from 'react'
import {Input, Button} from 'react-bootstrap'
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
            <div>
                <div className="form-group">
                    <input className="form-control" ref="title" placeholder="Title" type="text"/>
                </div>
                <Button onClick={this.create} bsStyle="primary" active>Create</Button>
            </div>
        );
    }
}