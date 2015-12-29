import React, {Component} from 'react'
import {Input, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import ApplicationStore, {dispatch} from '../../../ApplicationStore'
import {createPl} from '../actions/createPlaylist'

@connect(({auth: {authenticated}}) => ({authenticated}))
class CreatePlaylist extends Component {
    constructor (...options) {
        super(...options);
        this.state = {};
        this.create = this.create.bind(this);
    }

    create() {
        dispatch(createPl({
            title: this.refs.title.value,
            owner: "i"
        }));
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <Input className="form-control" ref="title" placeholder="Title" type="text"/>
                </div>
                <Button onClick={this.create()}>Create</Button>
            </div>
        );
    }
}

export default CreatePlaylist