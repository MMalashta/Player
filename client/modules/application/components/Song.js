import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {AddSong} from '../../user/components/index'

const MODAL_ADD_SONG = 'MODAL_ADD_SONG';

class Song extends Component {
    constructor() {
        super();
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.add = this.add.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
        this.wrapModal = this.wrapModal.bind(this);
        this.isPlaying = false;
        this.state = {
            modal: false
        };
    }

    componertWillReceiveProps(newProp) {
        console.log("here", newProps);
    }

    wrapModal(type) {
        this.setState({
            modal: type
        })
    }

    play() {
        if (!this.isPlaying) {
            this.refs.audio.play();
            this.refs.wrapper.style.background = "#B2DFDB";
            this.isPlaying = true;
        }
    }

    pause() {
        if (this.isPlaying) {
            this.refs.audio.pause();
            this.refs.wrapper.style.background = "#26A69A";
            this.isPlaying = false;
        }
    }

    add() {
        this.wrapModal(MODAL_ADD_SONG);
    }

    toggleHover() {
        if (this.isPlaying) {
            return;
        }

        this.setState({hover: !this.state.hover})
        if (!this.state.hover) {
            this.refs.wrapper.style.background = "#26A69A";
        } else {
            this.refs.wrapper.style.background = "white";
        }
    }

    render() {
        return <div ref="wrapper" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
            <audio src={this.props.song.url} ref="audio">
            </audio>
            <Button onClick={this.play} className="mdi-av-play-circle-fill" />
            <Button onClick={this.pause} className="mdi-av-pause-circle-fill" />
            <Button onClick={this.add} className="mdi-action-favorite" />
            <span>{this.props.song.title}</span>
            <span style={{color: 'gray'}}> - {this.props.song.artist}</span>
            <Modal onHide={() => {this.setState({modal:false})}} show={!!this.state.modal} aria-labelledby="contained-modal-title-sm">

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Add Song To</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.modal == MODAL_ADD_SONG ? <AddSong wrapModal={this.wrapModal} song={this.props.song}/> : null}
                </Modal.Body>
            </Modal>
        </div>
    }
}

export default Song