import { combineReducers } from 'redux'
import {PLAYLIST_CREATED, PLAYLISTS_LOADED, PLAYLIST_TRACK_ADDED} from './../constants'

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
                    oldPlaylists[i].tracks.push(action.song);
                    break;
                }
            }

            if (index === -1) {
                return state;
            }
            return Object.assign({}, state, {playlists: oldPlaylists});
        }

        default: {
            return state;
        }
    }
}