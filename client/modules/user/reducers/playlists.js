import {PLAYLIST_CREATED, PLAYLISTS_LOADED, PLAYLIST_TRACK_ADDED, PLAYLIST_LOADED} from './../constants'

export default function(state = {}, action) {
    switch(action.type) {
        case PLAYLIST_CREATED: {
            return Object.assign({}, state, {playlists: state.playlists.concat(action.data)});
        }

        case PLAYLISTS_LOADED: {
            return Object.assign({}, state, {playlists: action.playlists});
        }

        case PLAYLIST_TRACK_ADDED: {
            let oldPlaylists = state.playlists,
                index = -1;
            for(let i = 0, len = oldPlaylists.length; i < len; i++) {
                if (oldPlaylists[i]._id === action.playlist) {
                    index = i;
                    oldPlaylists[i].tracks.push(action.data);
                    break;
                }
            }

            if (index === -1) {
                return state;
            }
            return Object.assign({}, state, {playlists: oldPlaylists});
        }

        case PLAYLIST_LOADED: {
            return Object.assign({}, state, {playlistLoaded: true, currentPlaylist: action.currentPlaylist, playlistSongs: action.playlistSongs});
        }

        default: {
            return state;
        }
    }
}