import {LOGIN_USER, LOGOUT_USER} from './../constants'

export default function(state = {}, action) {
    switch(action.type) {
        case LOGIN_USER: {
            return Object.assign({}, state, {authenticated: true, user: action.data, token: action.token});
        }

        case LOGOUT_USER: {
            return Object.assign({}, state, {authenticated: false, user: {}, token: {}});
        }

        default: {
            return state;
        }
    }
}