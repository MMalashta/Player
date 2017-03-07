import React, {Component} from 'react'
import {Tab, Tabs} from 'react-bootstrap'
import TrackList from '../components/TrackList'
import Playlists from './Playlists'
import Artists from './Artists'
import {loadPl} from '../../../actions/loadPlaylist'
import {dispatch} from '../../../ApplicationStore'
import {connect} from 'react-redux'

const PLAYLIST_KEY = 4;

@connect(({playlists: {playlistLoaded, currentPlaylist, playlistSongs}}) => ({playlistLoaded, currentPlaylist, playlistSongs}))
class TabsInstance extends Component{
    constructor() {
        super();
        this.state = {
            key: 1
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(key) {
        if (key == PLAYLIST_KEY) {
            if (this.props.playlistLoaded) {
                dispatch(loadPl({
                    playlist: this.props.currentPlaylist.title,
                    owner: this.props.currentPlaylist.owner
                }));
            }
        }
        this.setState({key});
    }

    render() {
        return <Tabs activeKey={this.state.key} onSelect={this.handleSelect}>
            <Tab eventKey={1} title="Tracks"><TrackList/></Tab>
            <Tab eventKey={2} title="Albums" disabled>1</Tab>
            <Tab eventKey={3} title="Artists"><Artists /></Tab>
            <Tab eventKey={4} title="Playlists"><Playlists/></Tab>
        </Tabs>
    }
}

export default TabsInstance
