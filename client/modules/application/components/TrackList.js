import React, {Component} from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import Song from './Song'
import {connect} from 'react-redux'

@connect(({tracks}) => ({tracks}))
class TrackList extends Component {
    constructor() {
        super();
        this.state = {};
        this.currentSong = null;
        this.changePlayingSong = this.changePlayingSong.bind(this);
    }

    changePlayingSong(id) {
        if (id && id !== null) {
            if (this.currentSong !== null) {
                this.refs[this.currentSong].pause();
            }
        }
        this.currentSong = id;
    }

    componentWillReceiveProps(newProps) {
        this.setState(Object.assign({}, this.state, newProps));
    }

    render(){
        return <ListGroup>
            {this.props.playlist ? this.props.playlistSongs ? this.props.playlistSongs.map((song)=>
            {
                return <Song song={song} playlist={this.props.playlist} ref={song._id} changePlayingSong={this.changePlayingSong}/>
            }) : null
                : this.state.tracks ? this.state.tracks.tracks.map((song)=>{
                    return <Song song={song} ref={song._id} changePlayingSong={this.changePlayingSong}/>
            }) : null}
       </ListGroup>
    }
}

export default TrackList