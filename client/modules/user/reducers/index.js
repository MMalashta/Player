import { combineReducers } from 'redux'
import {LOGIN_USER} from './../constants'

export default function(state = {}, action) {
    switch(action.type) {
        case LOGIN_USER: {
            return Object.assign({}, state, {authenticated: true, user: action.data});
        }

        default: {
            return state;
        }
    }
}