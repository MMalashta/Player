import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {CreatePlaylist, LoadPlaylist, RemovePlaylist} from './../../user/index'

const MODAL_CREATE_PL = 'MODAL_CREATE_PL';
const MODAL_LOAD_PL = "MODAL_LOAD_PL";
const MODAL_REMOVE_PL = "MODAL_REMOVE_PL";

class PlaylistsMenu extends Component {
    constructor() {
        super();
        this.state = {
            modal: false
        };
        this.wrapModal = this.wrapModal.bind(this);
    }

    wrapModal(type) {
        this.setState({
            modal: type
        })
    }

    render() {
        return <div id="controls">
            <Button className="btn btn-flat btn-primary" onClick={this.wrapModal.bind(this, MODAL_CREATE_PL)}>New Playlist</Button>
            <Button className="btn btn-flat btn-primary" onClick={this.wrapModal.bind(this, MODAL_LOAD_PL)}>Load Playlist</Button>
            <Button className="btn btn-flat btn-primary" onClick={this.wrapModal.bind(this, MODAL_REMOVE_PL)}>Remove</Button>
            <Modal onHide={() => {this.setState({modal:false})}}
                   show={!!this.state.modal} aria-labelledby="contained-modal-title-sm">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">{(() => {
                        switch(this.state.modal){
                            case MODAL_CREATE_PL:
                                return "Create Playlist";

                            case MODAL_LOAD_PL:
                                return "Load Playlist";

                            case MODAL_REMOVE_PL:
                                return "Choose Playlist To Remove";

                            default:
                               return "";
                        }
                    })()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{(() => {
                        switch(this.state.modal){
                            case MODAL_CREATE_PL:
                                return <CreatePlaylist wrapModal={this.wrapModal}/>;

                            case MODAL_LOAD_PL:
                                return <LoadPlaylist wrapModal={this.wrapModal}/>;

                            case MODAL_REMOVE_PL:
                                return <RemovePlaylist wrapModal={this.wrapModal}/>;
                            default:
                                return null;
                        }
                    })()}
                </Modal.Body>
            </Modal>
        </div>
    }
}

export default PlaylistsMenu