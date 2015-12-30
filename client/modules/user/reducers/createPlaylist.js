import { combineReducers } from 'redux'
import {PLAYLIST_CREATED, PLAYLISTS_LOADED} from './../constants'

export default function(state = {}, action) {
    switch(action.type) {
        case PLAYLIST_CREATED: {
            return Object.assign({}, state, {playlists: state.playlists.concat(action.data)});
        }

        case PLAYLISTS_LOADED: {
            return Object.assign({}, state, {playlists: action.playlists});
        }

        default: {
            return state;
        }
    }
}