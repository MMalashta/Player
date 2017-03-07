import React, {Component} from 'react'
import {Button, FormControls, Row, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import ApplicationStore, {dispatch} from '../../../ApplicationStore'
import {loadPl} from '../../../actions/loadPlaylist'

@connect((playlists) => (playlists))
@connect(({auth: {user}}) => ({user}))
export default class LoadPlaylist extends Component {
    constructor() {
        super();
        this.load = this.load.bind(this);
        this.onChange = this.onChange.bind(this);
        this.currentValue = "";
    }

    load() {
        dispatch(loadPl({
            playlist: this.currentValue,
            owner: this.props.user._id
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
                    <Button onClick={this.load} bsStyle="primary" active>Load</Button>
                </Col>
            </Row>
        );
    }
}
