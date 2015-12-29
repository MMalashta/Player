import { combineReducers } from 'redux'
import {PLAYLIST_CREATED} from './../constants'

export default function(state = {}, action) {
    switch(action.type) {
        case PLAYLIST_CREATED: {
            return state.concat(action.data)
        }

        default: {
            return state;
        }
    }
}