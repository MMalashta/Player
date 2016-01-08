import React, {Component} from 'react'
import PlaylistsMenu from './PlaylistsMenu'
import PlaylistSongs from './PlaylistSongs'
import {connect} from 'react-redux'

@connect(({playlists: {playlistLoaded}}) => ({playlistLoaded}))
class Playlists extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentWillReceiveProps(newProps) {
        this.setState(Object.assign({}, this.state, newProps));
    }

    render() {
        return <div>
            <PlaylistsMenu />
            {this.state.playlistLoaded ? <PlaylistSongs /> : null}
        </div>
    }
}

export default Playlists