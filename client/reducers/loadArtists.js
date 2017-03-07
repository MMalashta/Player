import {ARTISTS_LOADED} from './../constants'

export default function(state = {}, action) {
    switch(action.type) {
        case ARTISTS_LOADED: {
            return Object.assign({}, state, {artists: action.artists});
        }

        default: {
            return state;
        }
    }
}