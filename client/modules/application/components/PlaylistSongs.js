import React, {Component} from 'react'
import {connect} from 'react-redux'
import TrackList from './TrackList'

@connect(({playlists: {currentPlaylist, playlistSongs}}) => ({currentPlaylist, playlistSongs}))
class PlaylistSongs extends Component {
    render(){
        return (<div>
            <h1>
                {this.props.currentPlaylist.title}
            </h1>
            <TrackList playlist={this.props.currentPlaylist.title} playlistSongs={this.props.playlistSongs} />
        </div>);
    }
}

export default PlaylistSongs