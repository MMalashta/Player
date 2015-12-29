import React, {Component} from 'react'
import {ListGroup, ListGroupItem} from 'react-bootstrap'

class TrackList extends Component {
    constructor() {
        super();
        this.state = {
            songs : [
                {
                    name : "konami-music",
                    url  : "kxyodomjfq/01-konami-music.mp3"
                },
                {
                    name : "locked-and-loaded",
                    url  : "rtjcvgrqpw/02-locked-and-loaded.mp3"
                },
                {
                    name : "charshoe-x",
                    url  : "ltmvmmvkxl/03-charshoe-x.mp3"
                },
                {
                    name : "contra-overdrive",
                    url  : "ekzoyctpts/04-contra-overdrive.mp3"
                }
            ]
        };
    }

    render(){
        return <ListGroup>
                    {this.state.songs.map((song)=>{return <ListGroupItem onClick={function() {
                        alert('clicked'); }} href={this.state.url + song.url}>{song.name}</ListGroupItem>})}
               </ListGroup>
    }
}

export default TrackList