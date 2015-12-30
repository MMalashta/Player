import React, {Component} from 'react'
import {Button, FormControls, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import ApplicationStore, {dispatch} from '../../../ApplicationStore'
import {addTrack} from '../actions/addSong'

@connect((playlists) => (playlists))
export default class AddSong extends Component {
    constructor() {
        super();
        this.add = this.add.bind(this);
        this.onChange = this.onChange.bind(this);
        this.currentValue = "";
    }

    add() {
        dispatch(addTrack({
            playlist: this.currentValue,
            id: this.props.song._id
        }));
        this.props.wrapModal(null);
    }

    onChange(){
        this.currentValue  = this.refs.select.value;
    }

    render() {
        return (
            <Row>
                <Col md="4">
                    <select className="form-control" style={{margin: '10px'}} onChange={this.onChange} ref="select">
                        {this.props.playlists.playlists ? (this.props.playlists.playlists.map((pl, idx)=>{if (idx == 0) {this.currentValue = pl.title;} return <option value={pl.title}>{pl.title}</option>})) : null}
                    </select>
                </Col>
                <Col md="2">
                    <Button onClick={this.add} bsStyle="primary" active>Add</Button>
                </Col>
            </Row>
        );
    }
}