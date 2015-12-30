import { combineReducers } from 'redux'
import {TRACK_ADDED} from './../constants'

export default function(state = {}, action) {
    switch(action.type) {
        case TRACK_ADDED: {
            return state.concat(action.data);
        }

        default: {
            return state;
        }
    }
}