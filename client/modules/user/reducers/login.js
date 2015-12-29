import { combineReducers } from 'redux'
import {LOGIN_USER} from './../constants'

export default function(state = {}, action) {
    switch(action.type) {
        case LOGIN_USER: {
            localStorage.setItem("authenticated", true);
            localStorage.setItem("user", action.data.username);
            return Object.assign({}, state, {authenticated: true, user: action.data, token: action.token});
        }

        default: {
            return state;
        }
    }
}