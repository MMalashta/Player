import {SHOW_ERROR, HIDE_ERROR} from './../constants'

export default function(state = {}, action) {
    switch(action.type) {
        case SHOW_ERROR: {
            return Object.assign({}, state, {visible: true, message: action.message})
        }

        case HIDE_ERROR: {
            return Object.assign({}, state, {visible: false, message: ""})
        }

        default: {
            return state;
        }
    }
}