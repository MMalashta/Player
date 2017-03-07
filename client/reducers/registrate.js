import {REGISTRATE_USER} from './../constants'

export default function(state = {}, action) {
    switch(action.type) {
        case REGISTRATE_USER: {
            return Object.assign({}, state, {registrated: true});
        }

        default: {
            return state;
        }
    }
}