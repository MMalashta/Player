import React, {Component} from 'react'
import PlaylistsMenu from './PlaylistsMenu'
import PlaylistSongs from './PlaylistSongs'
import {connect} from 'react-redux'

@connect(({playlists: {playlistLoaded}}) => ({playlistLoaded}))
class Playlists extends Component {
    render() {
        return <div>
            <PlaylistsMenu />
            {this.props.playlistLoaded ? <PlaylistSongs /> : null}
        </div>
    }
}

export default Playlists