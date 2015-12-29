import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import TrackList from '../components/TrackList'
import Song from '../components/Song'
import ApplicationStore, {dispatch} from '../../../ApplicationStore'
import {createPl} from '../../user/actions/createPlaylist'
import {CreatePlaylist} from './../../user/index'

class Player extends Component{
    constructor() {
        super();
        this.createPlaylist = this.createPlaylist.bind(this);
    }

    createPlaylist() {


        /*console.log("haha", "CREATE");
        dispatch(createPl({
            title: "PL1",
            owner: "i"
        }));*/
    }

    render() {
        return <div id="player">
            <div id="controls">
                <Button onClick={this.createPlaylist}>New Playlist</Button>
                <Button>Next</Button>
                <TrackList/>
            </div>
        </div>
    }
}

export default Player