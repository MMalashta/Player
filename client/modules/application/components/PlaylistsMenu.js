import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {CreatePlaylist, LoadPlaylist} from './../../user/index'

const MODAL_CREATE_PL = 'MODAL_CREATE_PL';
const MODAL_LOAD_PL = "MODAL_LOAD_PL";

class PlaylistsMenu extends Component {
    constructor() {
        super();
        this.state = {
            modal: false
        };
        this.createPlaylist = this.createPlaylist.bind(this);
        this.loadPlaylist = this.loadPlaylist.bind(this);
        this.wrapModal = this.wrapModal.bind(this);
    }

    createPlaylist() {
        this.wrapModal(MODAL_CREATE_PL);
    }

    loadPlaylist() {
        this.wrapModal(MODAL_LOAD_PL);
    }

    wrapModal(type) {
        this.setState({
            modal: type
        })
    }
    render() {
        return <div id="controls">
            <Button onClick={this.createPlaylist}>New Playlist</Button>
            <Button onClick={this.loadPlaylist}>Load Playlist</Button>
            <Modal onHide={() => {this.setState({modal:false})}} show={!!this.state.modal} aria-labelledby="contained-modal-title-sm">

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">{this.state.modal == MODAL_CREATE_PL ? "Create Playlist" : "Load Playlist"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.modal == MODAL_CREATE_PL ? <CreatePlaylist wrapModal={this.wrapModal}/> :
                        this.state.modal == MODAL_LOAD_PL ? <LoadPlaylist wrapModal={this.wrapModal}/> : null}
                </Modal.Body>
            </Modal>
        </div>
    }
}

export default PlaylistsMenu