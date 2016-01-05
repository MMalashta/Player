import {TRACKS_LOADED} from './../constants'

export default function(state = {}, action) {
    switch(action.type) {
        case TRACKS_LOADED: {
            return Object.assign({}, state, {tracks: action.tracks});
        }

        default: {
            return state;
        }
    }
}