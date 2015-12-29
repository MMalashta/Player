import {combineReducers} from 'redux'
import auth from './modules/user/reducers/login'
import reg from './modules/user/reducers/registrate'
import error from './modules/application/reducers/error'

export default combineReducers({
    auth: auth,
    tracks: (state = [], action) => {
        switch(action.type) {
            case "TRACKS_LOADED": {
                console.log("Event", state);
                return state.concat(action.data)
            }
            default: return state
        }
    },
    reg: reg,
    error: error
});