import React, {Component} from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'
import Song from './Song'
import {connect} from 'react-redux'

@connect(({tracks}) => ({tracks}))
class TrackList extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentWillReceiveProps(newProps) {
        this.setState(Object.assign({}, this.state, newProps));
    }

    render(){
        return <ListGroup>
            {this.state.tracks ? this.state.tracks.tracks.map((song)=>{return <Song  href={song.url} title={song.title} artist = {song.artist}/>}) : null}
       </ListGroup>
    }
}

export default TrackList