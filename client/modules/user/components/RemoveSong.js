import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import ApplicationStore, {dispatch} from '../../../ApplicationStore'
import {removeTrack} from '../actions/removeSong'

@connect(({playlists: {currentPlaylist}}) => ({currentPlaylist}))
export default class RemoveSong extends Component {
    constructor() {
        super();
        this.remove = this.remove.bind(this);
        this.cancel = this.cancel.bind(this);
        this.currentValue = "";
    }

    remove() {
        dispatch(removeTrack({
            playlistID: this.props.currentPlaylist._id,
            songID: this.props.song._id
        }));
        this.props.wrapModal(null);
    }

    cancel() {
        this.props.wrapModal(null);
    }

    render() {
        return (
            <div>
                <Button onClick={this.cancel} >No</Button>
                <Button onClick={this.remove} >Yes</Button>
            </div>
        );
    }
}