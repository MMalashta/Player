import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

class Song extends Component {
    constructor() {
        super();
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.add = this.add.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
        this.isPlaying = false;
        this.state = {};
    }

    componertWillReceiveProps(newProp) {
        console.log("here", newProps);
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
        console.log("ADD");
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
            <audio src={this.props.href} ref="audio">
            </audio>
            <Button onClick={this.play} className="mdi-av-play-circle-fill" />
            <Button onClick={this.pause} className="mdi-av-pause-circle-fill" />
            <Button onClick={this.add} className="mdi-action-favorite" />
            <span>{this.props.title}</span>
            <span style={{color: 'gray'}}> - {this.props.artist}</span>
        </div>
    }
}

export default Song