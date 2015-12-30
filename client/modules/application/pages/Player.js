import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'
import TrackList from '../components/TrackList'
import Song from '../components/Song'
import ApplicationStore, {dispatch} from '../../../ApplicationStore'
import {CreatePlaylist} from './../../user/index'
import {connect} from 'react-redux'

const MODAL_CREATE_PL = 'MODAL_CREATE_PL';

class Player extends Component{
    constructor() {
        super();
        this.state = {
            //block: null,
            modal: false
        };
        this.createPlaylist = this.createPlaylist.bind(this);
        this.wrapModal = this.wrapModal.bind(this);
    }

    createPlaylist() {
        this.wrapModal(MODAL_CREATE_PL);
        /*this.setState({
            block: <CreatePlaylist />
        });*/
    }

    wrapModal(type) {
        this.setState({
            modal: type
        })
    }

    render() {
        return <div id="player">
            <div id="controls">
                <Button onClick={this.createPlaylist}>New Playlist</Button>
                <Modal onHide={() => {this.setState({modal:false})}} show={!!this.state.modal} aria-labelledby="contained-modal-title-sm">

                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm">Create Playlist</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.modal == MODAL_CREATE_PL ? <CreatePlaylist wrapModal={this.wrapModal}/> : null}
                    </Modal.Body>
                </Modal>
                {this.state.block}
                <TrackList/>
            </div>
        </div>
    }
}

export default Player